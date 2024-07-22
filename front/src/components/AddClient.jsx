import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { closePopup } from '../functions/closePopup';
import { useFetch } from '../hooks/useFetch';
import { usePost } from '../hooks/usePost';

function AddClient({ receive, clientCompany, sendClient }) {

    const navigate = useNavigate()

    //Dropmenu
    const [searchClient, setSearchClient] = useState("")
    const [client, setClient] = useState()
    const [dropmenu, setDropMenu] = useState(false)
    const dropmenuRef = useRef()

    //Popup inputs
    const popupRef = useRef()
    const [fullname, setFullname] = useState("")
    const [company, setCompany] = useState("")
    const [bank, setBank] = useState("")
    const [IBAN, setIBAN] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [notes, setNotes] = useState("")

    const { data: clients, loading: loadingClients, fetchData: fetchClients } = useFetch('clients')
    const { postData: postClient, loading: loadingClient } = usePost('client')

    useEffect(() => {
        if (!dropmenu) setSearchClient('')

        const handleClickOutside = (e) => {
            if (!dropmenuRef.current.contains(e.target)) {
                setDropMenu(false)
            }
        }

        if (dropmenu) document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    useEffect(() => {
        closePopup(() => {
            popupRef.current.close()
            document.getElementById('CreateInv_div_form').reset()
        }, popupRef)
    }, [])

    useEffect(() => {
        setClient(clientCompany)
    }, [clientCompany])

    const createClient = (e) => {
        fetchClients()
        popupRef.current.close()
        document.getElementById('CreateInv_div_form').reset()
    }

    return (
        <div className='CreateInv_div_info'>
            <label className='CreateInv_label'>
                <p className='CreateInv_p_label'>CLIENT</p>
                <div className='CreateInv_div_client'>
                    {client || <p className='CreateInv_p_client'>Select client</p>}
                    {loadingClients ? <div>Loading...</div> :
                        clients &&
                        <div ref={dropmenuRef}>
                            {!receive && <RiArrowDropDownLine onClick={e => setDropMenu(!dropmenu)} size={'1.4rem'} />}
                            <div className='CreateInv_div_dropdown' style={{ display: dropmenu && 'flex' }}>
                                <div className='CreateInv_div_dropdownAdd'>
                                    <input value={searchClient} onChange={e => setSearchClient(e.target.value)} placeholder='Search for client' />
                                    <IoAdd onClick={e => { popupRef.current.showModal(); setDropMenu(false) }} size={'1.3rem'} />
                                </div>
                                <div className='CreateInv_div_dropdownClients'>
                                    {clients.filter(item => item.company.includes(searchClient)).map(item =>
                                        <li onClick={e => { setClient(item.company); sendClient(item._id); setDropMenu(false) }}>{item.company}</li>
                                    )}
                                </div>
                            </div>
                        </div>}
                </div>
            </label>
            <dialog ref={popupRef} className='CreateInv_div_popup'>
                <h1 style={{ marginBottom: '16px' }}>Add client</h1>
                <form id='CreateInv_div_form'>
                    <div className='CreateInv_div_popupInfo'>
                        <div className='CreateInv_div_popupInfoChild'>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>FULL NAME</p>
                                <input placeholder='Name' className='CreateInv_input' onChange={e => setFullname(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>COMPANY</p>
                                <input placeholder='Company' className='CreateInv_input' onChange={e => setCompany(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>BANK</p>
                                <input placeholder='Bank' className='CreateInv_input' onChange={e => setBank(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>IBAN</p>
                                <input placeholder='IBAN' className='CreateInv_input' onChange={e => setIBAN(e.target.value)}></input>
                            </label>
                        </div>
                        <div className='CreateInv_div_popupInfoChild'>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>ADDRESS</p>
                                <input placeholder='Address' className='CreateInv_input' onChange={e => setAddress(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>PHONE</p>
                                <input placeholder='Phone' className='CreateInv_input' onChange={e => setPhone(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>EMAIL</p>
                                <input placeholder='Email' className='CreateInv_input' onChange={e => setEmail(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>WEBSITE</p>
                                <input placeholder='Website' className='CreateInv_input' onChange={e => setWebsite(e.target.value)}></input>
                            </label>
                        </div>
                    </div>
                    <div className='CreateInv_div_popupInfoBottom'>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label' onChange={e => setNotes(e.target.value)}>NOTES</p>
                            <textarea placeholder='Notes' />
                        </label>
                        <div className='CreateInv_div_bottomButtons'>
                            <button className='CreateInv_button_bottom' onClick={
                                () => postClient({ fullname, company, bank, IBAN, address, phone, email, website, notes }, createClient)
                            }>Save</button>
                            <button className='CreateInv_button_secondary' type='button'
                                onClick={() => {
                                    popupRef.current.close()
                                    document.getElementById('CreateInv_div_form').reset()
                                }}>Cancel</button>
                        </div>
                    </div>
                </form>

            </dialog>
        </div>
    )
}

export default AddClient