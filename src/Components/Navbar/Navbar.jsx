import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Navbar.scss'
import { useEffect } from 'react'
import { useState } from 'react'



export const Navbar = () => {

    const navigate = useNavigate()

    // get user data from local storage
    const user = JSON.parse(localStorage.getItem('userData'));

    // states variables
    const [search, setSearch] = useState('')
    const [authenticated, setAuthenticated] = useState(false);

    const [profileSection, setProfileSection] = useState(false)


    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setAuthenticated(true);
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(search.length === 0) return

        navigate(`/search/${search}`)
        setSearch('')

    }


    function displayUserEmail() {
        if(user) return user.user.email
    }

    function displayUserName() {
        if(user) return user.user.name
    }

    // get user initials
    function getInitials(name) {
        if(!name) return
        const names = name.split(" ");
        const firstInitial = names[0][0];
        const middleInitial = names.length > 2 ? names[1][0] : '';
        const lastInitial = names[names.length - 1][0];
        let initials = `${firstInitial}${middleInitial}${lastInitial}`
        return initials.toUpperCase();
    }

    // function logging user out
    function logUserOut() {
        localStorage.removeItem('userData')
        navigate('/login')
    }

    // Toggle user profile section visibility
    function toggleProfileSection() {
        setProfileSection(!profileSection)
    }

    

    return (
        <div className={`navbar`}>
            <div className="navbar-container">
                <div className="logo">
                    <h1>Xcelsz News</h1>
                </div>
                <div className="input-search">
                    <form action="" onSubmit={handleSubmit} >
                        <span onClick={handleSubmit} ><i className="fa-solid fa-magnifying-glass"></i></span>
                        <input 
                            type="text" 
                            placeholder='Search for topics' 
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        {search && <span onClick={(e) => setSearch('')}
                        ><i className="fa-solid fa-xmark"></i> </span>}
                    </form>
                </div>
                <div onClick={toggleProfileSection} className="user-profile-icon">
                    <p>{getInitials(user.user.name)}</p>
                    {profileSection && <div className="profile-details">
                        <p>{displayUserEmail()}</p>
                        <h1>Hi, {displayUserName()}!</h1>
                        <button onClick={logUserOut} >LOGOUT</button>
                    </div>}
                </div>
            </div>
            <div className="navlinks-container">
                <Link to='/' className='home-link' >Home</Link>
                <div className="categories">
                    <ul>
                        <li>
                            <Link to='/category/general'>World</Link>
                        </li>
                        <li>
                            <Link to='/category/business'>Business</Link>
                        </li>
                        <li>
                            <Link to='/category/health'>Health</Link>
                        </li>
                        <li>
                            <Link to='/category/technology' >Technology</Link>
                        </li>
                        <li>
                            <Link to='/category/entertainment' >Entertainment</Link>
                        </li>
                        <li>
                            <Link to='/category/sports'>Sport</Link>
                        </li>
                        <li>
                            <Link to='/category/science'>Science</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}