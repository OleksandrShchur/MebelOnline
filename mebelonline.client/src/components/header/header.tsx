import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import HeaderSearch from '../headerSearch/headerSearch';

const PAGES = [
  { title: 'Головна', url: '' },
  { title: 'Каталог', url: '/catalog' },
  { title: 'Контакти', url: '' },
  { title: 'Про нас', url: '' },
];

const Header: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const handleDrawerIconClick = () => isDrawerOpen ? closeDrawer() : openDrawer();

  const drawer = (
    <Box onClick={closeDrawer}>
      <Toolbar />
      <List>
        {PAGES.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={
                  <Link
                    to={page.url}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {page.title}
                  </Link>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" color="inherit" onClick={handleDrawerIconClick}>
              {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Drawer
              anchor="top"
              variant="temporary"
              open={isDrawerOpen}
              onClose={closeDrawer}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '100%',
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map((page) => (
              <Button
                key={page.title}
                sx={{ margin: 2, my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.url}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <HeaderSearch />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
