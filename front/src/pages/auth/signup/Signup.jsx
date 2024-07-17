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
                <h1 style={{ marginBottom: '32px' }}>Signup</h1>
                <input placeholder='Full name' onChange={e => setName(e.target.value)} />
                <input placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <button onClick={authAccount}>Create account</button>
                <a href='/login'>ALREADY HAVE AN ACCOUNT</a>
            </div>
        </>
    )
}

export default Signup