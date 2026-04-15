import { Link } from '@mui/material';
import React from 'react'

const Chat = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    return (
        <div>
            <div className='p-3  bg-white border border-top-0 border-end-0 border-start-0 border-bottom-2 '>
                <div className="d-flex gap-2 align-items-center ">
                    <Link href="/"><i className="fa-solid fa-arrow-left text-dark"></i></Link>
                    <strong>{currentUser.email}</strong>
                </div>
            </div>
            
        </div>
    )
}

export default Chat