import './App.css';
import Header from './components/header/header';

function App() {
    return (
        <>
            <Header />
            <div>Some text</div>
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