import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true

export const useAuth = (route, data) => {

    const navigate = useNavigate()
    const [error, setError] = useState()

    const authAccount = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/${route}`, data)
            .then(res => {
                if (res.status === 200) {
                    navigate('/myaccount')
                }
            })
            .catch(err => {
                console.log(err)
                error && clearTimeout(error[1])
                const timeout = setTimeout(() => { setError(null) }, 8000)
                setError([err.response.data.error, timeout])
            })
    }

    return { error, authAccount }
}