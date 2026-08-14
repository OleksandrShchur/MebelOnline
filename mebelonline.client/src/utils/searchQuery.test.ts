import { describe, expect, it } from 'vitest';
import {
  applyListingFilters,
  buildSearchPath,
  clampSearchString,
  resetListingParams,
  toApiSearchParams,
} from './searchQuery';

describe('searchQuery', () => {
  it('builds a 0-based search URL with pageSize 12', () => {
    expect(buildSearchPath('диван')).toBe(
      '/search?searchString=%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD&page=0&pageSize=12&sortBy=Ascending',
    );
  });

  it('trims and bounds searchString to 100 characters', () => {
    expect(clampSearchString('  диван  ')).toBe('диван');
    expect(clampSearchString('a'.repeat(120)).length).toBe(100);
  });

  it('keeps searchString and categoryId when applying filters', () => {
    const current = new URLSearchParams(
      'searchString=диван&categoryId=16&page=2&pageSize=12&sortBy=Name',
    );
    const next = applyListingFilters(current, {
      selectedBrands: ['MebelUA'],
      selectedMaterials: ['Дуб'],
      minPrice: 1000,
      maxPrice: 50000,
      pageSize: 12,
    });

    expect(next.get('searchString')).toBe('диван');
    expect(next.get('categoryId')).toBe('16');
    expect(next.get('sortBy')).toBe('Name');
    expect(next.get('page')).toBe('0');
    expect(next.getAll('selectedBrands')).toEqual(['MebelUA']);
    expect(next.getAll('selectedMaterials')).toEqual(['Дуб']);
  });

  it('adds categoryId for the API without dropping the text query', () => {
    const current = new URLSearchParams('searchString=диван&page=0&pageSize=12');
    const api = toApiSearchParams(current, { categoryId: 16 });
    expect(api.get('searchString')).toBe('диван');
    expect(api.get('categoryId')).toBe('16');
  });

  it('reset keeps searchString and drops filters', () => {
    const current = new URLSearchParams(
      'searchString=диван&minPrice=1&maxPrice=2&selectedBrands=A',
    );
    const next = resetListingParams(current);
    expect(next.get('searchString')).toBe('диван');
    expect(next.get('minPrice')).toBeNull();
    expect(next.get('selectedBrands')).toBeNull();
    expect(next.get('page')).toBe('0');
    expect(next.get('pageSize')).toBe('12');
  });
});
