import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FilterRangeModel } from '../models/filterRangeModel';
import type { PagedResultModel } from '../models/pagedResultModel';
import type { ProductCardModel } from '../models/productCardModel';
import searchService from '../services/searchService';
import { PAGE_SIZE_DEFAULT, type SortByValue } from '../constants/pagination';
import {
  applyListingFilters,
  clampPage,
  clampPageSize,
  parseSortBy,
  resetListingParams,
  toApiSearchParams,
  withPage,
  withPageSize,
  withSortBy,
} from '../utils/searchQuery';
import { ApiError } from '../services/httpClient';

export type ListingStatus = 'loading' | 'success' | 'empty' | 'error';

type UseProductListingOptions = {
  categoryId?: number;
};

const defaultPriceRange = (): FilterRangeModel => ({
  min: 0,
  max: 0,
  value: [0, 0],
});

const useProductListing = (options: UseProductListingOptions = {}) => {
  const { categoryId } = options;
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<FilterRangeModel>(defaultPriceRange);
  const [brandItems, setBrandItems] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [materialItems, setMaterialItems] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [products, setProducts] = useState<PagedResultModel<ProductCardModel> | null>(null);
  const [status, setStatus] = useState<ListingStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [priceMinInput, setPriceMinInput] = useState('0');
  const [priceMaxInput, setPriceMaxInput] = useState('0');

  const page = clampPage(Number(searchParams.get('page') ?? 0));
  const rowsPerPage = clampPageSize(Number(searchParams.get('pageSize') ?? PAGE_SIZE_DEFAULT));
  const sortBy = parseSortBy(searchParams.get('sortBy'));
  const searchString = searchParams.get('searchString') ?? '';

  const apiParams = useMemo(
    () => toApiSearchParams(searchParams, { categoryId }),
    [searchParams, categoryId],
  );

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const [paged, sidebar] = await Promise.all([
        searchService.fetchByQuery(apiParams),
        searchService.fetchSidebar(apiParams),
      ]);

      const urlMin = searchParams.get('minPrice');
      const urlMax = searchParams.get('maxPrice');
      const hasPrice = Boolean(urlMin && urlMax);
      const initMin = hasPrice ? Number(urlMin) : sidebar.minPrice;
      const initMax = hasPrice ? Number(urlMax) : sidebar.maxPrice;

      let newValue: [number, number] = [
        Number.isNaN(initMin) ? sidebar.minPrice : initMin,
        Number.isNaN(initMax) ? sidebar.maxPrice : initMax,
      ];

      if (newValue[0] < sidebar.minPrice) newValue[0] = sidebar.minPrice;
      if (newValue[1] > sidebar.maxPrice) newValue[1] = sidebar.maxPrice;
      if (newValue[0] > newValue[1]) {
        newValue = [sidebar.minPrice, sidebar.maxPrice];
      }

      setPriceRange({
        min: sidebar.minPrice,
        max: sidebar.maxPrice,
        value: newValue,
      });
      setPriceMinInput(String(newValue[0]));
      setPriceMaxInput(String(newValue[1]));
      setBrandItems(sidebar.brands ?? []);
      setMaterialItems(sidebar.materials ?? []);
      setSelectedBrands(searchParams.getAll('selectedBrands'));
      setSelectedMaterials(searchParams.getAll('selectedMaterials'));
      setProducts(paged);

      const isEmpty = !paged.items?.length;
      setStatus(isEmpty ? 'empty' : 'success');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Не вдалося завантажити товари.';
      setError(message);
      setProducts(null);
      setStatus('error');
    }
  }, [apiParams, searchParams]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await load();
      if (cancelled) {
        return;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [load]);

  const handleRangeChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange((prev) => ({ ...prev, value: newValue as [number, number] }));
    setPriceMinInput((newValue as [number, number])[0].toString());
    setPriceMaxInput((newValue as [number, number])[1].toString());
  };

  const handlePriceMinInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceMinInput(event.target.value);
  };

  const handlePriceMaxInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceMaxInput(event.target.value);
  };

  const handlePriceMinSubmit = () => {
    const newMin = Number(priceMinInput);
    if (!Number.isNaN(newMin)) {
      setPriceRange((prev) => ({
        ...prev,
        value: [Math.min(newMin, prev.value[1]), prev.value[1]],
      }));
    } else {
      setPriceMinInput(priceRange.value[0].toString());
    }
  };

  const handlePriceMaxSubmit = () => {
    const newMax = Number(priceMaxInput);
    if (!Number.isNaN(newMax)) {
      setPriceRange((prev) => ({
        ...prev,
        value: [prev.value[0], Math.max(newMax, prev.value[0])],
      }));
    } else {
      setPriceMaxInput(priceRange.value[1].toString());
    }
  };

  const handleBrandToggle = (item: string) => {
    setSelectedBrands((prev) =>
      prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item],
    );
  };

  const handleMaterialToggle = (item: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item],
    );
  };

  const handleApply = () => {
    setSearchParams(
      applyListingFilters(searchParams, {
        selectedBrands,
        selectedMaterials,
        minPrice: priceRange.value[0],
        maxPrice: priceRange.value[1],
        pageSize: rowsPerPage,
      }),
    );
  };

  const handlePageChange = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setSearchParams(withPage(searchParams, newPage));
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchParams(withPageSize(searchParams, parseInt(event.target.value, 10)));
  };

  const handleSortChange = (value: SortByValue) => {
    setSearchParams(withSortBy(searchParams, value));
  };

  const handleReset = () => {
    setSearchParams(resetListingParams(searchParams));
  };

  return {
    searchString,
    page,
    rowsPerPage,
    sortBy,
    priceRange,
    brandItems,
    selectedBrands,
    materialItems,
    selectedMaterials,
    products,
    status,
    error,
    priceMinInput,
    priceMaxInput,
    handleRangeChange,
    handlePriceMinInputChange,
    handlePriceMaxInputChange,
    handlePriceMinSubmit,
    handlePriceMaxSubmit,
    handleBrandToggle,
    handleMaterialToggle,
    handleApply,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
    handleReset,
    reload: load,
  };
};

export default useProductListing;
