import { Box, IconButton, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageCarousel from "../imageCarousel/imageCarousel";
import type { ProductImageModel } from "../../models/productImageModel";
import type { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { loop: true };

interface IProductImageModalProps {
    isOpen: boolean;
    handleClose: () => void;
    images: ProductImageModel[];
    startIndex: number;
}

const ProductImageModal: React.FC<IProductImageModalProps> = (props: IProductImageModalProps) => {
    const { isOpen, handleClose, images, startIndex } = props;

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        color: (theme) => theme.palette.grey[500],
                        backgroundColor: "rgba(255,255,255,0.8)",
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,1)",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <br />
                <ImageCarousel
                    images={images?.slice(startIndex).concat(images?.slice(0, startIndex))} options={OPTIONS}
                    slideHeight="85vh"
                />
            </Box>
        </Dialog>
    );
};

export default ProductImageModal;
