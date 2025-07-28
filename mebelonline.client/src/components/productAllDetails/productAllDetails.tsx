import { useMediaQuery, useTheme } from "@mui/material";
import ProductImageModal from "../productImageModal/productImageModal";
import { useState } from "react";
import type { ProductDetailsModel } from "../../models/productDetailsModel";
import { type EmblaOptionsType } from "embla-carousel";
import ProductAllDetailsDesktop from "./responsive/productAllDetailsDesktop";
import ProductAllDetailsMobile from "./responsive/productAllDetailsMobile";

const OPTIONS: EmblaOptionsType = { loop: true };
const DESKTOP_RIGHT_MARGIN = 8;
const MOBILE_RIGHT_MARGIN = 0;

interface IProductAllDetailsProps {
    productDetails: ProductDetailsModel;
};

const ProductAllDetails: React.FC<IProductAllDetailsProps> = (props: IProductAllDetailsProps) => {
    const { productDetails } = props;
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const imageMargin = isDesktop
        ? DESKTOP_RIGHT_MARGIN
        : MOBILE_RIGHT_MARGIN;

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
                startIndex={selectedImageIndex} rightMargin={imageMargin} />
            {isDesktop &&
                <ProductAllDetailsDesktop
                    productDetails={productDetails}
                    options={OPTIONS}
                    handleImageClick={handleImageClick} />
            }
            {!isDesktop &&
                <ProductAllDetailsMobile
                    productDetails={productDetails}
                    options={OPTIONS}
                    handleImageClick={handleImageClick} />
            }
        </>
    );
};

export default ProductAllDetails;
