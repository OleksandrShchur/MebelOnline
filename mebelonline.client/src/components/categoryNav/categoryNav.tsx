import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import type { CategoryModel } from '../../models/categoryModel';
import { catalogPath } from '../../utils/searchQuery';

interface ICategoryNavProps {
  categories: CategoryModel[];
  onNavigate?: () => void;
}

const CategoryNav: React.FC<ICategoryNavProps> = ({ categories, onNavigate }) => {
  if (!categories.length) {
    return null;
  }

  return (
    <List disablePadding>
      {categories.map((category) => {
        const children = category.childrenCategories ?? [];
        const to = catalogPath(category.id);

        if (children.length === 0) {
          return (
            <ListItem key={category.id} disablePadding>
              <ListItemButton component={RouterLink} to={to} onClick={onNavigate} sx={{ minHeight: 48 }}>
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{ sx: { whiteSpace: 'normal', wordBreak: 'break-word' } }}
                />
              </ListItemButton>
            </ListItem>
          );
        }

        return (
          <Accordion key={category.id} disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 48, px: 2 }}>
              <ListItemText
                primary={
                  <RouterLink
                    to={to}
                    onClick={(event) => {
                      event.stopPropagation();
                      onNavigate?.();
                    }}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {category.name}
                  </RouterLink>
                }
                primaryTypographyProps={{ sx: { whiteSpace: 'normal', wordBreak: 'break-word' } }}
              />
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, pl: 2 }}>
              <CategoryNav categories={children} onNavigate={onNavigate} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </List>
  );
};

export default CategoryNav;
