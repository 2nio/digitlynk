import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";

import './Overview.css'
import Users from './Users';
import Companies from './Companies';

import { IoMdBusiness } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { useFetch } from '../../../hooks/useFetch';
import { usePost } from '../../../hooks/usePost';
import { closePopup } from '../../../functions/closePopup';


function Account({ popupState, setPopup }) {

    const { data, loading, fetchData } = useFetch('business')
    const { data: admin, loading: loadingUser, fetchData: fetchUser } = useFetch(`user?id=${data && data.owner}`)
    const { postData, loading: loadingPostReq } = usePost('editBusiness')

    const navigate = useNavigate()

    const popupRef = useRef()
    const [menu, setMenu] = useState('Account')

    const [company, setCompany] = useState()
    const [address, setAddress] = useState()
    const [bank, setBank] = useState()
    const [IBAN, setIBAN] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [website, setWebsite] = useState()

    const [users, setUsers] = useState([])
    const [clients, setClients] = useState([])
    const [providers, setProviders] = useState([])

    const clearState = () => {
        setCompany(); setAddress(); setBank(); setIBAN(); setPhone(); setEmail(); setWebsite()
    }

    useEffect(() => {
        popupState && popupRef.current.showModal()
    }, [popupState])

    useEffect(() => {
        closePopup(() => {
            fetchData()
            popupRef.current.close()
            setPopup(false)
            setMenu('Account')
        }, popupRef)
    }, [])

    const editBusiness = async () => {
        await postData({ company, address, bank, IBAN, phone, email, website })
        fetchData()
        setMenu('Account')
        popupRef.current.close()
        setPopup(false)
    }

    return (
        <dialog ref={popupRef} className='Account_dialog_popup'>
            {loading || loadingUser || loadingPostReq ? <div>Loading...</div> :
            data &&
                <div style={{ display: menu === 'Account' || menu === 'Edit' ? 'block' : 'none' }}>
                    <h1 style={{ marginBottom: '32px', fontSize: '32px' }}>Overview</h1>
                    <div className='Account_div_main'>
                        <div className='MyAcc_div_info'>
                            <div className='MyAcc_div_photo'><IoMdBusiness style={{ alignSelf: 'center' }} size={'3rem'} /></div>
                            <div style={{ marginLeft: 16, maxWidth: '320px', overflowWrap: 'break-word' }}>
                                <p style={{ fontWeight: 600, fontSize: 32 }}>{data.company}</p>
                                <p style={{ fontWeight: 500, fontSize: 16 }}>{data.address}</p>
                            </div>
                            <MdEdit onClick={e => setMenu('Edit')} style={{ marginLeft: '16px' }} size={'1.6rem'} />
                        </div>
                    </div>
                    <div className='Account_div_bottom'>
                        <div style={{ display: menu !== 'Edit' && 'none' }}>
                            <div className='CreateInv_div_popupInfo'>
                                <div className='CreateInv_div_popupInfoChild'>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>ADMIN</p>
                                        <input defaultValue={admin.name} placeholder='Admin' className='CreateInv_input'></input>
                                    </label>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>COMPANY NAME</p>
                                        <input maxLength={'40'} defaultValue={data.company} placeholder='Company' className='CreateInv_input' onChange={e => setCompany(e.target.value)}></input>
                                    </label>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>BANK</p>
                                        <input defaultValue={data.bank} placeholder='Bank' className='CreateInv_input' onChange={e => setBank(e.target.value)}></input>
                                    </label>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>IBAN</p>
                                        <input defaultValue={data.IBAN} placeholder='IBAN' className='CreateInv_input' onChange={e => setIBAN(e.target.value)}></input>
                                    </label>
                                </div>
                                <div className='CreateInv_div_popupInfoChild'>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>ADDRESS</p>
                                        <input defaultValue={data.address} maxLength={'40'} placeholder='Address' className='CreateInv_input' onChange={e => setAddress(e.target.value)}></input>
                                    </label>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>PHONE</p>
                                        <input defaultValue={data.phone} placeholder='Phone' className='CreateInv_input' onChange={e => setPhone(e.target.value)}></input>
                                    </label>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>EMAIL</p>
                                        <input defaultValue={data.email} placeholder='Email' className='CreateInv_input' onChange={e => setEmail(e.target.value)}></input>
                                    </label>
                                    <label className='CreateInv_label'>
                                        <p className='CreateInv_p_label'>WEBSITE</p>
                                        <input defaultValue={data.website} placeholder='Website' className='CreateInv_input' onChange={e => setWebsite(e.target.value)}></input>
                                    </label>
                                </div>
                            </div>
                            <div className='CreateInv_div_popupInfoBottom'>
                                <div className='CreateInv_div_bottomButtons'>
                                    <button className='CreateInv_button_bottom' onClick={editBusiness}>Save</button>
                                    <button className='CreateInv_button_secondary' onClick={e => { setMenu('Account'); fetchData(); clearState() }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        <div className='Account_div_settings' style={{ display: menu == 'Edit' && 'none' }}>
                            <p onClick={e => setMenu('Users')}>Users</p>
                            <p onClick={e => setMenu('Clients')}>Clients</p>
                            <p onClick={e => setMenu('Providers')}>Providers</p>
                            <p onClick={e => navigate('/myaccount')}>My account</p>
                        </div>
                    </div>
                </div>
            }
            <Companies setMenuState={value => setMenu(value)} menuState={menu} />
            <Users setMenuState={value => setMenu(value)} menuState={menu} />

        </dialog>
    )
}

export default Account