import { Box, Grid } from '@mui/material';
import ProductDescriptionCard from '../../productDescriptionCard/productDescriptionCard';
import ImageCarousel from '../../imageCarousel/imageCarousel';
import type { ProductDetailsModel } from '../../../models/productDetailsModel';
import type { EmblaOptionsType } from 'embla-carousel';
import ProductInfoCard from '../../productInfoCard/productInfoCard';

interface IProductAllDetailsDesktopProps {
  productDetails: ProductDetailsModel;
  options: EmblaOptionsType;
  handleImageClick: (index: number) => void;
}

const ProductAllDetailsDesktop: React.FC<IProductAllDetailsDesktopProps> = (
  props: IProductAllDetailsDesktopProps,
) => {
  const { productDetails, options, handleImageClick } = props;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <ProductInfoCard
            id={productDetails.id}
            title={productDetails.title}
            price={productDetails.price}
            oldPrice={productDetails.oldPrice}
            note={productDetails.note}
            brand={productDetails.brand}
            frontOptions={productDetails.frontOptions}
            frameOptions={productDetails.frameOptions}
          />
        </Box>
        <Box>
          <ProductDescriptionCard
            title={productDetails.title}
            width={productDetails.width}
            height={productDetails.height}
            depth={productDetails.depth}
            description={productDetails.description}
            attributes={productDetails.attributes}
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ position: 'sticky', top: 80, zIndex: 2, pb: 2, minWidth: 0 }}>
          <ImageCarousel
            images={productDetails.images}
            options={options}
            handleOpen={handleImageClick}
            slideHeight="60vh"
            productTitle={productDetails.title}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductAllDetailsDesktop;
