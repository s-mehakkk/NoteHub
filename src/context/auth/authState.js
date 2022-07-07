import AuthContext from './authContext'
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {
    const host = "http://localhost:3001";
    let navigate = useNavigate();

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
        }
        else {
            alert(json.error);
        }
    }

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
        }
        else {
            alert(json.error);
        }
    }


    return (
        <AuthContext.Provider value={{ login, signup }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;