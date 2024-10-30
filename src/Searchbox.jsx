import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import "./Searchbox.css";
import { useState } from 'react';


const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Searchbox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            // Check if the response is valid and contains the necessary data
            if (response.ok) {
                let result = {
                    city: city,
                    temp: jsonResponse.main.temp,
                    tempMin: jsonResponse.main.temp_min,
                    tempMax: jsonResponse.main.temp_max,
                    humidity: jsonResponse.main.humidity,
                    feelsLike: jsonResponse.main.feels_like,
                    weather: jsonResponse.weather[0].description,
                };
                console.log(result);
                return result;
            } else {
                throw new Error(jsonResponse.message || "Failed to fetch data");
            }
        } catch (error) {
            setError(true);
            console.error("Error fetching weather data:", error);
            throw error;
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCity("");

        try {
            let newinfo = await getWeatherInfo();
            updateInfo(newinfo);
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className='Searchbox'>
            <h4>Know the weather of your area</h4>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city" 
                    label="City Name" 
                    variant="outlined" 
                    required 
                    value={city}
                    onChange={handleChange}
                />
                <br/><br/>
                <Button 
                    variant="contained" 
                    type='submit'>
                    Search
                </Button>
                {error && <p style={{ color: "red" }}>Oh ouu! Can't fetch data this time</p>}
            </form>
        </div>
    );
}
