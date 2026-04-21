import { Link } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Chat = () => {
  const token = "w3KH694RqiZ64T9M";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState([]);
  const fetchUser = () => {
    axios
      .get("https://generateapi.techsnack.online/api/users", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.Data);
        setUser(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const navigateToChat=(email)=>{
        window.location.href=`/chat/${email}`
  }
  return (
    <div>
      <div className="p-3  bg-white border border-top-0 border-end-0 border-start-0 border-bottom-2 ">
        <div className="d-flex gap-2 align-items-center ">
          <Link href="/">
            <i className="fa-solid fa-arrow-left text-dark"></i>
          </Link>
          <strong>{currentUser.email}</strong>
        </div>
      </div>
      <div className="container">
        <h1 className="fw-bold">Chat</h1>
        {
        user.map((user) => {
              return (
                <div onClick={()=>navigateToChat(user.email)} key={user._id} style={{ cursor: "pointer" }} className='d-flex gap-3 align-items-center shadow-sm bg-light p-2 rounded'>
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
              )
            })
        }
      </div>
    </div>
  );
};

export default Chat;
