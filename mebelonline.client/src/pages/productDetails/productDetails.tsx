import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CategoryBreadcrumbModel } from "../../models/categoryBreadcrumbModel";
import categoryService from "../../services/categoryService";
import type { ProductDetailsModel } from "../../models/productDetailsModel";
import productService from "../../services/productService";
import ProductAllDetails from "../../components/productAllDetails/productAllDetails";

type ProductDetailsParams = {
    productId: string;
};

const ProductDetails: React.FC = () => {
    const { productId } = useParams<ProductDetailsParams>();
    const [breadcrumbs, setBreadcrumbs] = useState<CategoryBreadcrumbModel[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDetailsModel>({} as ProductDetailsModel);

    const populateCategoriesBreadcrumbs = async () => {
        if (productId) { //TODO: improve condition
            const data = await categoryService.fetchBreadcrumbsForProduct(productId);

            setBreadcrumbs(data);
        }
    };

    const populateProductDetails = async () => {
        if (productId) { // TODO: improve validation
            const data = await productService.fetchProductDetails(productId);

            if (data) {
                setProductDetails(data);
            }
        }
    };

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
                <Box sx={{ px: 2 }}>
                    <br />
                    <ProductAllDetails productDetails={productDetails} />
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetails;
