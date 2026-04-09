import { Link } from '@mui/material'
import React from 'react'

const Navbar = () => {
   const currentUser=JSON.parse(localStorage.getItem("currentUser"))
  return (
    <div className='px-4 py-2 bg-dark' id='nav'>
        <div className="d-flex justify-content-around">
            <Link className='text-decoration-none text-white' href="/"><i className="fa-solid fs-4 fa-house"></i>  </Link>

            <Link className='text-decoration-none text-white' href={currentUser?"/post":'/login'}><i className="fa-solid fs-4 fa-plus"></i></Link>
            <Link className='text-decoration-none text-white' href={currentUser?"/profile":'/login'}><i className="fa-solid fs-4 fa-circle-user"></i></Link>
        </div>
    </div>
  )
}

export default Navbar
