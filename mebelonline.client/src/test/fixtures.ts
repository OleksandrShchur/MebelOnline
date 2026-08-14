import type { CategoryModel } from '../models/categoryModel';
import type { CatalogModel } from '../models/catalogModel';
import type { ProductCardModel } from '../models/productCardModel';
import type { ProductDetailsModel } from '../models/productDetailsModel';
import type { PagedResultModel } from '../models/pagedResultModel';
import type { SearchSidebarModel } from '../models/searchSidebarModel';
import type { CategoryDetailsModel } from '../models/categoryDetailsModel';

export const categoriesFixture: CategoryModel[] = [
  {
    id: 1,
    name: 'Кухні',
    childrenCategories: [
      {
        id: 11,
        name: 'Кухонні гарнітури',
        childrenCategories: [{ id: 111, name: 'Модульні кухні', childrenCategories: [] }],
      },
    ],
  },
  {
    id: 2,
    name: 'Дивани',
    childrenCategories: [],
  },
];

export const catalogFixture: CatalogModel[] = [
  {
    id: 1,
    name: 'Кухні',
    imageUrl: '/kitchen.jpg',
    subCategories: [
      { id: 11, name: 'Кухонні гарнітури', imageUrl: null, subCategories: [] },
    ],
  },
  {
    id: 2,
    name: 'Дивани',
    imageUrl: '/sofa.jpg',
    subCategories: [],
  },
];

export const productCardFixture: ProductCardModel = {
  id: 42,
  title: 'Диван Мілан',
  price: 15999,
  oldPrice: 18999,
  imageUrl: '/sofa.jpg',
};

export const pagedProductsFixture: PagedResultModel = {
  items: [productCardFixture],
  page: 0,
  pageSize: 12,
  totalCount: 1,
  totalPages: 1,
};

export const sidebarFixture: SearchSidebarModel = {
  minPrice: 1000,
  maxPrice: 50000,
  brands: ['MebelUA'],
  materials: ['Дуб'],
};

export const categoryDetailsFixture: CategoryDetailsModel = {
  id: 2,
  name: 'Дивани',
  imageUrl: '/sofa.jpg',
  parent: { id: 6, name: 'Вітальня' },
  children: [],
};

export const productDetailsFixture: ProductDetailsModel = {
  id: 42,
  title: 'Диван Мілан',
  description: 'Зручний диван для вітальні',
  price: 15999,
  oldPrice: 18999,
  width: 200,
  height: 90,
  depth: 95,
  note: 'Тканина знімна',
  brand: { name: 'MebelUA', description: 'Український бренд' },
  frontOptions: [{ colorName: 'Беж', imageUrl: '/front.jpg' }],
  frameOptions: [{ colorName: 'Графіт', imageUrl: '/frame.jpg' }],
  images: [
    { url: '/sofa-1.jpg', isPrimary: true },
    { url: '/sofa-2.jpg', isPrimary: false },
  ],
  attributes: [{ key: 'Матеріал', value: 'Тканина' }],
};
