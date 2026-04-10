import React from 'react'
import { Link } from '@mui/material'
const Header = () => {
    const currentUser=JSON.parse(localStorage.getItem("currentUser"))
  return (
    <div className='px-3 py-2  bg-white border border-top-0 border-end-0 border-start-0 border-bottom-2 '>
        <div className="d-flex justify-content-between align-items-center ">
                <h1>SocialMini</h1>
                
              {currentUser? <Link href="/notification"><i className="fa-regular fa-heart text-dark"></i></Link>:
              <div className="d-flex gap-2 align-items-center">

               <Link href='/login' className='btn btn-primary text-white  text-decoration-none'>Login</Link>
               <Link href='/signup' className='btn btn-primary text-white text-decoration-none'>Signup</Link>
              </div>
               }
        </div>
    </div>
  )
}

export default Header
