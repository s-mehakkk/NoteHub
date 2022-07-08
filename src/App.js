// TO-DO
// 1. About page
// 2. Alerts

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import UserProfile from './components/UserProfile';

import NoteState from './context/notes/noteState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';


function App() {
  document.body.style.backgroundColor = '#3F4E4F';

  return (
    <Router >
      <AlertState>
        <NoteState>
          <AuthState>
            <Navbar />
            <Alert />
            <div className="container my-2 ">
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
                <Route exact path='/userProfile' element={<UserProfile />} />
              </Routes>
            </div>
          </AuthState>
        </NoteState>
      </AlertState>
    </Router>
  );
}

export default App;
