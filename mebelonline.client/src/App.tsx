import './App.css';
import Header from './components/header/header';
import MultiLevelSidebar from './components/sidebar/sidebar';

function App() {
    return (
        <>
            <Header />
            <MultiLevelSidebar />
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