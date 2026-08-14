export const PAGE_DEFAULT = 0;
export const PAGE_SIZE_DEFAULT = 12;
export const PAGE_SIZE_MAX = 48;
export const PAGE_SIZE_OPTIONS = [12, 24, 48] as const;
export const SEARCH_STRING_MAX = 100;

export const SORT_BY = {
  Ascending: 'Ascending',
  Descending: 'Descending',
  Name: 'Name',
} as const;

export type SortByValue = (typeof SORT_BY)[keyof typeof SORT_BY];
