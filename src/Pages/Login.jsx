import { Link } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Login = ({ users, setUsers }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const token = "w3KH694RqiZ64T9M"
    axios.get("https://generateapi.techsnack.online/api/users", {
        headers: {
            Authorization: token
        }
    })
        .then((res) => {
            console.log(res.data.Data);
            setUsers(res.data.Data)
        })
        .catch((err) => {
            console.log(err);

        })
    const handleLogin = () => {
        const user=users.find((u)=>u.email===email&&u.password===password)
        localStorage.setItem("currentUser",JSON.stringify(user))
        if(user){
            alert("loggin successfully")
            window.location.href="/profile"
        }
        else{
            alert("try again!")
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center container' style={{ height: "100vh" }}>
            <form action="" className="w-100  p-3 rounded shadow-lg">
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Email</label>
                    <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Password</label>
                    <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
                </div>
                <button className="btn btn-primary w-100 mb-2   " onClick={handleLogin} type='button'>Login</button>
                <Link href="/signup">Create new Account</Link>
            </form>
        </div >
    )
}

export default Login
