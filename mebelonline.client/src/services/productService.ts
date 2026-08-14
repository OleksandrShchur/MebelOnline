import type { ProductCardModel } from '../models/productCardModel';
import type { ProductDetailsModel } from '../models/productDetailsModel';
import { ApiError, fetchJson } from './httpClient';

const productService = () => {
  const baseUrl = '/api/products';

  const fetchLatest = async (): Promise<ProductCardModel[]> => {
    const data = await fetchJson<ProductCardModel[]>(`${baseUrl}/latest`);
    return data ?? [];
  };

  const fetchProductDetails = async (productId: string): Promise<ProductDetailsModel> => {
    const data = await fetchJson<ProductDetailsModel | null>(`${baseUrl}/${productId}`);
    if (!data) {
      throw new ApiError(404, 'Товар не знайдено');
    }
    return data;
  };

  return { fetchLatest, fetchProductDetails };
};

export default productService();
