import type { ProductCardModel } from './productCardModel';

export type PagedResultModel<T = ProductCardModel> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
