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
    res.send(weatherData);
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
