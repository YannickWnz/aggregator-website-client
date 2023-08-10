import { useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar';

function PrivateRoute({children}) {

    const navigate = useNavigate()

    const [auth, setAuth] = useState(false)
    
    const checkUserData = () => {
        let userData = localStorage.getItem('userData');
    
        // return userData ? children : navigate('/register')

        if(userData) {
            setAuth(true)
        } else {
            navigate('/register')
        }

    }

    useEffect(() => {
        checkUserData()
    }, [])

    if (auth) {
        return (
            <>
                <Navbar />
                {children}
            </>
        )
    } else {
        return <div>Loading...</div>; 
    }

    // return (
    //     auth ? children : null
    // )

}

export default PrivateRoute