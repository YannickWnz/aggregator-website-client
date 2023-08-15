import { Link, useNavigate } from 'react-router-dom'
import './LoginPopUp.scss'

export const LoginPopUp = ({isLoggedIn, setIsLoggedIn}) => {
    
    const navigate = useNavigate()

    // function logging user out
    function logUserOut() {
        localStorage.removeItem('userData')
        navigate('/login')
    }

    return (
        <div className={` ${isLoggedIn ? 'popup' : 'hide-popup'} `}>
            <div className="popup-container">
                <h1>You appear not to be logged in. Please <Link onClick={() => {navigate('/login')}} >sign in</Link> to create and save your preferences</h1>
                <div className="popup-btn">
                    <div className="signin-btn">
                        <button onClick={() => {navigate('/login')}} >Login</button>
                    </div>
                    <div className="cancel-btn">
                        <button onClick={() => {setIsLoggedIn(false)}} >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}