import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './Register.scss'

export const Register = () => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: ''
    })

    // filling userDetails state variables with user information
    const handleDetailsChange = (e) => {

        const {name, value} = e.target

        setUserDetails(prev => ({
            ...prev, 
            [name]: value
        }))

    }

    // function making server request to register user
    const registerUser = async () => {

        try {
            const response = await axios.post('http://localhost:8000/api/register', userDetails);
    
            if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.data));
                navigate('/');
            } else {
                // Handling unexpected response status codes
                console.log('Unexpected response status:', response.status)
            }
        } catch (error) {
            // Handling network errors or server errors
            if (error.response) {
                // Server returned an error response
                console.log('Server error:', error.response.data)
            } else if (error.request) {
                // Request was made but no response received
                console.log('Network error:', error.message)
            } else {
                // Something else went wrong
                console.log('Error:', error.message)
            }
        }

    }

    // function submitting form
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
                    <p>Have an account? <Link to="/login">please sign in</Link> </p>
                </form>
            </div>
        </div>
    )
}