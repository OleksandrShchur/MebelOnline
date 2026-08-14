import { Box, Container } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CategoryBreadcrumbModel } from '../../models/categoryBreadcrumbModel';
import categoryService from '../../services/categoryService';
import type { ProductDetailsModel } from '../../models/productDetailsModel';
import productService from '../../services/productService';
import ProductAllDetails from '../../components/productAllDetails/productAllDetails';
import AppBreadcrumbs from '../../components/appBreadcrumbs/appBreadcrumbs';
import StatusState from '../../components/statusState/statusState';
import NotFound from '../notFound/notFound';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { ApiError } from '../../services/httpClient';

type ProductDetailsParams = {
  productId: string;
};

const ProductDetails: React.FC = () => {
  const { productId } = useParams<ProductDetailsParams>();
  const [breadcrumbs, setBreadcrumbs] = useState<CategoryBreadcrumbModel[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetailsModel | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'notfound' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(productDetails?.title ?? 'Товар');

  useEffect(() => {
    const id = productId ?? '';
    if (!id || Number(id) <= 0) {
      setStatus('notfound');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setError(null);

    const load = async () => {
      try {
        const details = await productService.fetchProductDetails(id);
        if (cancelled) return;
        const crumbs = await categoryService
          .fetchBreadcrumbsForProduct(id)
          .catch(() => [] as CategoryBreadcrumbModel[]);
        if (cancelled) return;
        setProductDetails(details);
        setBreadcrumbs(crumbs);
        setStatus('success');
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.isNotFound) {
          setStatus('notfound');
          return;
        }
        setError(err instanceof Error ? err.message : 'Не вдалося завантажити товар.');
        setStatus('error');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (status === 'notfound') {
    return <NotFound title="Товар не знайдено" description="Цього товару немає в каталозі." />;
  }

  return (
    <Container sx={{ py: 3, maxWidth: 'none !important' }}>
      {status === 'loading' && <StatusState loading loadingLabel="Завантаження товару..." />}
      {status === 'error' && <StatusState error={error} />}
      {status === 'success' && productDetails && (
        <>
          <AppBreadcrumbs items={breadcrumbs} currentLabel={productDetails.title} />
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ px: { xs: 0, md: 2 }, minWidth: 0 }}>
              <ProductAllDetails productDetails={productDetails} />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProductDetails;
