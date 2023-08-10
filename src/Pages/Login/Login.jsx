import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.scss'

export const Login = () => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
 
    const handleDetailsChange = (e) => {

        const {name, value} = e.target

        setUserDetails(prev => ({
            ...prev, 
            [name]: value
        }))

    }

    const signUserIn = async () => {
        
        try {
            const response = await axios.post('http://localhost:8000/api/login', userDetails)
            console.log(response.data)
            localStorage.setItem('userData', JSON.stringify(response.data))
            navigate('/')
        } catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        signUserIn()
    }


    return (
        <div className="login">
            <div className="login-container">
                <form action="" onSubmit={handleSubmit} >
                    <input type="email" name='email' value={userDetails.email} onChange={handleDetailsChange} placeholder="email" /><br />
                    <input type="password" name='password' value={userDetails.password} onChange={handleDetailsChange} placeholder="password" /><br />
                    <input type="submit" value="Sign Up" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}