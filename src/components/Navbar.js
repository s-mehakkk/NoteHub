import React, {useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';

export const Navbar = () => {

    const title = 'iNoteBook';
    let location = useLocation();
    const navigate = useNavigate();

    const aContext = useContext(alertContext);
    const {displayAlert} = aContext;

    const handleLogout= ()=>{
        localStorage.removeItem('token');
        console.log('loging out')
        // localStorage.setItem('sed', 'loggingout')
        navigate('/login');
        displayAlert('success', 'Logged-out successfully');
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-lg navColour">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center" >
                        {!localStorage.getItem('token')?<>
                        <Link className="btn btnColour mx-1" to="login" role="button">Log-in</Link>
                        <Link className="btn btnColour mx-1" to="signup" role="button">Sign-up</Link>
                        </> :<><Link className="fa-solid fa-user mx-3 " style={{color:'#A27B5C'}} to='/userProfile'/>
                         <button className='btn btnColour' onClick={handleLogout} >Logout</button>
                         </>}
                        </div>
                </div>
            </div>
        </nav>

    )
}
