import React, { useEffect, useRef, useState } from 'react'

import { IoAdd } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { useFetch } from '../../../hooks/useFetch';
import { usePost } from '../../../hooks/usePost'
import { closePopup } from '../../../functions/closePopup';

function Users({ menuState, setMenuState }) {

    const popupRef = useRef()
    const [email, setEmail] = useState()
    const { data, loading, fetchData } = useFetch('business')
    const { postData: addUser } = usePost('addUser')
    const { postData: removeUser } = usePost('removeUser')

    useEffect(() => {
        closePopup(() => {
            popupRef.current.close()
            setEmail('')
        }, popupRef)
    }, [])

    return (
        <div style={{ display: menuState !== 'Users' && 'none' }}>
            <h1 style={{ marginBottom: '32px', fontSize: '32px', display: 'flex', alignItems: 'center' }}>
                <IoChevronBack onClick={e => setMenuState('Account')} size={'1.6rem'} style={{ marginRight: '4px' }} /> {menuState}
            </h1>
            <div className='Revenue_div_entryCrit'>
                <p className='Revenue_p_crit'>No.</p>
                <p className='Revenue_p_crit'>Name</p>
                <p className='Revenue_p_crit'>Email</p>
                <div style={{ width: '20px', display: 'flex', justifyContent: 'center' }}>
                    <IoAdd onClick={e => popupRef.current.showModal()} size={'1.4rem'} />
                </div>
            </div>

            <dialog ref={popupRef} className='CreateInv_div_popup'>
                <h1 style={{ marginBottom: '24px' }}>Add user</h1>
                <div>
                    <input value={email} style={{ width: '60%' }} className='CreateInv_input' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    <button className='CreateInv_button_bottom'
                        onClick={e => addUser({ email }, e => { fetchData(); popupRef.current.close(); setEmail('') })}>Invite</button>
                    <button className='CreateInv_button_secondary'
                        onClick={e => { popupRef.current.close(); setEmail(''); }}>Cancel</button>
                </div>
            </dialog>

            {loading ? <div>Loading...</div> :
                data &&
                data.users.map(item =>
                    <div className='Revenue_div_entry'>
                        <p className='Revenue_p_critInfo'>{data.users.indexOf(item) + 1}</p>
                        <p className='Revenue_p_critInfo'>{item.id.name}</p>
                        <p className='Revenue_p_critInfo'>{item.id.email}</p>
                        <div style={{ width: '20px', display: 'flex', justifyContent: 'center' }}>
                            < FaMinus className='Revenue_RemoveUser' size={'0.6rem'} onClick={e => removeUser({ email: item.id.email }, fetchData)} />
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Users