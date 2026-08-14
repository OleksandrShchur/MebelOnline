import { Box, Container, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductListingLayout from '../../components/productListingLayout/productListingLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import AppBreadcrumbs from '../../components/appBreadcrumbs/appBreadcrumbs';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('searchString') ?? '').trim();
  useDocumentTitle(query ? `Пошук: ${query}` : 'Пошук');

  return (
    <Container sx={{ py: 3, maxWidth: 'none !important' }}>
      <Box sx={{ px: { xs: 1, md: 2 }, minWidth: 0 }}>
        <AppBreadcrumbs
          items={[
            { name: 'Головна', url: '/' },
            { name: 'Пошук', url: '/search' },
          ]}
        />
        <Typography variant="h5" component="h1" fontWeight="bold" sx={{ mt: 2, mb: 2, wordBreak: 'break-word' }}>
          {query ? `Результати пошуку: «${query}»` : 'Пошук товарів'}
        </Typography>
        <ProductListingLayout resetLabel="Скинути пошук" />
      </Box>
    </Container>
  );
};

export default Search;
