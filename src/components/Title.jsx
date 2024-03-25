import React from 'react'

function Title() {
    return (
        <>
            <div className='flex flex-col py-8 justify-center'>
                <h2 className='text-[#FAFAFA] font-medium text-center text-xl'>Welcome to <span className='text-[#8FB2F5]'>TypeWeather</span></h2>
                <p className='text-[#BFBFD4]'>Choose a location to see the weather forecast</p>
            </div>
        </>
    )
}

export default Title