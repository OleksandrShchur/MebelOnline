import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductCardModel } from '../../models/productCardModel';
import { CardActions, Link } from '@mui/material';
import priceFormatter from '../../helpers/priceFormatter';

const ProductCard: React.FC<{ product: ProductCardModel }> = ({ product }) => {
  return (
    <Card
      sx={{
        position: 'relative', maxWidth: 300, height: 350, mx: 'auto', display: 'flex', flexDirection: 'column',
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: 2,
        transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(-4px)',
        },
      }}>
      <Link underline="none" href={`/product/${product.id}`} color="inherit">
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.title}
        />
      </Link>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Link underline="none" href={`/product/${product.id}`} color="inherit">
          <CardContent sx={{ flexGrow: 1, px: 2, py: 1 }}>
            <Tooltip title={product.title} arrow>
              <Typography variant="body2" fontWeight={500} gutterBottom
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3, // number of lines shown
                }}
              >
                {product.title}
              </Typography>
            </Tooltip>
          </CardContent>
        </Link>

        <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', px: 2 }}>
          <Box>
            {product.oldPrice &&
              <Typography
                variant="subtitle2"
                sx={{ textDecoration: 'line-through', color: 'gray' }}
              >
                {priceFormatter(product.oldPrice)} грн
              </Typography>
            }
            <Typography variant="h6">
              {priceFormatter(product.price)} грн
            </Typography>
          </Box>

          <Tooltip title="Додати в обране">
            <IconButton
              sx={{
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductCard;
