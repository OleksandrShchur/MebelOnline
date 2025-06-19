import { Box, Card, CardActions, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import ProductInfoCard from "../productInfoCard/productInfoCard";
import Carousel from "react-material-ui-carousel";
import ProductImageModal from "../productImageModal/productImageModal";
import { useState } from "react";
import type { ProductDetailsModel } from "../../models/productDetailsModel";
import CloseIcon from '@mui/icons-material/Close';

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
        <Stack direction='column' spacing={2}>
            <>
                <ProductImageModal isOpen={isModalOpen} handleClose={handleModalClose} imageUrl={selectedImageUrl} />
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <ProductInfoCard id={productDetails.id}
                            title={productDetails.title}
                            price={productDetails.price}
                            oldPrice={productDetails.oldPrice}
                            note={productDetails.note}
                            frontOptions={productDetails.frontOptions}
                            frameOptions={productDetails.frameOptions}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Carousel animation="slide" autoPlay={false} navButtonsAlwaysVisible>
                            {
                                productDetails.images?.map((item) =>
                                    <img key={item.url} src={item.url} alt={productDetails.title}
                                        onClick={() => handleImageClick(item.url)}
                                        style={{
                                            maxHeight: '500px',
                                            width: 'auto',
                                            height: 'auto',
                                            objectFit: 'contain',
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                )
                            }
                        </Carousel>
                    </Grid>
                </Grid>
            </>
            <>
                <Grid container spacing={2}>
                    <Grid size={6}>
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
                                    <CardActions sx={{ justifyContent: 'space-evenly', alignItems: 'flex-end', px: 2, pb: 2 }}>
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
                    </Grid>
                    <Grid size={6}>
                        <Card variant="outlined"
                            sx={{
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
                                borderRadius: 2,
                                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                                overflow: 'visible'
                            }}
                        >
                            column 2
                        </Card>
                    </Grid>
                </Grid>
            </>
        </Stack>
    );
};

export default ProductAllDetails;
