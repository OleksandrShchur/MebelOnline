import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CategoryModel } from '../models/categoryModel';
import categoryService from '../services/categoryService';
import { findCategoryPath } from '../utils/categoryTree';

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

type CategoriesContextValue = {
  categories: CategoryModel[];
  status: LoadStatus;
  error: string | null;
  findPath: (id: number) => CategoryModel[];
  reload: () => void;
};

const CategoriesContext = createContext<CategoriesContextValue | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    categoryService
      .fetchAll()
      .then((data) => {
        if (cancelled) return;
        setCategories(data);
        setStatus('success');
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setCategories([]);
        setStatus('error');
        setError(err.message || 'Не вдалося завантажити категорії.');
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const value = useMemo<CategoriesContextValue>(
    () => ({
      categories,
      status,
      error,
      findPath: (id: number) => findCategoryPath(categories, id),
      reload: () => setReloadToken((token) => token + 1),
    }),
    [categories, status, error],
  );

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};

export const useCategories = (): CategoriesContextValue => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoriesProvider');
  }
  return context;
};
