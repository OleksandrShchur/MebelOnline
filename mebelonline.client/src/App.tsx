import './App.css';
import Header from './components/header/header';
import React from 'react';
import HomeWrapper from './components/homeWrapper/homeWrapper';

const App: React.FC = () => {
    return (
        <>
            <Header />
            <HomeWrapper />
        </>
    );
}

export default App;
