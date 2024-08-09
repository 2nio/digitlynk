import React from 'react'

import { IoAdd } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { useFetch } from '../../../hooks/useFetch';

function Users({ menuState, setMenuState }) {

    const { data, loading, fetchData } = useFetch('business')

    return (

        <div style={{ display: menuState !== 'Users' && 'none' }}>
            <h1 style={{ marginBottom: '32px', fontSize: '32px', display: 'flex', alignItems: 'center' }}>
                <IoChevronBack onClick={e => setMenuState('Account')} size={'1.6rem'} style={{ marginRight: '4px' }} /> {menuState}
            </h1>
            <div className='Revenue_div_entryCrit'>
                <p className='Revenue_p_crit'>NO</p>
                <p className='Revenue_p_crit'>COMPANY</p>
                <p className='Revenue_p_crit'>PHONE</p>
                <div style={{ width: '20px' }}><IoAdd size={'1.4rem'} /></div>
            </div>

            {loading ? <div>Loading...</div> :
                data &&
                data.users.map(item =>
                    <div className='Revenue_div_entry'>
                        <p className='Revenue_p_critInfo'>{data.users.indexOf(item) + 1}</p>
                        <p className='Revenue_p_critInfo'>{item.id.name}</p>
                        <p className='Revenue_p_critInfo'>{item.id.email}</p>
                        <div style={{ width: '20px' }}>
                            <MdOutlineModeEdit size={'1.2rem'} />
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Users