import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Header from './components/header';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className="">
      <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
