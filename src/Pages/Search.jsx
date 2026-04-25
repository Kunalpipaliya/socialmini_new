import axios from 'axios'
import React, { useEffect, useState } from 'react'




const Search = () => {
  const token = "w3KH694RqiZ64T9M"
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [users, setUsers] = useState([])
  const [keyword, setKeyword] = useState("")
  useEffect(() => {
    axios.get("https://generateapi.techsnack.online/api/users", {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setUsers(res.data.Data)
      })
      .catch((err) => {
        console.log(err);

      })
  }, [])
  const filteredUser = keyword.trim() === "" ? [] : users.filter((user) =>
    user.email.toLowerCase().includes(keyword.toLowerCase()) || (user.username && user.username.toLowerCase().includes(keyword.toLowerCase()))
  )
  const navigateToProfile = (email) => {
    email === currentUser.email ?
      window.location.href = `/profile`
      :
      window.location.href = `/user/${email}`
  }
  return (
    <div className='container mt-5'>
      <div className="d-flex align-items-center gap-2">
        <input type="text" className="form-control rounded-pill" placeholder='Search users by email or username...' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>

      <div className='my-5 d-flex flex-column gap-3'>

        {
          keyword && filteredUser.length === 0 ? <h3 className='text-center text-muted'>No user found</h3> :
            filteredUser.map((user) => {
              return (
                <div  key={user._id} style={{ cursor: "pointer" }} className=' shadow-sm bg-light p-2 rounded d-flex align-items-center justify-content-between'>
                  <div className='d-flex gap-3 align-items-center' onClick={() => navigateToProfile(user.email)}>

                    <div
                      style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}
                      className="bg-dark rounded-circle text-white d-flex justify-content-center align-items-center fw-bold"
                    >
                      {user.email.at(0).toUpperCase()}
                    </div>
                    <div className="d-flex flex-column text-start">
                      <span className="fw-bold">{user.username || user.email.split('@')[0]}</span>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={()=>window.location.href=`/chat/${user.email}`}>Message</button>
                </div>
              )
            })
        }
      </div>

    </div>
  )
}

export default Search