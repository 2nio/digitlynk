import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { error, authAccount } = useAuth('login', { email, password })

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
                    <a href='/' className='Navbar_a_logo'>
                        <div className='Navbar_div_logo'><img className='Navbar_img_logo' src='./linkincon_new.png'></img>Fluxloop</div>
                    </a>                    <p className='Signup_p_titleLeft'>Log into your account</p>
                    <p className='Signup_p_subtitle'>All your invoices, income, bills, payments, clients and providers in one place </p>
                </div>
                <div className='Signup_div_signup'>
                    <h1 className='Signup_p_title'>Log in</h1>
                    <input placeholder='Email' onChange={e => { setEmail(e.target.value) }} />
                    <input type='password' placeholder='Password' onChange={e => { setPassword(e.target.value) }} />
                    <button onClick={authAccount}>Continue</button>
                    <a href='/signup'>Don't have an account</a>
                </div>
            </div>
        </>
    )
}

export default Login