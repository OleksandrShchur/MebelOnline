import Box from '@mui/material/Box';
import type React from 'react';
import MultiLevelSidebar from '../../components/sidebar/sidebar';
import ProductGrid from '../../components/productGrid/productGrid';
import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useCategories } from '../../context/categoriesContext';
import StatusState from '../../components/statusState/statusState';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { SHOP_TAGLINE } from '../../constants/contacts';

const Home: React.FC = () => {
  const { categories, status, error, reload } = useCategories();
  useDocumentTitle('Головна');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        position: 'relative',
        minHeight: { md: '70vh' },
      }}
    >
      {status === 'success' && categories.length > 0 && <MultiLevelSidebar categories={categories} />}

      <Box sx={{ flex: 1, pl: { md: status === 'success' && categories.length > 0 ? '220px' : 0 }, minWidth: 0 }}>
        <Container sx={{ pt: 3, pb: 1 }}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 2,
              p: { xs: 3, md: 5 },
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom sx={{ wordBreak: 'break-word' }}>
              {SHOP_TAGLINE}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, maxWidth: 640 }}>
              Переглядайте каталог меблів онлайн та обирайте рішення для кожної кімнати.
            </Typography>
            <Button component={RouterLink} to="/catalog" variant="contained" color="secondary">
              Переглянути каталог
            </Button>
          </Box>
          {status === 'loading' && <StatusState loading loadingLabel="Завантаження категорій..." />}
          {status === 'error' && (
            <StatusState
              error={error ?? 'Не вдалося завантажити категорії.'}
              onRetry={reload}
            />
          )}
          {status === 'success' && categories.length === 0 && (
            <StatusState
              empty
              emptyTitle="Категорії відсутні"
              emptyDescription="Каталог поки порожній."
            />
          )}
        </Container>
        <ProductGrid />
      </Box>
    </Box>
  );
};

export default Home;
