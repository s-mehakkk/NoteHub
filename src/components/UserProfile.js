import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    const [user, setUser] = useState({})
    const fetchUser = async()=>{
        const url = `http://localhost:3001/api/auth/getUser`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if (json.success) {
            setUser(json.user);
        }
        else {
            alert(json.error);
        }
    }

    useEffect(() => {
      fetchUser();
    // eslint-disable-next-line
    }, [])
    


    return (
        <div className='container text-center mt-5'>
            <div className="card containerColour " >
                <div className='text-center my-3'><img src="https://ia601009.us.archive.org/13/items/HeaderIconUser/Header-Icon-User.png" style={{ height: '30vh', width: 'auto' }} className="card-img-top" alt="..." /></div>
                <div className="card-body ">
                    <h5 className="card-title">Your Profile</h5>
                    <div>
                    <ul className="list-group " >
                        <li className="list-group-item" >NAME : {user.name}</li>
                        <li className="list-group-item">Email-id : {user.email}</li>
                    </ul>
                    </div>
                    <Link to="/" className="btn btn-primary mt-3">Go back to your notes</Link>
                </div>
            </div>
        </div>
    )
}

export default UserProfile