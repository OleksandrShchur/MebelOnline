import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';
import HeaderSearch from '../headerSearch/headerSearch';
import { SHOP_NAME } from '../../constants/contacts';
import { useCategories } from '../../context/categoriesContext';
import CategoryNav from '../categoryNav/categoryNav';
import StatusState from '../statusState/statusState';

const PAGES = [
  { title: 'Головна', url: '/' },
  { title: 'Каталог', url: '/catalog' },
  { title: 'Пошук', url: '/search' },
];

const Header: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const { categories, status, error, reload } = useCategories();

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const drawer = (
    <Box sx={{ width: '100%', pb: 4 }} role="navigation" aria-label="Мобільна навігація">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={700}>
          {SHOP_NAME}
        </Typography>
        <IconButton onClick={closeDrawer} aria-label="Закрити меню">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <List>
        {PAGES.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton component={RouterLink} to={page.url} onClick={closeDrawer} sx={{ minHeight: 48 }}>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="subtitle1" fontWeight={600} sx={{ px: 2, pt: 2 }}>
        Категорії
      </Typography>
      {status === 'loading' && <StatusState loading loadingLabel="Завантаження категорій..." />}
      {status === 'error' && (
        <Box sx={{ px: 2 }}>
          <StatusState error={error} onRetry={reload} />
        </Box>
      )}
      {status === 'success' && categories.length === 0 && (
        <Box sx={{ px: 2 }}>
          <StatusState empty emptyTitle="Категорії відсутні" emptyDescription="Спробуйте відкрити каталог пізніше." />
        </Box>
      )}
      {status === 'success' && categories.length > 0 && (
        <CategoryNav categories={categories} onNavigate={closeDrawer} />
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="header">
        <Toolbar sx={{ gap: 1, minWidth: 0 }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={openDrawer}
              aria-label="Відкрити меню"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-nav"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              id="mobile-nav"
              anchor="left"
              variant="temporary"
              open={isDrawerOpen}
              onClose={closeDrawer}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: { xs: '100%', sm: 360 },
                  maxWidth: '100%',
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          <Box
            component={RouterLink}
            to="/"
            aria-label={SHOP_NAME}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
              mr: 1,
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            <WeekendOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="span"
              fontWeight={700}
              noWrap
              sx={{ display: { xs: 'none', sm: 'inline' } }}
            >
              {SHOP_NAME}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, minWidth: 0 }}>
            {PAGES.map((page) => (
              <Button
                key={page.title}
                sx={{ color: 'white', display: 'block' }}
                component={RouterLink}
                to={page.url}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: { xs: 1, md: 0 }, minWidth: 0, maxWidth: { xs: '100%', md: 480 } }}>
            <HeaderSearch />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
