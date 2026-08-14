import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { ProductCardModel } from '../../models/productCardModel';
import { CardActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import priceFormatter from '../../utils/priceFormatter';
import ProductImage from '../productImage/productImage';

interface IProductCardProps {
  product: ProductCardModel;
}

const ProductCard: React.FC<IProductCardProps> = (props: IProductCardProps) => {
  const { product } = props;
  const to = `/product/${product.id}`;

  return (
    <Card
      sx={{
        position: 'relative',
        maxWidth: 300,
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
      <Box
        component={RouterLink}
        to={to}
        aria-label={product.title}
        sx={{ color: 'inherit', textDecoration: 'none' }}
      >
        <ProductImage src={product.imageUrl} alt={product.title} height={200} />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        <Box
          component={RouterLink}
          to={to}
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          <CardContent sx={{ flexGrow: 1, px: 2, py: 1 }}>
            <Tooltip title={product.title} arrow>
              <Typography
                variant="body2"
                fontWeight={500}
                gutterBottom
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  wordBreak: 'break-word',
                }}
              >
                {product.title}
              </Typography>
            </Tooltip>
          </CardContent>
        </Box>

        <CardActions sx={{ justifyContent: 'flex-start', alignItems: 'flex-end', px: 2 }}>
          <Box>
            {product.oldPrice ? (
              <Typography variant="subtitle2" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                {priceFormatter(product.oldPrice)} грн
              </Typography>
            ) : null}
            <Typography variant="h6">{priceFormatter(product.price)} грн</Typography>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductCard;
