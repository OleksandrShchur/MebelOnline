import { Box, Breadcrumbs, Container, Link, Tab, Tabs, Typography } from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CategoryBreadcrumbModel } from "../../models/categoryBreadcrumbModel";
import categoryService from "../../services/categoryService";
import type { ProductDetailsModel } from "../../models/productDetailsModel";
import productService from "../../services/productService";
import ProductAllDetails from "../../components/productAllDetails/productAllDetails";

interface ITabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type ProductDetailsParams = {
    productId: string;
}

const CustomTabPanel = (props: ITabPanelProps) => {
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
    const { productId } = useParams<ProductDetailsParams>();
    const [breadcrumbs, setBreadcrumbs] = useState<CategoryBreadcrumbModel[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDetailsModel>({} as ProductDetailsModel);
    const [value, setValue] = useState(0);

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
            <br />
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
                    <ProductAllDetails productDetails={productDetails}
                    />
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
