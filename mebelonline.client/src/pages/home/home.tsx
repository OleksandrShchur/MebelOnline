import Box from "@mui/material/Box";
import type React from "react";
import MultiLevelSidebar from "../../components/sidebar/sidebar";
import ProductGrid from "../../components/productGrid/productGrid";
import { useEffect, useRef, useState } from "react";
import type { CategoryModel } from "../../models/categoryModel";
import categoryService from "../../services/categoryService";

const Home: React.FC = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            categoryService.fetchAll().then(setCategories);
            isMounted.current = true;
        }
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "stretch",
                width: "100%",
                position: "relative",  // Keeps absolute children positioned relative to this content area
                height: "100%",         // Ensure it fills the available space
            }}
        >
            <MultiLevelSidebar categories={categories} />

            <Box sx={{ flex: 1, pl: { md: '200px' } }}>  {/* Reserves space for the main 200px sidebar */}
                <ProductGrid />
            </Box>
        </Box>
    );
};

export default Home;
