import { Box, Card, CardContent, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { CatalogModel } from '../../models/catalogModel';
import ProductImage from '../productImage/productImage';
import { catalogPath } from '../../utils/searchQuery';

const SUBCATEGORIES_COUNT = 4;

interface ICatalogCardProps {
  category: CatalogModel;
}

const CatalogCard: React.FC<ICatalogCardProps> = ({ category }) => {
  const categoryUrl = catalogPath(category.id);
  const subCategories = category.subCategories ?? [];

  return (
    <Card
      sx={{
        position: 'relative',
        maxWidth: 400,
        width: '100%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: 2,
        transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box component={RouterLink} to={categoryUrl} sx={{ color: 'inherit', textDecoration: 'none' }}>
        <ProductImage src={category.imageUrl} alt={category.name} aspectRatio="16 / 9" height="auto" />
      </Box>

      <CardContent
        sx={{
          px: 2,
          py: 1,
          flexGrow: 1,
          minWidth: 0,
          '&:last-child': {
            paddingBottom: 1,
          },
        }}
      >
        <Box component={RouterLink} to={categoryUrl} sx={{ color: 'inherit', textDecoration: 'none' }}>
          <Tooltip title={category.name} arrow>
            <Typography
              variant="subtitle1"
              fontWeight={500}
              gutterBottom
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                wordBreak: 'break-word',
              }}
            >
              {category.name}
            </Typography>
          </Tooltip>
        </Box>

        {Array.from({ length: SUBCATEGORIES_COUNT }, (_, index) => subCategories[index] || null).map(
          (sub, index) =>
            sub ? (
              <Typography
                key={sub.id}
                variant="caption"
                component={RouterLink}
                to={catalogPath(sub.id)}
                gutterBottom
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                  minHeight: '1.5em',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                  wordBreak: 'break-word',
                }}
              >
                {sub.name}
              </Typography>
            ) : (
              <Typography
                key={`placeholder-${index}`}
                variant="caption"
                gutterBottom
                sx={{ display: 'block', minHeight: '1.5em' }}
              >
                {'\u00A0'}
              </Typography>
            ),
        )}

        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <Typography
            variant="button"
            component={RouterLink}
            to={categoryUrl}
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            Показати всі...
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CatalogCard;
