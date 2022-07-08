import React, { useState, useContext } from 'react'
import authContext from '../context/auth/authContext'
import alertContext from '../context/alert/alertContext';

const Signup = () => {
    const context = useContext(authContext);
    const { signup } = context;
    const aContext = useContext(alertContext);
    const {displayAlert} = aContext;

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (credentials.password === credentials.cpassword) {
            signup(credentials.name, credentials.email, credentials.password);
        }
        else {
            displayAlert('danger', 'confirm password does not match');
        }
    }
    return (
        <div className='container containerColour border rounded my-3 '>
            <h3 className='my-2'>Create an account to continue</h3><hr />
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" autoComplete="on" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" autoComplete="on" onChange={onChange} />
                </div>
                <button type="submit" className="btn btnColour mb-2">Signup</button>
            </form>
        </div>
    )
}

export default Signup