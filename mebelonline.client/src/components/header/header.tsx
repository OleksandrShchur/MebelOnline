import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const PAGES = [
  {
    title: 'Головна',
    url: ''
  },
  {
    title: 'Каталог',
    url: '/catalog'
  },
  {
    title: 'Контакти',
    url: ''
  },
  {
    title: 'Про нас',
    url: ''
  },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '36ch',
      '&:focus': {
        width: '48ch',
      },
    },
  },
}));

const Header: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {PAGES.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton>
              <ListItemText>
                <Link to={page.url} style={{ textDecoration: "none", color: "inherit", }}>
                  {page.title}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, }}>
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer}
              color="inherit"
            >
              {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Drawer
              anchor="top"
              variant="temporary"
              open={isDrawerOpen}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '100%',
                },
              }}
              slotProps={{
                root: {
                  keepMounted: true, // Better open performance on mobile.
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
                onClick={toggleDrawer}
                sx={{ margin: 2, my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.url} style={{ textDecoration: "none", color: "inherit", }}>
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Пошук..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
