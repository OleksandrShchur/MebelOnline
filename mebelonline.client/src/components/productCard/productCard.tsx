import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductCardModel } from '../../models/productCardModel';
import { CardActions } from '@mui/material';

const ProductCard: React.FC<{ product: ProductCardModel }> = ({ product }) => {
  return (
    <Card sx={{ position: 'relative', maxWidth: 300, height: 350, mx: 'auto', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.title}
      />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, px: 2, py: 1 }}>
          {product.options > 0 && (
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              Можливі варіанти: {product.options}
            </Typography>
          )}

          <Tooltip title={product.title} arrow>
            <Typography variant="body2" fontWeight={500} gutterBottom
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: product.options > 0 ? 2 : 3, // number of lines shown
              }}
            >
              {product.title}
            </Typography></Tooltip>

          <Rating value={product.rating} readOnly size="small" />
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
          <Typography variant="h6">{product.price.toLocaleString()} грн</Typography>

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
