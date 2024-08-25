import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true

export const useSignout = (route) => {
    const navigate = useNavigate()

    const signout = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/${route}`)
            .then(res => {
                console.log(res)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return signout
}