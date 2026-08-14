import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Link } from '@mui/material';
import Header from '../header/header';
import Footer from '../footer/footer';
import { CategoriesProvider } from '../../context/categoriesContext';

const Layout: React.FC = () => {
  return (
    <CategoriesProvider>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <Link
          href="#main-content"
          sx={{
            position: 'absolute',
            left: -9999,
            '&:focus': {
              left: 16,
              top: 16,
              zIndex: (theme) => theme.zIndex.tooltip,
              bgcolor: 'background.paper',
              px: 2,
              py: 1,
            },
          }}
        >
          Перейти до вмісту
        </Link>
        <Header />
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{
            flex: 1,
            mt: { xs: 7, sm: 8 },
            minWidth: 0,
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </CategoriesProvider>
  );
};

export default Layout;
