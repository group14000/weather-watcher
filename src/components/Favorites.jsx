import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorites = ({ favorites, removeFavorite, api }) => {
  const [favoriteWeather, setFavoriteWeather] = useState([]);

  useEffect(() => {
    const fetchFavoriteWeather = async () => {
      const weatherData = await Promise.all(
        favorites.map((city) =>
          axios
            .get(`${api.base}weather`, {
              params: {
                q: city,
                units: "metric",
                APPID: api.key,
              },
            })
            .then((response) => response.data)
        )
      );
      setFavoriteWeather(weatherData);
    };

    if (favorites.length > 0) {
      fetchFavoriteWeather();
    }
  }, [favorites, api]);

  return (
    <div className="mt-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-white">Favorite Cities:</h2>
      {favoriteWeather.length > 0 ? (
        favoriteWeather.map((cityWeather, index) => (
          <div key={index} className="bg-white p-4 rounded shadow mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold">{cityWeather.name}</p>
                <p className="text-2xl">{cityWeather.main.temp}°C</p>
                <p className="text-lg">{cityWeather.weather[0].main}</p>
                <p className="text-gray-600">({cityWeather.weather[0].description})</p>
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                  alt={cityWeather.weather[0].description}
                  className="w-16 h-16"
                />
              </div>
            </div>
            <button
              onClick={() => removeFavorite(cityWeather.name)}
              className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700 shadow-lg w-full"
            >
              Remove from Favorites
            </button>
          </div>
        ))
      ) : (
        <p className="text-white">No favorite cities added.</p>
      )}
    </div>
  );
};

export default Favorites;
