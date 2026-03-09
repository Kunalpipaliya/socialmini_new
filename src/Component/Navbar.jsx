import { Link } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <div className='px-4 py-2 shadow-lg bg-secondary' id='nav'>
        <div className="d-flex justify-content-between">
            <Link className='text-decoration-none text-white' href="/">Home</Link>
            <Link className='text-decoration-none text-white' href="/post">Post</Link>
            <Link className='text-decoration-none text-white' href="/profile">Profile</Link>
        </div>
    </div>
  )
}

export default Navbar
