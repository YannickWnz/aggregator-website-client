import { Routes, Route, useLocation } from 'react-router-dom';
import { Category } from '../../Pages/Category/Category';
import { Home } from '../../Pages/Home/Home';
import { Login } from '../../Pages/Login/Login';
import { Register } from '../../Pages/Register/Register';
import { SearchResults } from '../../Pages/SearchResults/SearchResults';
import { Navbar } from '../Navbar/Navbar';



export const MainContainer = () => {

    const location = useLocation()

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className="main-container">

                {!isAuthPage && <Navbar /> }

                <Routes>
                    <Route path='/' element={ <Home /> } ></Route>
                    <Route path='/search/:searchTerm' element={ <SearchResults /> } ></Route>
                    <Route path='/category/:category' element={ <Category /> } ></Route>
                    <Route path='/login' element={ <Login /> } ></Route>
                    <Route path='/register' element={ <Register /> } ></Route>
                </Routes>

        </div>
    )

}