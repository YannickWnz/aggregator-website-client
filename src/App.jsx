import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Home } from './Pages/Home/Home';
import { Register } from './Pages/Register/Register';
import { Login } from './Pages/Login/Login';
import { SearchResults } from './Pages/SearchResults/SearchResults';
import { Category } from './Pages/Category/Category';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">

      <Router>

        {/* <PrivateRoute> */}
          {/* <Navbar /> */}
        {/* </PrivateRoute> */}

        <Routes>
          {/* <Route path='/' element={ <Home/> } ></Route> */}
          <Route path='/' element={ 
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } ></Route>
          <Route path='/search/:searchTerm' element={ 
            <PrivateRoute>
              <SearchResults />
            </PrivateRoute>
          } ></Route>
          <Route path='/category/:category' element={ 
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          } ></Route>
          <Route path='/login' element={ <Login />} ></Route>
          <Route path='/register' element={ <Register /> } ></Route>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
