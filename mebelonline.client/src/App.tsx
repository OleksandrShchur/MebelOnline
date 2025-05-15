import Box from '@mui/material/Box';
import './App.css';
import Header from './components/header/header';
import ProductGrid from './components/productGrid/productGrid';
import MultiLevelSidebar from './components/sidebar/sidebar';
import { useEffect } from 'react';

function App() {

    async function populateCategories() {
        const response = await fetch('api/categories/all');

        console.log(response.json());
    }

    useEffect(() => {
        populateCategories();
    }, []);

    return (
        <>
            <Header />
            <Box display="flex">
                <MultiLevelSidebar />
                <ProductGrid />
            </Box>
        </>
    );

    // async function populateWeatherData() {
    //     const response = await fetch('weatherforecast');
    //     if (response.ok) {
    //         const data = await response.json();
    //         setForecasts(data);
    //     }
    // }
}

export default App;