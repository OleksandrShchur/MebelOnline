import { Box, Breadcrumbs, Card, CardActions, CardContent, CardMedia, Container, Grid, Link, Tab, Tabs, Typography } from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import type { CategoryBreadcrumbModel } from "../../models/categoryBreadcrumbModel";
import categoryService from "../../services/categoryService";
import ProductImageModal from "../../components/productImageModal/productImageModal";

type ProductDetailsParams = {
    productId: string;
}

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

var items = [
    {
        name: "Random Name #1",
        url: "https://www.dybok.com.ua/image/8549/omega-1-24-m-vip-master-166404-product.jpg?v=0.99",
    },
    {
        name: "Random Name #2",
        url: "https://www.dybok.com.ua/image/8549/omega-1-24-m-vip-master-166405-product.jpg?v=0.99",
    },
    {
        name: "Random Name #3",
        url: "https://www.dybok.com.ua/image/8549/omega-1-24-m-vip-master-64128-product.jpg?v=0.99",
    }
]

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
            const data = await categoryService.fetchBreadcrumbsForProduct(productId!);

            setBreadcrumbs(data);
        }
    }

    useEffect(() => {
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
                        <Grid size={7}>
                            <Carousel interval={6000} animation="slide" navButtonsAlwaysVisible>
                                {
                                    items.map((item) =>
                                        <img key={item.url} src={item.url} alt={item.name}
                                            onClick={() => handleImageClick(item.url)}
                                            style={{
                                                maxHeight: '400px',
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
                        <Grid size={5}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be nev lent
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                            </Card>
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
