import React from 'react';
import Header from './components/Header';
import Title from './components/Title';
import Input from './components/Input';
import Weather from './components/Weather';
import Button from './components/Button';
import { useSearchContext } from './context/SearchContext';

function App() {
  const { weather } = useSearchContext();

  return (
    <>
      <div className='h-screen flex flex-col items-center'>
        {weather ? null : <Header />}
        {weather ? (
          <>
            <Weather />
            <Button />
          </>
        ) : (
          <div className='flex flex-col items-center justify-center flex-grow'>
            <Title />
            <Input />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
