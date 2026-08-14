import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Layout from './components/layout/layout';
import ProductDetails from './pages/productDetails/productDetails';
import Catalog from './pages/catalog/catalog';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Search from './pages/search/search';
import CategoryListing from './pages/categoryListing/categoryListing';
import NotFound from './pages/notFound/notFound';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="catalog/:categoryId" element={<CategoryListing />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
