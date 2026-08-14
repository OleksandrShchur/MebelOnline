import type { BrandModel } from './brandModel';
import type { CategoryRefModel } from './categoryDetailsModel';
import type { ProductAttributeValueModel } from './productAttributeValueModel';
import type { ProductImageModel } from './productImageModel';
import type { ProductOptionModel } from './productOptionModel';

export type ProductDetailsModel = {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  oldPrice?: number | null;
  width?: number | null;
  height?: number | null;
  depth?: number | null;
  note?: string | null;
  brand?: BrandModel | null;
  category?: CategoryRefModel | null;
  frontOptions?: ProductOptionModel[] | null;
  frameOptions?: ProductOptionModel[] | null;
  images?: ProductImageModel[] | null;
  attributes?: ProductAttributeValueModel[] | null;
};
