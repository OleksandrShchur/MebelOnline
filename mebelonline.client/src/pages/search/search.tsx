import React, { useEffect, useState, type ChangeEvent } from "react";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchSidebar from "../../components/searchSidebar/searchSidebar";
import SearchProductGrid from "../../components/searchProductGrid/searchProductGrid";
import searchService from "../../services/searchService";
import type { PagedResultModel } from "../../models/pagedResultModel";

interface FilterRange {
    min: number;
    max: number;
    value: [number, number];
}

const Search: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceRange, setPriceRange] = useState<FilterRange>({
        min: 0,
        max: 0,
        value: [0, 0],
    });

    const [brandItems, setBrandItems] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const [materialItems, setMaterialItems] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    const [products, setProducts] = useState<PagedResultModel | null>(null);

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    // Temporary states for TextField inputs
    const [priceMinInput, setPriceMinInput] = useState<string>(priceRange.value[0].toString());
    const [priceMaxInput, setPriceMaxInput] = useState<string>(priceRange.value[1].toString());

    const populateProducts = async () => {
        const data = await searchService.fetchByQuery(searchParams);
        setProducts(data);
    };

    useEffect(() => {
        const urlPage = searchParams.get('Page');
        const urlRows = searchParams.get('PageSize');

        setPage(parseInt(urlPage ?? '0', 10));
        setRowsPerPage(parseInt(urlRows ?? '10', 10));

        loadFromSearchParams();
        populateProducts();
    }, [searchParams]);

    const loadFromSearchParams = async () => {
        const urlMin = searchParams.get('MinPrice');
        const urlMax = searchParams.get('MaxPrice');
        const brands = searchParams.getAll('SelectedBrands');
        const materials = searchParams.getAll('SelectedMaterials');

        const params = new URLSearchParams();
        brands.forEach(brand => params.append('SelectedBrands', brand));
        materials.forEach(material => params.append('SelectedMaterials', material));

        let initMin = 0;
        let initMax = 0;
        let hasPrice = false;

        if (urlMin && urlMax) {
            const minNum = Number(urlMin);
            const maxNum = Number(urlMax);
            if (!isNaN(minNum) && !isNaN(maxNum)) {
                initMin = minNum;
                initMax = maxNum;
                params.append('MinPrice', initMin.toString());
                params.append('MaxPrice', initMax.toString());
                hasPrice = true;
            }
        } 

        if (!hasPrice) {
            params.append('MinPrice', '0');
            params.append('MaxPrice', '0');
        }

        const data = await searchService.fetchSidebar(params);
        if (data) {
            const newMin = data.minPrice;
            const newMax = data.maxPrice;
            let newValue: [number, number] = hasPrice ? [initMin, initMax] : [newMin, newMax];

            // Clip the values
            if (newValue[0] < newMin) newValue[0] = newMin;
            if (newValue[1] > newMax) newValue[1] = newMax;

            // Ensure min <= max
            if (newValue[0] > newValue[1]) {
                newValue = [newMin, newMax];
            }

            setPriceRange({
                min: newMin,
                max: newMax,
                value: newValue,
            });
            setPriceMinInput(newValue[0].toString());
            setPriceMaxInput(newValue[1].toString());

            setBrandItems(data.brands);
            setMaterialItems(data.materials);

            setSelectedBrands(brands);
            setSelectedMaterials(materials);
        }
    };

    // Generic handler for slider changes
    const handleRangeChange = (
        _event: Event,
        newValue: number | number[]
    ) => {
        setPriceRange((prev) => ({ ...prev, value: newValue as [number, number] }));
        setPriceMinInput((newValue as [number, number])[0].toString());
        setPriceMaxInput((newValue as [number, number])[1].toString());
    };

    // Handlers for price TextField inputs
    const handlePriceMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMinInput(event.target.value);
    };

    const handlePriceMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMaxInput(event.target.value);
    };

    const handlePriceMinSubmit = () => {
        const newMin = Number(priceMinInput);
        if (!isNaN(newMin)) {
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
        if (!isNaN(newMax)) {
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
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const handleMaterialToggle = (item: string) => {
        setSelectedMaterials((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const handleApply = () => {
        const newParams = new URLSearchParams();
        selectedBrands.forEach(brand => newParams.append('SelectedBrands', brand));
        selectedMaterials.forEach(material => newParams.append('SelectedMaterials', material));
        newParams.append('MinPrice', priceRange.value[0].toString());
        newParams.append('MaxPrice', priceRange.value[1].toString());
        newParams.set('Page', '0');
        newParams.set('PageSize', rowsPerPage.toString());

        setSearchParams(newParams);
    };

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('Page', newPage.toString());
        setSearchParams(newParams);
    };

    const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newRows = parseInt(event.target.value, 10);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('PageSize', newRows.toString());
        newParams.set('Page', '0');
        setSearchParams(newParams);
    };

    return (
        <Container sx={{ pt: 9, pb: 2, maxWidth: 'none !important', display: 'flex' }}>
            <SearchSidebar
                priceRange={priceRange}
                onRangeChange={handleRangeChange}
                priceMinInput={priceMinInput}
                onPriceMinInputChange={handlePriceMinInputChange}
                onPriceMinSubmit={handlePriceMinSubmit}
                priceMaxInput={priceMaxInput}
                onPriceMaxInputChange={handlePriceMaxInputChange}
                onPriceMaxSubmit={handlePriceMaxSubmit}
                brandItems={brandItems}
                selectedBrands={selectedBrands}
                onBrandToggle={handleBrandToggle}
                materialItems={materialItems}
                selectedMaterials={selectedMaterials}
                onMaterialToggle={handleMaterialToggle}
                onApply={handleApply}
            />
            {products && (
                <SearchProductGrid
                    items={products.items}
                    totalCount={products.totalCount ?? 0}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
        </Container>
    );
};

export default Search;
