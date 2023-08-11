import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Login.scss'

export const Login = () => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
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

    // function making server request to sign user in
    const signUserIn = async () => {

        try {
            const response = await axios.post('http://localhost:8000/api/login', userDetails);
    
            if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.data));
                // redirection user to home if details are valid
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
                    <p>Don't have an account ? <Link to='/register'>signup here</Link> </p>
                </form>
            </div>
        </div>
    )
}