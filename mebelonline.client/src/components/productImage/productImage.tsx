import { Box } from '@mui/material';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import { useState } from 'react';

interface IProductImageProps {
  src?: string | null;
  alt: string;
  height?: number | string;
  objectFit?: 'cover' | 'contain';
  aspectRatio?: string;
  onClick?: () => void;
  className?: string;
}

const ProductImage: React.FC<IProductImageProps> = ({
  src,
  alt,
  height = 200,
  objectFit = 'cover',
  aspectRatio,
  onClick,
  className,
}) => {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <Box
        role="img"
        aria-label={alt}
        className={className}
        sx={{
          height,
          aspectRatio,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          color: 'text.secondary',
        }}
      >
        <ImageNotSupportedOutlinedIcon fontSize="large" />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      className={className}
      src={src ?? undefined}
      alt={alt}
      onClick={onClick}
      onError={() => setFailed(true)}
      sx={{
        height,
        aspectRatio,
        width: '100%',
        objectFit,
        display: 'block',
        cursor: onClick ? 'pointer' : 'default',
      }}
    />
  );
};

export default ProductImage;
