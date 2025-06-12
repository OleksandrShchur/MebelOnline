import type { BrandModel } from "./brandModel";
import type { ProductAttributeValueModel } from "./productAttributeValueModel";
import type { ProductImageModel } from "./productImageModel";
import type { ProductOptionModel } from "./productOptionModel";

export type ProductDetailsModel = {
    id: number;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    width?: number;
    height?: number;
    depth?: number;
    brand: BrandModel;
    frontOptions: ProductOptionModel[];
    frameOptions: ProductOptionModel[];
    images: ProductImageModel[];
    attributes: ProductAttributeValueModel[];
};
