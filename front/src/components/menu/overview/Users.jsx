import React from 'react'

import { IoAdd } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";

function Users({menuState, setMenuState}) {

    const usersList = [
        {
            name: 'Toader Antonio',
            email: 'antoniogeorgetoader@yahoo.com'
        }
    ]

    return (
        <div style={{display: menuState !== 'Users' && 'none'}}>
            <h1 style={{ marginBottom: '32px', fontSize: '32px', display: 'flex', alignItems: 'center' }}>
                <IoChevronBack onClick={e => setMenuState('Account')} size={'1.6rem'} style={{marginRight: '4px'}} /> {menuState}
            </h1>
            <div className='Revenue_div_entryCrit'>
                <p className='Revenue_p_crit'>NO</p>
                <p className='Revenue_p_crit'>NAME</p>
                <p className='Revenue_p_crit'>EMAIL</p>
                <div style={{ width: '20px' }}><IoAdd size={'1.4rem'} /></div>
            </div>

            {usersList.map(item =>
                <div className='Revenue_div_entry'>
                    <p className='Revenue_p_critInfo'>{usersList.indexOf(item) + 1}</p>
                    <p className='Revenue_p_critInfo'>{item.name}</p>
                    <p className='Revenue_p_critInfo'>{item.email}</p>
                    <div style={{ width: '20px' }}>
                        <MdOutlineModeEdit size={'1.2rem'} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users