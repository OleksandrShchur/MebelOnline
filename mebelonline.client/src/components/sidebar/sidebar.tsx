import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ListItemButton, ListItemIcon, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import type { CategoryModel } from '../../models/categoryModel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as RouterLink } from 'react-router-dom';
import { catalogPath } from '../../utils/searchQuery';

interface IMultiLevelSidebarProps {
  categories: CategoryModel[];
}

const MultiLevelSidebar: React.FC<IMultiLevelSidebarProps> = ({ categories = [] }) => {
  const [hoveredMain, setHoveredMain] = useState<number | null>(null);
  const [hoveredSub, setHoveredSub] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target as Node;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setHoveredMain(null);
        setHoveredSub(null);
      }
    };

    document.addEventListener('mousemove', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setHoveredMain(null);
        setHoveredSub(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isDesktop) {
    return null;
  }

  const activeMainIndex = hoveredMain;
  const activeSubIndex = hoveredSub;

  const hasSecondLevel =
    activeMainIndex !== null && (categories[activeMainIndex]?.childrenCategories?.length ?? 0) > 0;
  const showSecondLevel = hasSecondLevel;

  const hasThirdLevel =
    activeSubIndex !== null &&
    (categories[activeMainIndex!]?.childrenCategories?.[activeSubIndex]?.childrenCategories?.length ?? 0) > 0;
  const showThirdLevel = showSecondLevel && hasThirdLevel;

  const renderItem = (item: CategoryModel, extra?: ReactNode) => (
    <ListItemButton
      component={RouterLink}
      to={catalogPath(item.id)}
      sx={{ minHeight: 48, alignItems: 'flex-start' }}
    >
      <Tooltip title={item.name} placement="right">
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{
            sx: { whiteSpace: 'normal', wordBreak: 'break-word' },
          }}
        />
      </Tooltip>
      {extra}
    </ListItemButton>
  );

  return (
    <Box
      ref={sidebarRef}
      component="nav"
      aria-label="Категорії"
      sx={{ position: 'relative', zIndex: (muiTheme) => muiTheme.zIndex.appBar - 1 }}
    >
      <Paper
        elevation={8}
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 220,
          height: '100%',
          zIndex: 10,
          overflowY: 'auto',
          boxShadow: (muiTheme) => muiTheme.shadows[1],
        }}
      >
        <List sx={{ py: 1 }}>
          {categories.map((item, index) => (
            <ListItem
              key={item.id}
              onMouseEnter={() => {
                setHoveredMain(index);
                setHoveredSub(null);
              }}
              disablePadding
            >
              {renderItem(
                item,
                hoveredMain === index && (item.childrenCategories?.length ?? 0) > 0 ? (
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <ChevronRightIcon />
                  </ListItemIcon>
                ) : undefined,
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      {showSecondLevel && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            left: 220,
            top: 0,
            width: 220,
            height: '100%',
            zIndex: 10,
            overflowY: 'auto',
            boxShadow: (muiTheme) => muiTheme.shadows[4],
          }}
        >
          <List sx={{ py: 1 }}>
            {categories[activeMainIndex!]?.childrenCategories?.map((subItem, subIndex) => (
              <ListItem key={subItem.id} onMouseEnter={() => setHoveredSub(subIndex)} disablePadding>
                {renderItem(
                  subItem,
                  hoveredSub === subIndex && (subItem.childrenCategories?.length ?? 0) > 0 ? (
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <ChevronRightIcon />
                    </ListItemIcon>
                  ) : undefined,
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {showThirdLevel && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            left: 440,
            top: 0,
            width: 220,
            height: '100%',
            zIndex: 10,
            overflowY: 'auto',
            boxShadow: (muiTheme) => muiTheme.shadows[8],
          }}
        >
          <List sx={{ py: 1 }}>
            {categories[activeMainIndex!]?.childrenCategories?.[activeSubIndex!]?.childrenCategories?.map(
              (item) => (
                <ListItem key={item.id} disablePadding>
                  {renderItem(item)}
                </ListItem>
              ),
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default MultiLevelSidebar;
