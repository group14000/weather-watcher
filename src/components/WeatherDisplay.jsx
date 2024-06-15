import React from "react";

const WeatherDisplay = ({ weather, forecast, addFavorite }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <p className="text-xl font-semibold">{weather.name}</p>
      <p className="text-2xl">{weather.main.temp}°C</p>
      <p className="text-lg">{weather.weather[0].main}</p>
      <p className="text-gray-600">({weather.weather[0].description})</p>
      <button
        onClick={() => addFavorite(weather.name)}
        className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Add to Favorites
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-bold">5-Day Forecast:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded shadow">
              <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>{day.main.temp}°C</p>
              <p>{day.weather[0].main}</p>
              <p>({day.weather[0].description})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
