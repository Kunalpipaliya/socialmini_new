import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
const Notification = () => {
  const token = "w3KH694RqiZ64T9M";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [like, setLike] = useState([]);
  const fetchLikes = () => {
    axios
      .get("https://generateapi.techsnack.online/api/like", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.Data);
        const reverseLikes = [...res.data.Data].reverse()
        setLike(reverseLikes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchLikes();
  }, []);

  const filteredNotification = like.filter((l) => l.likedTo.postedBy === currentUser.email && l.likedby !== currentUser.email)
  return (
    <div>
      {filteredNotification.map((item, index) => {

        return (
          <div key={item._id} className="m-2">

            <div className="d-flex align-items-center justify-content-between shadow-sm bg-light rounded p-2" >

              <span><strong>{item.likedby}</strong> Liked Your Post</span>
              <Link href="/profile">
              <div style={{ width: "50px", height: "50px",overflow:"hidden" }}  className="bg-dark rounded">
                <img src={item.postid.post} alt="" style={{ objectFit: "cover", objectPosition: "center top"}} width={"100%"} height={"100%"}  />
              </div>
              </Link>
            </div>
          </div>

        );
      })}
    </div>
  );
};

export default Notification;
