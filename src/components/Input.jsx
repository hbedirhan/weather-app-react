import React, { useState } from 'react';
import axios from 'axios';
import { useSearchContext } from '../context/SearchContext';

function Input() {
  const { setCity, setCoord, coord } = useSearchContext();
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=07fd0fd52bd05a4cae2bc51b1bcaaadb`);
      setSuggestions(response.data.list.map(city => ({
        name: city.name,
        country: city.sys.country,
        coord: city.coord
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const selectCity = (city) => {
    setCity(city.name);
    setInputValue(`${city.name}, ${city.country}`);
    setSuggestions('');
    setCoord(city.coord)
  };

  return (
    <div className="relative mt-4">
      <div className='bg-[#22222F] text-[#FAFAFA] h-12 rounded p-4 w-80 flex justify-between items-center'>
        <input
          className="bg-[#22222F] w-80 focus:outline-none"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search location"
        />
        {
          coord ?
            <span className='animate-[spin_1.4s_linear_infinite]'>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1V5C14 5.26522 13.8946 5.51957 13.7071 5.70711C13.5196 5.89464 13.2652 6 13 6C12.7348 6 12.4804 5.89464 12.2929 5.70711C12.1054 5.51957 12 5.26522 12 5V1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1ZM25 12H21C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13C20 13.2652 20.1054 13.5196 20.2929 13.7071C20.4804 13.8946 20.7348 14 21 14H25C25.2652 14 25.5196 13.8946 25.7071 13.7071C25.8946 13.5196 26 13.2652 26 13C26 12.7348 25.8946 12.4804 25.7071 12.2929C25.5196 12.1054 25.2652 12 25 12ZM19.3638 17.95C19.1747 17.7704 18.9229 17.6717 18.6622 17.6751C18.4014 17.6784 18.1523 17.7835 17.9679 17.9679C17.7835 18.1523 17.6784 18.4014 17.6751 18.6622C17.6717 18.9229 17.7704 19.1747 17.95 19.3638L20.7775 22.1925C20.9651 22.3801 21.2196 22.4856 21.485 22.4856C21.7504 22.4856 22.0049 22.3801 22.1925 22.1925C22.3801 22.0049 22.4856 21.7504 22.4856 21.485C22.4856 21.2196 22.3801 20.9651 22.1925 20.7775L19.3638 17.95ZM13 20C12.7348 20 12.4804 20.1054 12.2929 20.2929C12.1054 20.4804 12 20.7348 12 21V25C12 25.2652 12.1054 25.5196 12.2929 25.7071C12.4804 25.8946 12.7348 26 13 26C13.2652 26 13.5196 25.8946 13.7071 25.7071C13.8946 25.5196 14 25.2652 14 25V21C14 20.7348 13.8946 20.4804 13.7071 20.2929C13.5196 20.1054 13.2652 20 13 20ZM6.63625 17.95L3.8075 20.7775C3.61986 20.9651 3.51444 21.2196 3.51444 21.485C3.51444 21.7504 3.61986 22.0049 3.8075 22.1925C3.99514 22.3801 4.24964 22.4856 4.515 22.4856C4.78036 22.4856 5.03486 22.3801 5.2225 22.1925L8.05 19.3638C8.22962 19.1747 8.32828 18.9229 8.32494 18.6622C8.3216 18.4014 8.21653 18.1523 8.03213 17.9679C7.84773 17.7835 7.59859 17.6784 7.33782 17.6751C7.07706 17.6717 6.82531 17.7704 6.63625 17.95ZM6 13C6 12.7348 5.89464 12.4804 5.70711 12.2929C5.51957 12.1054 5.26522 12 5 12H1C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H5C5.26522 14 5.51957 13.8946 5.70711 13.7071C5.89464 13.5196 6 13.2652 6 13ZM5.2225 3.8075C5.03486 3.61986 4.78036 3.51444 4.515 3.51444C4.24964 3.51444 3.99514 3.61986 3.8075 3.8075C3.61986 3.99514 3.51444 4.24964 3.51444 4.515C3.51444 4.78036 3.61986 5.03486 3.8075 5.2225L6.63625 8.05C6.82531 8.22962 7.07706 8.32828 7.33782 8.32494C7.59859 8.3216 7.84773 8.21653 8.03213 8.03213C8.21653 7.84773 8.3216 7.59859 8.32494 7.33782C8.32828 7.07706 8.22962 6.82531 8.05 6.63625L5.2225 3.8075Z" fill="#8FB2F5" />
              </svg>
            </span>
            :
            ''
        }
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 rounded-lg w-80 bg-[#3B3B54] text-[#FAFAFA] overflow-y-auto max-h-40 mt-1">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="cursor-pointer hover:opacity-50 px-5 py-3 border-t border-[#22222F]"
              onClick={() => selectCity(city)}
            >
              {city.name}, {city.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Input;
