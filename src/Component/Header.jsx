import React from 'react'
import { Link } from '@mui/material'
const Header = () => {
    const currentUser=JSON.parse(localStorage.getItem("currentUser"))
  return (
    <div className='px-4 py-2  bg-dark text-white'>
        <div className="d-flex justify-content-between align-items-center ">
                <h1>SocialMini</h1>
                
              {currentUser? <Link href="/notification"><i className="fa-regular fa-heart text-white"></i></Link>:""}
        </div>
    </div>
  )
}

export default Header
