import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const ClearIconWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    display: 'flex',
}));

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    fontSize: '14px',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
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

const HeaderSearch: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedHistory = document.cookie
            .split('; ')
            .find(row => row.startsWith('searchHistory='))
            ?.split('=')[1];
        if (savedHistory) {
            setSearchHistory(JSON.parse(decodeURIComponent(savedHistory)));
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('searchString');
        if (q) setSearchQuery(q);
    }, [location.search]);

    const handleSearch = (e: any) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            const query = searchQuery.trim();
            const updatedHistory = [query, ...searchHistory].slice(0, 5);
            setSearchHistory(updatedHistory);
            document.cookie = `searchHistory=${encodeURIComponent(JSON.stringify(updatedHistory))}; path=/`;

            // Redirect to search page with query params matching backend SearchParamsModel
            navigate(`/search?searchString=${encodeURIComponent(query)}&page=0&pageSize=10&sortBy=Ascending`);

            // Optionally clear the input after redirect or keep it for UX
            setSearchQuery('');
            setAnchorEl(null);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectHistory = (item: string) => {
        setSearchQuery(item);
        setAnchorEl(null);
    };

    return (
        <Search>
            <SearchIconWrapper onClick={handleClick}>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Пошук..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
            />
            {searchQuery && (
                <ClearIconWrapper onClick={() => setSearchQuery('')}>
                    <CloseIcon fontSize="small" />
                </ClearIconWrapper>
            )}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {searchHistory.map((item, index) => (
                    <MenuItem key={index} onClick={() => handleSelectHistory(item)}>
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </Search>
    );
};

export default HeaderSearch;
