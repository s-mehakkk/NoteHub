import React, {useState, useContext} from 'react'
import authContext from '../context/auth/authContext'

const Login = () => {
    const context = useContext(authContext);
    const {login} = context;

    const [credentials, setCredentials] = useState({email:"", password:""})

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        login(credentials.email, credentials.password);
    }
    return (
        <div className='container containerColour border rounded my-3 '>
            <h3 className='my-2'>Login to your account to view your notes</h3><hr/>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" autoComplete="on" onChange={onChange} />
                </div>
                <button type="submit" className="btn btnColour mb-2">Login</button>
            </form>
        </div>
    )
}

export default Login