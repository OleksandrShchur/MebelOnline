import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CategoryBreadcrumbModel } from "../../models/categoryBreadcrumbModel";
import categoryService from "../../services/categoryService";

type ProductDetailsParams = {
    productId: string;
}

const ProductDetails: React.FC = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<CategoryBreadcrumbModel[]>([]);
    const { productId } = useParams<ProductDetailsParams>();

    const loadCategoriesBreadcrumbs = async () => {
        if (productId) {
            const data = await categoryService.fetchBreadcrumbsForProduct(productId!);

            setBreadcrumbs(data);
        } else {
            alert('Неправильний шлях!');
        }
    }

    useEffect(() => {
        loadCategoriesBreadcrumbs();
    }, []);

    return (
        <Container sx={{ pt: 9, pb: 2 }}>
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
        </Container>
    );
};

export default ProductDetails;
