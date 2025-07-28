import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import type { CatalogModel } from "../../models/catalogModel";
import categoryService from "../../services/categoryService";
import CatalogGrid from "../../components/catalogGrid/catalogGrid";

const Catalog: React.FC = () => {
    const [catalog, setCatalog] = useState<CatalogModel[]>([]);

    const populateCatalog = async () => {
        const data = await categoryService.fetchCatalog();

        setCatalog(data);
    };

    useEffect(() => {
        populateCatalog();
    }, []);

    return (
        <Container sx={{ pt: 9, pb: 2, maxWidth: 'none !important' }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ px: 2 }}>
                    <br />
                    <CatalogGrid catalog={catalog} />
                </Box>
            </Box>
        </Container>
    );
};

export default Catalog;
