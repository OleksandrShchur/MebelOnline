import { Box, Container, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import categoryService from '../../services/categoryService';
import type { CategoryDetailsModel } from '../../models/categoryDetailsModel';
import ProductListingLayout from '../../components/productListingLayout/productListingLayout';
import AppBreadcrumbs from '../../components/appBreadcrumbs/appBreadcrumbs';
import StatusState from '../../components/statusState/statusState';
import NotFound from '../notFound/notFound';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useCategories } from '../../context/categoriesContext';
import { ApiError } from '../../services/httpClient';
import { catalogPath } from '../../utils/searchQuery';
import { flattenCategoryAncestors } from '../../utils/categoryTree';
import type { CategoryBreadcrumbModel } from '../../models/categoryBreadcrumbModel';

const CategoryListing: React.FC = () => {
  const { categoryId } = useParams();
  const numericId = Number(categoryId);
  const isValidId = Number.isInteger(numericId) && numericId > 0;
  const { findPath } = useCategories();
  const [category, setCategory] = useState<CategoryDetailsModel | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'notfound' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useDocumentTitle(category?.name ?? 'Категорія');

  useEffect(() => {
    if (!isValidId) {
      setStatus('notfound');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setError(null);

    categoryService
      .fetchById(numericId)
      .then((data) => {
        if (cancelled) return;
        setCategory(data);
        setStatus('success');
      })
      .catch((err: Error) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.isNotFound) {
          setStatus('notfound');
          return;
        }
        setError(err.message || 'Не вдалося завантажити категорію.');
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [isValidId, numericId, retryToken]);

  const breadcrumbs = useMemo<CategoryBreadcrumbModel[]>(() => {
    const trail: CategoryBreadcrumbModel[] = [
      { name: 'Головна', url: '/' },
      { name: 'Каталог меблів', url: '/catalog' },
    ];

    if (category) {
      flattenCategoryAncestors(category).forEach((item) => {
        trail.push({ name: item.name, url: catalogPath(item.id) });
      });
      return trail;
    }

    const treePath = isValidId ? findPath(numericId) : [];
    treePath.forEach((item) => {
      trail.push({ name: item.name, url: catalogPath(item.id) });
    });
    return trail;
  }, [category, findPath, isValidId, numericId]);

  if (!isValidId || status === 'notfound') {
    return (
      <NotFound
        title="Категорію не знайдено"
        description="Такої категорії немає. Оберіть іншу в каталозі."
      />
    );
  }

  return (
    <Container sx={{ py: 3, maxWidth: 'none !important' }}>
      <Box sx={{ px: { xs: 1, md: 2 }, minWidth: 0 }}>
        {status === 'loading' && <StatusState loading loadingLabel="Завантаження категорії..." />}
        {status === 'error' && <StatusState error={error} onRetry={() => setRetryToken((token) => token + 1)} />}
        {status === 'success' && category && (
          <>
            <AppBreadcrumbs items={breadcrumbs} />
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              sx={{ mt: 2, mb: 2, wordBreak: 'break-word' }}
            >
              {category.name}
            </Typography>
            <ProductListingLayout categoryId={numericId} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default CategoryListing;
