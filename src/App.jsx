import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import axios from "axios";

const api = {
  key: "a6a9d65756deac27f85f6f11070095e8",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchPressed = () => {
    axios
      .get(`${api.base}weather`, {
        params: {
          q: search,
          units: "metric",
          APPID: api.key,
        },
      })
      .then((response) => {
        setWeather(response.data);
        return axios.get(`${api.base}forecast`, {
          params: {
            q: search,
            units: "metric",
            APPID: api.key,
          },
        });
      })
      .then((response) => {
        setForecast(response.data.list.filter((_, index) => index % 8 === 0).slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching the weather data: ", error);
      });
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((favorite) => favorite !== city));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 flex flex-col items-center justify-center">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Weather App</h1>
        <Search setSearch={setSearch} searchPressed={searchPressed} />
        {typeof weather.main !== "undefined" && (
          <WeatherDisplay
            weather={weather}
            forecast={forecast}
            addFavorite={addFavorite}
          />
        )}
        <Favorites
          favorites={favorites}
          removeFavorite={removeFavorite}
          api={api}
        />
      </header>
    </div>
  );
};

export default App;
