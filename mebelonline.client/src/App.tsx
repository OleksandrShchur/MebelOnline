import Box from '@mui/material/Box';
import './App.css';
import Header from './components/header/header';
import ProductGrid from './components/productGrid/productGrid';
import MultiLevelSidebar from './components/sidebar/sidebar';
import React, { useEffect, useRef, useState } from 'react';
import type { CategorySidebarModel } from './models/categorySidebarModel';
import categoryService from './services/categoryService';

const App: React.FC = () => {
    const [categories, setCategories] = useState<CategorySidebarModel[]>([]);
    const isMounted = useRef(false); // Added this reference to track first render

    const populateCategories = async () => {
        const data = await categoryService.fetchAll();

        setCategories(data);
    }

    useEffect(() => {
        if (!isMounted.current) {
            populateCategories();
            isMounted.current = true;
        }
    }, []);

    return (
        <>
            <Header />
            <Box display="flex">
                <MultiLevelSidebar categories={categories} />
                <ProductGrid />
            </Box>
        </>
    );
}

export default App;
