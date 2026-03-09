import React from 'react'
import { Link } from '@mui/material'
const Header = () => {
    const currentUser=JSON.parse(localStorage.getItem("currentUser"))
    const handleLogout=()=>{
        localStorage.removeItem("currentUser")
        window.location.href="/login"
    }
  return (
    <div className='px-4 py-2 shadow-lg'>
        <div className="d-flex justify-content-between align-items-center ">
                <h1>SocialMini</h1>
                
               {currentUser?
               <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
               :
                <div className='d-flex gap-2'>
                    <button className="btn btn-dark" type='button'><Link className='text-decoration-none text-white' href="/login">Login</Link></button>
                    <button className="btn btn-dark" type='button'><Link className='text-decoration-none text-white' href="/signup">Sign up</Link></button>
                </div>}
        </div>
    </div>
  )
}

export default Header
