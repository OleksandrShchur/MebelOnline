import { describe, expect, it } from 'vitest';
import { findCategoryPath, flattenCategoryAncestors, resolveBreadcrumbUrl } from './categoryTree';
import { categoriesFixture } from '../test/fixtures';

describe('categoryTree', () => {
  it('preserves hierarchy order when resolving a nested path', () => {
    const path = findCategoryPath(categoriesFixture, 111);
    expect(path.map((item) => item.id)).toEqual([1, 11, 111]);
  });

  it('maps a search-style breadcrumb to /catalog/:id', () => {
    const url = resolveBreadcrumbUrl(
      { name: 'Дивани', url: '/search?searchString=Дивани&page=0' },
      categoriesFixture,
    );
    expect(url).toBe('/catalog/2');
  });

  it('walks nested CategoryDetails parent chain from GET /api/categories/{id}', () => {
    const trail = flattenCategoryAncestors({
      id: 34,
      name: 'Прямі дивани з нішею',
      parent: {
        id: 30,
        name: 'Прямі дивани',
        parent: { id: 10, name: 'Дивани', parent: null },
      },
    });

    expect(trail.map((item) => item.id)).toEqual([10, 30, 34]);
  });
});
