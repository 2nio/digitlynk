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
                <h1 style={{ marginBottom: '32px' }}>Login</h1>
                <input placeholder='Email' onChange={e => { setEmail(e.target.value) }} />
                <input type='password' placeholder='Password' onChange={e => { setPassword(e.target.value) }} />
                <button onClick={authAccount}>Continue</button>
                <a href='/signup'>DON'T HAVE AN ACCOUNT</a>
            </div>
        </>
    )
}

export default Login