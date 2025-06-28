import { Box, Grid } from "@mui/material";
import ProductInfoCard from "../productInfoCard/productInfoCard";
import ProductImageModal from "../productImageModal/productImageModal";
import { useState } from "react";
import type { ProductDetailsModel } from "../../models/productDetailsModel";
import { type EmblaOptionsType } from "embla-carousel";
import ImageCarousel from "../imageCarousel/imageCarousel";
import ProductDescriptionCard from "../productDescriptionCard/productDescriptionCard";

const OPTIONS: EmblaOptionsType = { loop: true };

interface IProductAllDetailsProps {
    productDetails: ProductDetailsModel;
};

const ProductAllDetails: React.FC<IProductAllDetailsProps> = (props: IProductAllDetailsProps) => {
    const { productDetails } = props;
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setModalOpen(true);
    };

    return (
        <>
            <ProductImageModal isOpen={isModalOpen} handleClose={handleModalClose} images={productDetails.images}
                startIndex={selectedImageIndex} />
            <Grid container spacing={4}>
                <Grid size={6}>
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
                <Grid size={6}>
                    <Box sx={{ position: 'sticky', top: 80, zIndex: 1000, pb: 2 }}>
                        <ImageCarousel images={productDetails.images} options={OPTIONS} handleOpen={handleImageClick}
                            slideHeight="60vh"
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductAllDetails;
