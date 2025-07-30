import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/home/home';
import Layout from './components/layout/layout';
import ProductDetails from './pages/productDetails/productDetails';
import Catalog from './pages/catalog/catalog';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/product/:productId' element={<ProductDetails />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
