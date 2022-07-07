import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/noteState';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthState from './context/auth/authState';
import UserProfile from './components/UserProfile';

function App() {
  document.body.style.backgroundColor = '#3F4E4F'
  return (
    <Router >
      <NoteState>
        <AuthState>
          <Navbar />
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
    </Router>
  );
}

export default App;
