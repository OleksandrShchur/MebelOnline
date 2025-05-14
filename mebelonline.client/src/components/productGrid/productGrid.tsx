import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import type { ProductCardModel } from '../../models/productCardModel';
import ProductCard from '../productCard/productCard';

const mockProducts: ProductCardModel[] = [
  {
    id: 1,
    title: 'Шафа MiroMark Лілі / Lily 3-дверна із дзеркалом 134 см, глянець кашемір',
    price: 11339,
    image: 'https://www.dybok.com.ua/image/113486/safa-miromark-lili-lily-3-dverna-192351-catalog.jpg?v=0.99', // Replace with real image URLs
    rating: 0,
    options: 0,
  },
  {
    id: 2,
    title: 'Ліжко Arbor Drev Симфонія Люкс 140 см',
    price: 10099,
    image: 'https://www.dybok.com.ua/image/113475/lizko-arbor-drev-simfonia-luks-140-192261-catalog.jpg?v=0.99',
    rating: 0,
    options: 18,
  },
  {
    id: 3,
    title: 'Ліжко Arbor Drev Симфонія Люкс 120 см',
    price: 9499,
    image: 'https://www.dybok.com.ua/image/113476/lizko-arbor-drev-simfonia-luks-120-192281-catalog.jpg?v=0.99',
    rating: 0,
    options: 18,
  },
  {
    id: 4,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
];

const ProductGrid: React.FC = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Новинки
      </Typography>
      <Grid container spacing={2}>
        {mockProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
