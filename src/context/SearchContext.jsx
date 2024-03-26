import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [city, setCity] = useState('');
  const [coord, setCoord] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Konum bilgisi alınamadı");
    }
    else {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude; 
        setCoord({lat: lat, lon: lon});
      });
    }
  }, [])

  const fetchWeatherCity = useMemo(async () => {
    if (coord) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=07fd0fd52bd05a4cae2bc51b1bcaaadb&units=metric`)
        setWeather(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }
  }, [city,coord]);

  return (
    <SearchContext.Provider value={{ city, setCity, weather, setCoord, coord, setWeather }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
