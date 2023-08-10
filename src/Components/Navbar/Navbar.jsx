import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Navbar.scss'
import { useEffect } from 'react'
import { useState } from 'react'



export const Navbar = () => {

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [auth, setAuth] = useState(false)
    const [authenticated, setAuthenticated] = useState(false);


    // useEffect(() => {
    //     let userData = localStorage.getItem('userData');

    //     if(userData) {
    //         // navigate('/register')
    //         setAuth(true)
    //     }
    // }, [])

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
    

    return (
        <div className={`navbar`}>
            <div className="navbar-container">
                <div className="logo">
                    <h1>Xcelsz News</h1>
                    {/* <h1>Your daily news by Xcelsz</h1> */}
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
                <div className="user-profile-icon">
                    <p>user</p>
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