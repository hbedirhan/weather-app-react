import React from 'react'
import LOGO from '../assets/logo-text.png'

function Header() {
    return (
        <>
            <div className='flex items-center py-6'>
                <img src={LOGO} className='w-48' alt="logo" />
            </div>
        </>
    )
}

export default Header