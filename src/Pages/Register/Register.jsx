import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './Register.scss'

export const Register = () => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        name: '',
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

    const registerUser = async () => {
        
        try {
            const response = await axios.post('http://localhost:8000/api/register', userDetails)
            console.log(response.data)
            localStorage.setItem('userData', JSON.stringify(response.data))
            navigate('/')

        } catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        registerUser()
    }


    return (
        <div className="register">
            <div className="register-container">
                <form action="" onSubmit={handleSubmit} >
                    <input type="text" name='name' value={userDetails.name} onChange={handleDetailsChange} placeholder="name" /><br />
                    <input type="email" name='email' value={userDetails.email} onChange={handleDetailsChange} placeholder="email" /><br />
                    <input type="password" name='password' value={userDetails.password} onChange={handleDetailsChange} placeholder="password" /><br />
                    <input type="submit" value="Sign Up" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}