import type { PagedResultModel } from '../models/pagedResultModel';
import type { ProductCardModel } from '../models/productCardModel';
import type { SearchSidebarModel } from '../models/searchSidebarModel';
import { fetchJson } from './httpClient';

const searchService = () => {
  const baseUrl = '/api/search';

  const fetchByQuery = async (
    params: URLSearchParams,
  ): Promise<PagedResultModel<ProductCardModel>> => {
    const data = await fetchJson<PagedResultModel<ProductCardModel> | null>(
      `${baseUrl}?${params.toString()}`,
    );
    return (
      data ?? {
        items: [],
        page: 0,
        pageSize: 12,
        totalCount: 0,
        totalPages: 0,
      }
    );
  };

  const fetchSidebar = async (params: URLSearchParams): Promise<SearchSidebarModel> => {
    const data = await fetchJson<SearchSidebarModel | null>(
      `${baseUrl}/sidebar?${params.toString()}`,
    );
    return (
      data ?? {
        minPrice: 0,
        maxPrice: 0,
        brands: [],
        materials: [],
      }
    );
  };

  return { fetchByQuery, fetchSidebar };
};

export default searchService();
