import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Header from './components/header';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Domains from './pages/Domains';
import CreateDomain from './pages/CreateDomain';
import DeleteDomain from './pages/DeleteDomain';
import CreateInternship from './pages/CreateInternship';
import AppContextProvider from './context/AppContext';
import Internships from './pages/Internships';


function App() {
  return (
    <div className="">
      <Router>
        <AppContextProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/domain" element={<Domains/>}/>
            <Route path="/domain/createDomain" element={<CreateDomain/>}/>
            <Route path="/domain/deleteDomain" element={<DeleteDomain/>}/>
            <Route path="/internship" element={<Internships/>}/>
            <Route path="/internship/createInternship" element={<CreateInternship/>}/>
          </Routes>
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;
