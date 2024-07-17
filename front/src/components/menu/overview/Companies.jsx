import React from 'react'

import { IoChevronBack } from "react-icons/io5";

function Companies({ menuState, setMenuState }) {

    const usersList = [
        {
            name: 'Toader Antonio',
            email: 'antoniogeorgetoader@yahoo.com'
        }
    ]

    return (
        <div style={{ display: menuState !== 'Companies' && 'none' }}>
            <h1 style={{ marginBottom: '32px', fontSize: '32px', display: 'flex', alignItems: 'center' }}>
                <IoChevronBack onClick={e => setMenuState('Account')} size={'1.6rem'} style={{ marginRight: '4px' }} /> Companies
            </h1>

            {usersList.map(item =>
                <div className='Revenue_div_entry'>
                    <p>{item.name}</p>
                </div>
            )}
        </div>
    )
}

export default Companies