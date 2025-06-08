import { Box, Card, CardMedia, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProductImageModalProps {
    isOpen: boolean;
    handleClose: () => void;
    imageUrl: string;
}

const ProductImageModal: React.FC<IProductImageModalProps> = (props: IProductImageModalProps) => {
    const { isOpen, handleClose, imageUrl } = props;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxHeight: "90vh",
                    maxWidth: "90vw",
                    outline: "none",
                }}
            >
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
                <Card sx={{ height: "100%", width: "100%" }}>
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="Product image"
                        sx={{
                            height: "93vh",
                            width: "auto",
                            maxWidth: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Card>
            </Box>
        </Modal>
    );
};

export default ProductImageModal;
