import React from "react";

const WeatherDisplay = ({ weather, forecast, addFavorite, isCelsius }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md mb-6 w-full max-w-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">{weather.name}</p>
          <p className="text-2xl">{weather.main.temp}°{isCelsius ? "C" : "F"}</p>
          <p className="text-lg">{weather.weather[0].main}</p>
          <p className="text-gray-600">({weather.weather[0].description})</p>
        </div>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
        </div>
      </div>
      <button
        onClick={() => addFavorite(weather.name)}
        className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-700 shadow-lg w-full"
      >
        Add to Favorites
      </button>
      <div className="mt-6">
        <h2 className="text-xl font-bold">5-Day Forecast:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {forecast.map((day, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded shadow text-center">
              <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-12 h-12 mx-auto"
              />
              <p>{day.main.temp}°{isCelsius ? "C" : "F"}</p>
              <p>{day.weather[0].main}</p>
              <p className="text-gray-600">({day.weather[0].description})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
