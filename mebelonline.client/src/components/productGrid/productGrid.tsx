import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import type { ProductCardModel } from '../../models/productCardModel';
import ProductCard from '../productCard/productCard';
import productService from '../../services/productService';
import StatusState from '../statusState/statusState';

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductCardModel[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'empty' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  const populateProducts = async () => {
    setStatus('loading');
    setError(null);
    try {
      const data = await productService.fetchLatest();
      setProducts(data);
      setStatus(data.length === 0 ? 'empty' : 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити новинки.');
      setStatus('error');
    }
  };

  useEffect(() => {
    populateProducts();
  }, []);

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        Новинки
      </Typography>
      {status !== 'success' && (
        <StatusState
          loading={status === 'loading'}
          error={status === 'error' ? error : null}
          onRetry={populateProducts}
          empty={status === 'empty'}
          emptyTitle="Новинок поки немає"
          emptyDescription="Завітайте пізніше або перегляньте каталог."
        />
      )}
      {status === 'success' && (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid
              key={product.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex' }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductGrid;
