import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import type { ProductCardModel } from '../../models/productCardModel';
import ProductCard from '../productCard/productCard';
import productService from '../../services/productService';

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductCardModel[]>([]);

  const populateProducts = async () => {
    const data = await productService.fetchLatest();

    setProducts(data);
  }

  useEffect(() => {
    populateProducts();
  }, []);

  return (
    <Container sx={{ pt: 9, pb: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Новинки
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 6, md: 4, lg: 3 }} sx={{ justifyContent: "flex-end", alignItems: "stretch", mx: 'auto' }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
