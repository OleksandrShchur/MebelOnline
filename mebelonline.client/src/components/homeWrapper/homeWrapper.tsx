import Box from "@mui/material/Box";
import type React from "react";
import MultiLevelSidebar from "../sidebar/sidebar";
import ProductGrid from "../productGrid/productGrid";
import { useEffect, useRef, useState } from "react";
import type { CategorySidebarModel } from "../../models/categorySidebarModel";
import categoryService from "../../services/categoryService";

const HomeWrapper: React.FC = () => {
    const [categories, setCategories] = useState<CategorySidebarModel[]>([]);
    const isMounted = useRef(false); // Added this reference to track first render

    const populateCategories = async () => {
        const data = await categoryService.fetchAll();

        setCategories(data);
    }

    useEffect(() => {
        console.log("home");
        if (!isMounted.current) {
            populateCategories();
            isMounted.current = true;
        }
    }, []);

    return (
        <Box display="flex">
            <MultiLevelSidebar categories={categories} />
            <ProductGrid />
        </Box>
    );
};

export default HomeWrapper;