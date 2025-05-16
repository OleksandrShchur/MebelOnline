import Box from '@mui/material/Box';
import './App.css';
import Header from './components/header/header';
import ProductGrid from './components/productGrid/productGrid';
import MultiLevelSidebar from './components/sidebar/sidebar';
import React, { useEffect, useState } from 'react';
import type { CategorySidebarModel } from './models/categorySidebarModel';

const App: React.FC = () => {
    const [categories, setCategories] = useState<CategorySidebarModel[]>([]);

    const populateCategories = async () => {
        const response = await fetch('api/categories/all');

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setCategories(data);
        }
    }

    useEffect(() => {
        populateCategories();
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