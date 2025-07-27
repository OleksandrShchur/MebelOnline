import { Box, Grid } from "@mui/material";
import ProductDescriptionCard from "../../productDescriptionCard/productDescriptionCard";
import ImageCarousel from "../../imageCarousel/imageCarousel";
import type { ProductDetailsModel } from "../../../models/productDetailsModel";
import type { EmblaOptionsType } from "embla-carousel";
import ProductInfoCard from "../../productInfoCard/productInfoCard";

interface IProductAllDetailsMobileProps {
    productDetails: ProductDetailsModel;
    options: EmblaOptionsType;
    handleImageClick: (index: number) => void;
};

const ProductAllDetailsMobile: React.FC<IProductAllDetailsMobileProps> = (props: IProductAllDetailsMobileProps) => {
    const { productDetails, options, handleImageClick } = props;

    return (
        <Grid container spacing={4}>
            <Grid size={12}>
                <Box sx={{ position: 'sticky', top: 80, zIndex: 1000, pb: 2 }}>
                    <ImageCarousel images={productDetails.images} options={options} handleOpen={handleImageClick}
                        slideHeight="60vh"
                    />
                </Box>
            </Grid>
            <Grid size={12}>
                <Box>
                    <ProductInfoCard id={productDetails.id}
                        title={productDetails.title}
                        price={productDetails.price}
                        oldPrice={productDetails.oldPrice}
                        note={productDetails.note}
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
        </Grid>
    );
}

export default ProductAllDetailsMobile;
