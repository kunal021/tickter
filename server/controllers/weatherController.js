import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const getWeather = async (req, res) => {
  const city = req.params.location;
  if (!city) {
    return res.status(400).send({ error: "City name is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = response.data;
    const formattedData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      coordinates: weatherData.coord,
      weather: weatherData.weather[0].description,
      temperature: {
        current: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        min: weatherData.main.temp_min,
        max: weatherData.main.temp_max,
      },
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility,
      wind: weatherData.wind,
      clouds: weatherData.clouds.all,
      sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
    };

    res.send(formattedData);
  } catch (error) {
    if (error.response) {
      res
        .status(error.response.status)
        .send({ error: error.response.data.message });
    } else {
      res
        .status(500)
        .send({ error: "An error occurred while fetching weather data" });
    }
  }
};
