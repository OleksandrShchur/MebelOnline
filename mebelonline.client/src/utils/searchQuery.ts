import {
  PAGE_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_MAX,
  SEARCH_STRING_MAX,
  SORT_BY,
  type SortByValue,
} from '../constants/pagination';

export const clampPageSize = (size: number): number => {
  if (Number.isNaN(size) || size < 1) {
    return PAGE_SIZE_DEFAULT;
  }
  return Math.min(size, PAGE_SIZE_MAX);
};

export const clampPage = (page: number): number => {
  if (Number.isNaN(page) || page < 0) {
    return PAGE_DEFAULT;
  }
  return page;
};

export const clampSearchString = (value: string): string =>
  value.trim().slice(0, SEARCH_STRING_MAX);

export const parseSortBy = (value: string | null): SortByValue => {
  if (value === SORT_BY.Descending || value === SORT_BY.Name || value === SORT_BY.Ascending) {
    return value;
  }
  return SORT_BY.Ascending;
};

export const buildSearchPath = (query: string): string => {
  const searchString = clampSearchString(query);
  const params = new URLSearchParams();
  if (searchString) {
    params.set('searchString', searchString);
  }
  params.set('page', String(PAGE_DEFAULT));
  params.set('pageSize', String(PAGE_SIZE_DEFAULT));
  params.set('sortBy', SORT_BY.Ascending);
  return `/search?${params.toString()}`;
};

export const catalogPath = (categoryId: number): string => `/catalog/${categoryId}`;

export type ListingFilters = {
  selectedBrands: string[];
  selectedMaterials: string[];
  minPrice: number;
  maxPrice: number;
  pageSize: number;
};

export const applyListingFilters = (
  current: URLSearchParams,
  filters: ListingFilters,
): URLSearchParams => {
  const next = new URLSearchParams(current);

  next.delete('selectedBrands');
  next.delete('selectedMaterials');
  filters.selectedBrands.forEach((brand) => next.append('selectedBrands', brand));
  filters.selectedMaterials.forEach((material) => next.append('selectedMaterials', material));

  next.set('minPrice', String(filters.minPrice));
  next.set('maxPrice', String(filters.maxPrice));
  next.set('page', String(PAGE_DEFAULT));
  next.set('pageSize', String(clampPageSize(filters.pageSize)));

  return next;
};

export const withPage = (current: URLSearchParams, page: number): URLSearchParams => {
  const next = new URLSearchParams(current);
  next.set('page', String(clampPage(page)));
  return next;
};

export const withPageSize = (current: URLSearchParams, pageSize: number): URLSearchParams => {
  const next = new URLSearchParams(current);
  next.set('pageSize', String(clampPageSize(pageSize)));
  next.set('page', String(PAGE_DEFAULT));
  return next;
};

export const withSortBy = (current: URLSearchParams, sortBy: SortByValue): URLSearchParams => {
  const next = new URLSearchParams(current);
  next.set('sortBy', sortBy);
  next.set('page', String(PAGE_DEFAULT));
  return next;
};

export const resetListingParams = (current: URLSearchParams): URLSearchParams => {
  const next = new URLSearchParams();
  const searchString = current.get('searchString');
  if (searchString) {
    next.set('searchString', clampSearchString(searchString));
  }
  next.set('page', String(PAGE_DEFAULT));
  next.set('pageSize', String(PAGE_SIZE_DEFAULT));
  next.set('sortBy', SORT_BY.Ascending);
  return next;
};

export const toApiSearchParams = (
  current: URLSearchParams,
  extra?: { categoryId?: number },
): URLSearchParams => {
  const next = new URLSearchParams();

  const searchString = clampSearchString(current.get('searchString') ?? '');
  if (searchString) {
    next.set('searchString', searchString);
  }

  next.set('page', String(clampPage(Number(current.get('page') ?? PAGE_DEFAULT))));
  next.set('pageSize', String(clampPageSize(Number(current.get('pageSize') ?? PAGE_SIZE_DEFAULT))));
  next.set('sortBy', parseSortBy(current.get('sortBy')));

  const minPrice = current.get('minPrice');
  const maxPrice = current.get('maxPrice');
  if (minPrice) {
    next.set('minPrice', minPrice);
  }
  if (maxPrice) {
    next.set('maxPrice', maxPrice);
  }

  current.getAll('selectedBrands').forEach((brand) => next.append('selectedBrands', brand));
  current.getAll('selectedMaterials').forEach((material) => next.append('selectedMaterials', material));

  if (extra?.categoryId && extra.categoryId > 0) {
    next.set('categoryId', String(extra.categoryId));
  }

  return next;
};
