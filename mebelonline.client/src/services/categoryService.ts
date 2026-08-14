import type { CatalogModel } from '../models/catalogModel';
import type { CategoryBreadcrumbModel } from '../models/categoryBreadcrumbModel';
import type { CategoryDetailsModel } from '../models/categoryDetailsModel';
import type { CategoryModel } from '../models/categoryModel';
import { ApiError, fetchJson } from './httpClient';

const categoryService = () => {
  const baseUrl = '/api/categories';

  const fetchAll = async (): Promise<CategoryModel[]> => {
    const data = await fetchJson<CategoryModel[]>(`${baseUrl}/all`);
    return data ?? [];
  };

  const fetchBreadcrumbsForProduct = async (
    productId: string,
  ): Promise<CategoryBreadcrumbModel[]> => {
    const data = await fetchJson<CategoryBreadcrumbModel[]>(
      `${baseUrl}/breadcrumbs/${productId}`,
    );
    return data ?? [];
  };

  const fetchCatalog = async (): Promise<CatalogModel[]> => {
    const data = await fetchJson<CatalogModel[]>(`${baseUrl}/catalog`);
    return data ?? [];
  };

  const fetchById = async (categoryId: number | string): Promise<CategoryDetailsModel> => {
    const data = await fetchJson<CategoryDetailsModel | null>(`${baseUrl}/${categoryId}`);
    if (!data) {
      throw new ApiError(404, 'Категорію не знайдено');
    }
    return data;
  };

  return { fetchAll, fetchBreadcrumbsForProduct, fetchCatalog, fetchById };
};

export default categoryService();
