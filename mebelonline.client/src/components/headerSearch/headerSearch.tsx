import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { IconButton, InputBase, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { SEARCH_STRING_MAX } from '../../constants/pagination';
import { buildSearchPath, clampSearchString } from '../../utils/searchQuery';

const ClearIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(0.5),
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  minWidth: 0,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  fontSize: '14px',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 5, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const HeaderSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedHistory = document.cookie
      .split('; ')
      .find((row) => row.startsWith('searchHistory='))
      ?.split('=')[1];
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(decodeURIComponent(savedHistory)));
      } catch {
        setSearchHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('searchString');
    if (location.pathname === '/search' && query) {
      setSearchQuery(query);
    }
    if (location.pathname === '/search' && !query) {
      setSearchQuery('');
    }
  }, [location.search, location.pathname]);

  const submitSearch = (raw: string) => {
    const query = clampSearchString(raw);
    if (!query) {
      navigate('/search');
      setAnchorEl(null);
      return;
    }

    const updatedHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 5);
    setSearchHistory(updatedHistory);
    document.cookie = `searchHistory=${encodeURIComponent(JSON.stringify(updatedHistory))}; path=/`;
    navigate(buildSearchPath(query));
    setAnchorEl(null);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setAnchorEl(null);
      submitSearch(searchQuery);
    }
  };

  const handleHistoryOpen = (event: { currentTarget: HTMLElement }) => {
    if (searchHistory.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectHistory = (item: string) => {
    setSearchQuery(item);
    submitSearch(item);
  };

  return (
    <Search>
      <SearchIconWrapper onClick={(event) => handleHistoryOpen(event)}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Пошук..."
        inputProps={{
          'aria-label': 'Пошук товарів',
          maxLength: SEARCH_STRING_MAX,
        }}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value.slice(0, SEARCH_STRING_MAX))}
        onKeyDown={handleSearchKeyDown}
      />
      {searchQuery && (
        <ClearIconWrapper>
          <IconButton
            size="small"
            aria-label="Очистити пошук"
            onClick={() => setSearchQuery('')}
            sx={{ color: 'inherit', minWidth: 36, minHeight: 36 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </ClearIconWrapper>
      )}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {searchHistory.map((item) => (
          <MenuItem key={item} onClick={() => handleSelectHistory(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Search>
  );
};

export default HeaderSearch;
