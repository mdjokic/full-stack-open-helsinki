import { useEffect, useState } from 'react';
import Axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    Axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`
    ).then((response) => setWeather(response.data));
  }, [capital]);
  return (
    <>
      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <div><b>temperature</b>: {weather.current.temperature} Celsius</div>
          <img src={weather.current.weather_icons[0]} alt='weather icon' />
          <div>
            <b>wind</b>: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
