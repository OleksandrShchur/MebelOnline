import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/home/home';
import Layout from './components/layout/layout';
import ProductDetails from './pages/productDetails/productDetails';
import Catalog from './pages/catalog/catalog';
import Search from './pages/search/search';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/product/:productId' element={<ProductDetails />} />
                    <Route path='/search' element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
