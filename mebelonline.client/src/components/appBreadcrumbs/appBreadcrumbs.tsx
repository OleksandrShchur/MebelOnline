import { Breadcrumbs, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { CategoryBreadcrumbModel } from '../../models/categoryBreadcrumbModel';
import { useCategories } from '../../context/categoriesContext';
import { resolveBreadcrumbUrl } from '../../utils/categoryTree';

interface IAppBreadcrumbsProps {
  items: CategoryBreadcrumbModel[];
  currentLabel?: string;
}

const AppBreadcrumbs: React.FC<IAppBreadcrumbsProps> = ({ items, currentLabel }) => {
  const { categories } = useCategories();
  const crumbs = items.filter((item) => item.name);

  if (crumbs.length === 0 && !currentLabel) {
    return null;
  }

  return (
    <Breadcrumbs
      aria-label="Навігаційний ланцюжок"
      sx={{
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'wrap',
        },
      }}
    >
      {crumbs.map((crumb, index) => {
        const isLast = !currentLabel && index === crumbs.length - 1;
        const to = resolveBreadcrumbUrl(crumb, categories);

        if (isLast) {
          return (
            <Typography key={`${crumb.name}-${index}`} color="text.primary" sx={{ wordBreak: 'break-word' }}>
              {crumb.name}
            </Typography>
          );
        }

        return (
          <Typography
            key={`${crumb.name}-${index}`}
            component={RouterLink}
            to={to}
            color="inherit"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              wordBreak: 'break-word',
            }}
          >
            {crumb.name}
          </Typography>
        );
      })}
      {currentLabel && (
        <Typography color="text.primary" sx={{ wordBreak: 'break-word' }}>
          {currentLabel}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
