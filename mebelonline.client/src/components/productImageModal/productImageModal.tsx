import { Box, IconButton, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageCarousel from '../imageCarousel/imageCarousel';
import type { ProductImageModel } from '../../models/productImageModel';
import type { EmblaOptionsType } from 'embla-carousel';

const OPTIONS: EmblaOptionsType = { loop: true };

interface IProductImageModalProps {
  isOpen: boolean;
  handleClose: () => void;
  images?: ProductImageModel[] | null;
  startIndex: number;
  rightMargin: number;
  productTitle?: string;
}

const ProductImageModal: React.FC<IProductImageModalProps> = (props: IProductImageModalProps) => {
  const { isOpen, handleClose, images, startIndex, rightMargin, productTitle } = props;
  const list = images ?? [];
  const ordered = list.slice(startIndex).concat(list.slice(0, startIndex));

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="product-gallery-title"
    >
      <Box>
        <IconButton
          onClick={handleClose}
          aria-label="Закрити галерею"
          sx={{
            position: 'absolute',
            top: 8,
            right: rightMargin,
            zIndex: 1,
            color: (theme) => theme.palette.grey[500],
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box id="product-gallery-title" sx={{ position: 'absolute', left: -9999 }}>
          Галерея зображень
        </Box>
        <Box sx={{ pt: 6 }}>
          <ImageCarousel images={ordered} options={OPTIONS} slideHeight="85vh" productTitle={productTitle} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProductImageModal;
