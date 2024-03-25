import React from 'react'
import LOGO from '../../public/logo.png'
import { useSearchContext } from '../context/SearchContext';

function Button() {

    const { setWeather, setCoord } = useSearchContext();

    const handleClick = () => {
        setWeather('');
        setCoord('');
        
    };

  return (
    <button
        className='text-[#fff]'
        onClick={handleClick}
        >
            <img src={LOGO} alt="" />
    </button>
  )
}

export default Button