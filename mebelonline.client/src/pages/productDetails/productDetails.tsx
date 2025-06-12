import { Box, Breadcrumbs, Card, CardActions, CardContent, Container, Grid, IconButton, Link, 
    Tab, Tabs, Tooltip, Typography } from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import type { CategoryBreadcrumbModel } from "../../models/categoryBreadcrumbModel";
import categoryService from "../../services/categoryService";
import ProductImageModal from "../../components/productImageModal/productImageModal";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductDetailsModel } from "../../models/productDetailsModel";
import productService from "../../services/productService";

type ProductDetailsParams = {
    productId: string;
}

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const ProductDetails: React.FC = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<CategoryBreadcrumbModel[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDetailsModel>({} as ProductDetailsModel);
    const { productId } = useParams<ProductDetailsParams>();
    const [value, setValue] = useState(0);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleImageClick = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
        setModalOpen(true);
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const populateCategoriesBreadcrumbs = async () => {
        if (productId) { //TODO: improve condition
            const data = await categoryService.fetchBreadcrumbsForProduct(productId);

            setBreadcrumbs(data);
        }
    }

    const populateProductDetails = async () => {
        if (productId) { // TODO: improve validation
            const data = await productService.fetchProductDetails(productId);

            if (data) {
                setProductDetails(data);
            }
        }
    }

    useEffect(() => {
        populateProductDetails();
        populateCategoriesBreadcrumbs();
    }, []);

    return (
        <Container sx={{ pt: 9, pb: 2, maxWidth: 'none !important' }}>
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return isLast ? (
                        <Typography color="text.primary" key={crumb.url}>
                            {crumb.name}
                        </Typography>
                    ) : (
                        <Link
                            underline="hover"
                            color="inherit"
                            href={crumb.url}
                            key={crumb.url}
                        >
                            {crumb.name}
                        </Link>
                    );
                })}
            </Breadcrumbs>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Загальне" {...a11yProps(0)} />
                        <Tab label="Характеристики" {...a11yProps(1)} />
                        <Tab label="Опис" {...a11yProps(2)} />
                        <Tab label="Фотографії" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <ProductImageModal isOpen={isModalOpen} handleClose={handleModalClose} imageUrl={selectedImageUrl} />
                    <Grid container spacing={2}>
                        <Grid size={5}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        Код товару: {productDetails.id}
                                    </Typography>
                                    <Typography variant="h4" component="div">
                                        {productDetails.title}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                                    <Typography variant="h6">{productDetails.price} грн</Typography>

                                    <Tooltip title="Додати в обране">
                                        <IconButton
                                            sx={{
                                                bgcolor: 'white',
                                                '&:hover': { bgcolor: '#f5f5f5' },
                                            }}
                                        >
                                            <FavoriteBorderIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid size={7}>
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
                                        />)
                                }
                            </Carousel>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Item Four
                </CustomTabPanel>
            </Box>
        </Container>
    );
};

export default ProductDetails;
