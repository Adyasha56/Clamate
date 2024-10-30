import { useState } from "react";
import Searchbox from "./Searchbox";
import InfoBox from "./InfoBox";
import './App.css'; 

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Cuttack",
        feelsLike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "Haze",
    });

    let updateInfo = (newinfo) => {
        setWeatherInfo(newinfo);
    };

    return (
        <div className="weatherAppContainer">
            <h1>Clamate</h1>
            <Searchbox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}
