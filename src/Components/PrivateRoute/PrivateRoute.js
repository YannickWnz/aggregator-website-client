import { useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar';

function PrivateRoute({children}) {

    const currentRoute = useNavigate().pathname;
    const navigate = useNavigate()

    const [auth, setAuth] = useState(true)
    const [route, setRoute] = useState("");

    const checkUserData = () => {
        let userData = localStorage.getItem('userData');

        if(userData) {
            setAuth(true)
        } else {
            navigate('/register')
        }

    }

    const checkIfUserIsLoggedIn = () => {
        // setRoute(currentRoute);

        if(currentRoute === '/login' || currentRoute === '/register') {
            // setAuth(false)
        } else {
            // setAuth(true)
        }

        
    }
    
    useEffect(() => {
        // checkUserData()
        checkIfUserIsLoggedIn()
        // console.log(auth)
    }, [currentRoute])

    if (auth) {
        return (
            <>
                <Navbar />
                {/* {children} */}
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