import Box from '@mui/material/Box';
import './App.css';
import Header from './components/header/header';
import ProductGrid from './components/productGrid/productGrid';
import MultiLevelSidebar from './components/sidebar/sidebar';

function App() {
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