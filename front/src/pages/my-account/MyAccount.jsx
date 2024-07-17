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

    const { data, loading } = useFetch('user')
    const signout = useSignout('signout')
    const { postData: createCompany } = usePost('business')
    const { postData: setCurrentCompany } = usePost('company')

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        data &&
        <>
            <div className='MyAcc_div_main'>
                <div className='MyAcc_div_info'>
                    <div className='MyAcc_div_photo'><FaRegUser style={{ alignSelf: 'center' }} size={'3rem'} /></div>
                    <div style={{ marginLeft: 16 }}>
                        <p style={{ fontWeight: 600, fontSize: 32 }}>{data.name}</p>
                        <p style={{ fontWeight: 500, fontSize: 16 }}>{data.email}</p>
                    </div>
                </div>
                <div className={createAccount ? 'MyAcc_div_createAcc' : 'none'}>
                    <input placeholder='Company Name' onChange={e => setCompany(e.target.value)} />
                    <input placeholder='Company Address' onChange={e => setAddress(e.target.value)} />
                    <button onClick={e => createCompany({ company, address })}>Create company</button>
                    <p onClick={e => setCreateAccount(false)}>CANCEL</p>

                </div>
                <div className={createAccount ? 'none' : 'MyAcc_div_companies'}>
                    <p className='MyAcc_p_label'>COMPANIES</p>
                    {data.companies.map(item =>
                        <button onClick={e => {
                            setCurrentCompany({ companyId: item.id })
                            navigate('/dashboard')
                        }}>{item.name}</button>
                    )}
                </div>
                <span className={createAccount ? 'none' : 'MyAcc_span_separator'}></span>
                <div className={createAccount ? 'none' : 'MyAcc_div_actions'} >
                    <p className='MyAcc_p_label'>ACTIONS</p>
                    <button >Plans & Billing</button>
                    <button onClick={e => setCreateAccount(true)}>Create company</button>
                    <button onClick={signout}>Sign out</button>
                </div>
            </div >
        </>
    )
}

export default MyAccount