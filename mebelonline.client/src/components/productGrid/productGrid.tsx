import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import type { ProductCardModel } from '../../models/productCardModel';
import ProductCard from '../productCard/productCard';

const mockProducts: ProductCardModel[] = [
  {
    id: 1,
    title: 'Шафа MiroMark Лілі / Lily 3-дверна із дзеркалом 134 см, глянець кашемір. Шафа MiroMark Лілі / Lily 3-дверна із дзеркалом 134 см, глянець кашемір',
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
  {
    id: 5,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 6,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 7,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 8,
    title: 'Кухня МоДа / MoDa 2.6 ІІ VIP-master',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/90890/kuhna-moda-moda-26-ii-vip-124980-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 9,
    title: 'Шафа MiroMark Лілі / Lily 3-дверна із дзеркалом 134 см, глянець кашемір',
    price: 11339,
    image: 'https://www.dybok.com.ua/image/113486/safa-miromark-lili-lily-3-dverna-192351-catalog.jpg?v=0.99', // Replace with real image URLs
    rating: 0,
    options: 0,
  },
  {
    id: 10,
    title: 'Ліжко Arbor Drev Симфонія Люкс 140 см',
    price: 10099,
    image: 'https://www.dybok.com.ua/image/113475/lizko-arbor-drev-simfonia-luks-140-192261-catalog.jpg?v=0.99',
    rating: 0,
    options: 18,
  },
  {
    id: 11,
    title: 'Ліжко Arbor Drev Симфонія Люкс 120 см',
    price: 9499,
    image: 'https://www.dybok.com.ua/image/113476/lizko-arbor-drev-simfonia-luks-120-192281-catalog.jpg?v=0.99',
    rating: 0,
    options: 18,
  },
  {
    id: 12,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 13,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 14,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 15,
    title: 'Матрац NanoDream / Нанодрім 80x200 вакуумна скрутка',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/113474/matrac-nanodream-nanodrim-80h200-vakuumna-skrutka-192245-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
  {
    id: 16,
    title: 'Кухня МоДа / MoDa 2.6 ІІ VIP-master',
    price: 7898,
    image: 'https://www.dybok.com.ua/image/90890/kuhna-moda-moda-26-ii-vip-124980-catalog.jpg?v=0.99',
    rating: 0,
    options: 0,
  },
];

const ProductGrid: React.FC = () => {
  return (
    <Container sx={{ pt: 9, pb: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Новинки
      </Typography>
      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          <Grid size={{ xs: 6, md: 4, lg: 3 }} sx={{ justifyContent: "flex-end", alignItems: "stretch", mx: 'auto' }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
