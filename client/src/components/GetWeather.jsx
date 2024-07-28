import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

function GetWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3050/weather/${city}`);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError(
        err.response ? err.response.data.error : "Error fetching weather data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold mb-6">Get Weather</h1>
      <div className="flex justify-center items-center gap-2">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <Button onClick={fetchWeather} variant="secondary" className="border">
          Get Weather
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!city && <p className="text-gray-500 mb-4">Enter a city name</p>}
      {loading && (
        <div className="flex justify-center items-center min-h-[80vh]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
      {weather && (
        <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Weather in {weather.city}, {weather.country}
          </h2>
          <p>
            <strong>Coordinates:</strong> {weather.coordinates.lat},{" "}
            {weather.coordinates.lon}
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather}
          </p>
          <p>
            <strong>Temperature:</strong> {weather.temperature.current}°C
          </p>
          <p>
            <strong>Feels like:</strong> {weather.temperature.feels_like}°C
          </p>
          <p>
            <strong>Min:</strong> {weather.temperature.min}°C,{" "}
            <strong>Max:</strong> {weather.temperature.max}°C
          </p>
          <p>
            <strong>Pressure:</strong> {weather.pressure} hPa
          </p>
          <p>
            <strong>Humidity:</strong> {weather.humidity}%
          </p>
          <p>
            <strong>Visibility:</strong> {weather.visibility} meters
          </p>
          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s at{" "}
            {weather.wind.deg}°
          </p>
          <p>
            <strong>Clouds:</strong> {weather.clouds}%
          </p>
          <p>
            <strong>Sunrise:</strong> {weather.sunrise}
          </p>
          <p>
            <strong>Sunset:</strong> {weather.sunset}
          </p>
        </div>
      )}
    </div>
  );
}

export default GetWeather;
