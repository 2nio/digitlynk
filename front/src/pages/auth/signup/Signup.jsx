import React, { useState } from 'react'
import './Signup.css'
import { useAuth } from '../../../hooks/useAuth'

function Signup() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { error, authAccount } = useAuth('signup', { name, email, password })


    return (
        <>
            {
                error &&
                <p className='Signup_p_error'>
                    {error[0]}
                </p>
            }
            <div className='Signup_div_main'>
                <div className='Signup_div_left'>
                    <div className='Signup_div_logo'><img className='Navbar_img_logo' src='./linkincon_new.png'></img>DigitLynk</div>
                    <p className='Signup_p_title'>Create an account</p>
                    <p className='Signup_p_subtitle'>All your invoices, income, bills, payments, clients and providers in one place </p>
                </div>
                <div className='Signup_div_signup'>
                    <p className='Signup_p_title'>Signup</p>
                    <input placeholder='Full name' onChange={e => setName(e.target.value)} />
                    <input placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    <button onClick={authAccount}>Create account</button>
                    <a href='/login'>Already have an account</a>
                </div>
            </div>
        </>
    )
}

export default Signup