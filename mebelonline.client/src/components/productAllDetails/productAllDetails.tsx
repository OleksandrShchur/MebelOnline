import { Box, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import ProductInfoCard from "../productInfoCard/productInfoCard";
import ProductImageModal from "../productImageModal/productImageModal";
import { useState } from "react";
import type { ProductDetailsModel } from "../../models/productDetailsModel";
import CloseIcon from '@mui/icons-material/Close';
import { type EmblaOptionsType } from "embla-carousel";
import ImageCarousel from "../imageCarousel/imageCarousel";

const OPTIONS: EmblaOptionsType = { loop: true };

interface IProductAllDetailsProps {
    productDetails: ProductDetailsModel;
};

const ProductAllDetails: React.FC<IProductAllDetailsProps> = (props: IProductAllDetailsProps) => {
    const { productDetails } = props;
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
        setModalOpen(true);
    };

    return (
        <>
            <ProductImageModal isOpen={isModalOpen} handleClose={handleModalClose} imageUrl={selectedImageUrl} />
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
                        <Card variant="outlined"
                            sx={{
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
                                borderRadius: 2,
                                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                                overflow: 'visible'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5">Характеристики - {productDetails.title}</Typography>
                            </CardContent>
                            {(productDetails.width || productDetails.height || productDetails.depth) &&
                                <>
                                    <Divider />
                                    <CardActions sx={{ justifyContent: 'space-evenly', alignItems: 'flex-end', p: 2 }}>
                                        {productDetails.width &&
                                            <>
                                                <Box>
                                                    <Typography variant="subtitle2">Ширина</Typography>
                                                    <Typography variant="h5">
                                                        {new Intl.NumberFormat('uk-UA', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }).format(productDetails.width)} см
                                                    </Typography>
                                                </Box>
                                                <Typography>
                                                    <CloseIcon />
                                                </Typography>
                                            </>
                                        }
                                        {productDetails.height &&
                                            <>
                                                <Box>
                                                    <Typography variant="subtitle2">Висота</Typography>
                                                    <Typography variant="h5">
                                                        {new Intl.NumberFormat('uk-UA', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }).format(productDetails.height)} см
                                                    </Typography>
                                                </Box>
                                                <Typography>
                                                    <CloseIcon />
                                                </Typography>
                                            </>
                                        }
                                        {productDetails.depth &&
                                            <Box>
                                                <Typography variant="subtitle2">Глибина</Typography>
                                                <Typography variant="h5">
                                                    {new Intl.NumberFormat('uk-UA', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }).format(productDetails.depth)} см
                                                </Typography>
                                            </Box>
                                        }
                                    </CardActions>
                                </>
                            }
                            {productDetails.attributes &&
                                <>
                                    <Divider />
                                    <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', px: 2, pb: 2 }}>
                                        {productDetails.attributes.map(item =>
                                            <Box>
                                                <Typography variant="subtitle1">{item.key}</Typography>
                                                <Typography variant="subtitle1">{item.value}</Typography>
                                            </Box>
                                        )}
                                    </CardActions>
                                </>
                            }
                        </Card>
                    </Box>
                </Grid>
                <Grid size={6}>
                    <Box sx={{ position: 'sticky', top: 80, zIndex: 1000, pb: 2 }}>
                        <ImageCarousel images={productDetails.images} options={OPTIONS} />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductAllDetails;
