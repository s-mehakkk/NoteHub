import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './authContext'
import alertContext from '../alert/alertContext';

const AuthState = (props) => {
    const aContext = useContext(alertContext);
    const {displayAlert} = aContext;

    const host = "http://localhost:3001";
    let navigate = useNavigate();

    // Login 
    const login = async (email, password) => {
        const url = `${host}/api/auth/signin`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            displayAlert('success', 'Log-in successful');

        }
        else {
            displayAlert('danger', json.error)
        }
    }

    //Signup
    const signup = async (name, email, password) => {
        const url = `${host}/api/auth/signup`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            displayAlert('success', 'Sign-up successful');
        }
        else {
            displayAlert('danger', json.error);
        }
    }


    return (
        <AuthContext.Provider value={{ login, signup }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;