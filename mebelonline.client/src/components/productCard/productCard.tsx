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

const ProductCard: React.FC<{ product: ProductCardModel }> = ({ product }) => {
  return (
    <Card sx={{ position: 'relative', maxWidth: 300, mx: 'auto' }}>
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.title}
      />

      <CardContent>
        {product.options > 0 && (
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Можливі варіанти: {product.options}
          </Typography>
        )}

        <Typography variant="body2" fontWeight={500} gutterBottom>
          {product.title}
        </Typography>

        <Rating value={product.rating} readOnly size="small" />

        <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{product.price.toLocaleString()} грн</Typography>

          <Tooltip title="Додати в обране">
            {/* Wishlist icon */}
            <IconButton
              sx={{
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
