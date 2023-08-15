import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { MainContainer } from './Components/MainContainer/MainContainer';

function App() {
  

  return (
    <div className="App">

      <Router>

        <MainContainer />
        
      </Router>

    </div>
  );
}

export default App;
