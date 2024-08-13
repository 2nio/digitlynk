import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import './MyAccount.css'
import { useFetch } from '../../hooks/useFetch';
import { useSignout } from '../../hooks/useSignout';
import { usePost } from '../../hooks/usePost';

function MyAccount() {

    const navigate = useNavigate()

    //Company
    const [createAccount, setCreateAccount] = useState(false)
    const [company, setCompany] = useState()
    const [address, setAddress] = useState()

    const { data, loading, fetchData } = useFetch('user')
    const signout = useSignout('signout')
    const { postData: createCompany } = usePost('business')
    const { postData: setCurrentCompany } = usePost('company')

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        data &&
        <div className='Signup_div_main'>
            <div className='Signup_div_left'>
                <p className='Signup_p_titleLeft' style={{ marginBottom: '32px', fontSize: '48px' }}>Hello {data.name}</p>
                <nav className='MyAcc_nav_navbar'>
                    <a href='/' className='Navbar_a_logo'>
                        <div className='Navbar_div_logo'><img className='Navbar_img_logo' src='./linkincon_new.png'></img>DigitLynk</div>
                    </a>
                    <ul>
                        <li>
                            <a>BILLING</a>
                        </li>
                        <li>
                            <a onClick={e => setCreateAccount(true)}>CREATE COMPANY</a>
                        </li>
                        <li>
                            <a onClick={signout}>SIGN OUT</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='Signup_div_signup'>
                <div className={createAccount ? 'MyAcc_div_createAcc' : 'none'}>
                    <p className='MyAcc_p_label'>Create a company</p>
                    <input placeholder='Company name' onChange={e => setCompany(e.target.value)} />
                    <input placeholder='Company address' onChange={e => setAddress(e.target.value)} />
                    <button onClick={e => createCompany({ company, address }, () => { setCreateAccount(false); fetchData() })}>Create company</button>
                    <a onClick={e => { setCreateAccount(false); }}>Cancel</a>
                </div>
                <div className={createAccount ? 'none' : 'MyAcc_div_companies'}>
                    <p className='MyAcc_p_label'>Your companies</p>
                    {data.companies.map(item =>
                        <button onClick={e => {
                            setCurrentCompany({ companyId: item.id })
                            navigate('/dashboard')
                        }}>{item.id?.company}</button>
                    )}
                </div>
            </div >
        </div >
    )
}

export default MyAccount