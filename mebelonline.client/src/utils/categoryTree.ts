import type { CategoryBreadcrumbModel } from '../models/categoryBreadcrumbModel';
import type { CategoryDetailsModel, CategoryParentModel } from '../models/categoryDetailsModel';
import type { CategoryModel } from '../models/categoryModel';
import { catalogPath } from './searchQuery';

export const flattenCategoryAncestors = (
  category: Pick<CategoryDetailsModel, 'id' | 'name' | 'parent'>,
): { id: number; name: string }[] => {
  const ancestors: { id: number; name: string }[] = [];
  let current: CategoryParentModel | null | undefined = category.parent;

  while (current) {
    ancestors.push({ id: current.id, name: current.name });
    current = current.parent;
  }

  ancestors.reverse();
  ancestors.push({ id: category.id, name: category.name });
  return ancestors;
};

export const findCategoryPath = (
  categories: CategoryModel[],
  id: number,
): CategoryModel[] => {
  for (const category of categories) {
    if (category.id === id) {
      return [category];
    }
    const nested = findCategoryPath(category.childrenCategories ?? [], id);
    if (nested.length > 0) {
      return [category, ...nested];
    }
  }
  return [];
};

export const findCategoryByName = (
  categories: CategoryModel[],
  name: string,
): CategoryModel | undefined => {
  for (const category of categories) {
    if (category.name === name) {
      return category;
    }
    const nested = findCategoryByName(category.childrenCategories ?? [], name);
    if (nested) {
      return nested;
    }
  }
  return undefined;
};

export const resolveBreadcrumbUrl = (
  crumb: CategoryBreadcrumbModel,
  categories: CategoryModel[],
): string => {
  if (crumb.url === '/' || crumb.url === '/catalog' || crumb.url?.startsWith('/catalog/')) {
    return crumb.url;
  }

  const match = findCategoryByName(categories, crumb.name);
  if (match) {
    return catalogPath(match.id);
  }

  return crumb.url || '/catalog';
};
