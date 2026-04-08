import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const token = "w3KH694RqiZ64T9M";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [posts, setposts] = useState([]);
  const fetchPost = () => {
    axios
      .get(" https://generateapi.techsnack.online/api/postImg", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setposts(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPost();
  }, [posts]);
  const filteredPosts = posts.filter((p) => p.postedBy === currentUser.email);
  const deletePost=(id)=>{
    axios.delete(` https://generateapi.techsnack.online/api/postImg/${id}`,{
      headers:{
        Authorization:token
      }
    })
    .then(()=>{
      console.log("post with "+id+ "deleted successfully");
      setActiveEllipsis(false)
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }
  let activeId
  const [activeEllipsis, setActiveEllipsis] = useState(false);
  const toggleEllipsis = (id) => {
     activeId = posts.find((p) => p._id === id);
    if (activeId) {
      setActiveEllipsis(true);
    } else setActiveEllipsis(false);
    deletePost(id)
  };
  return (
    <div>
      <div
        style={
          activeEllipsis
            ? { filter: "blur(2px) grayscale(100%)", opacity: "0.5" }
            : { filter: "blur(0px)", opacity: "1" }
        }
      >
        <div className="container">
          <div className="d-flex gap-2 align-items-start my-4">
            <span
              style={{ width: "40px", height: "40px" }}
              className="bg-dark rounded-circle text-white d-flex justify-content-center align-items-center fw-bold"
            >
              {currentUser.email.at(0).toUpperCase()}
            </span>
            <span className="d-flex flex-column">
              <span>{currentUser.username}</span>
              <small className="text-muted">{currentUser.email}</small>
              <div className="d-flex gap-3 align-items-center">
                <div className="d-flex flex-column">
                  <strong>Posts</strong>
                  <p className="text-center">{filteredPosts.length}</p>
                </div>
                <div className="d-flex flex-column">
                  <strong>Followers</strong>
                  <p className="text-center">0</p>
                </div>
                <div className="d-flex flex-column">
                  <strong>Following</strong>
                  <p className="text-center">0</p>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div className="mb-5">
          {filteredPosts.length === 0 ? (
            <h3 className="text-center">0 post by {currentUser.username}</h3>
          ) : (
            filteredPosts.map((item, index) => {
              return (
                <div key={index}>
                  <div className=" w-md-50 m-auto shadow-sm rounded-4 bg-white p-3 border border-1 my-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <span
                          style={{ width: "40px", height: "40px" }}
                          className="bg-dark rounded-circle text-white d-flex justify-content-center align-items-center fw-bold"
                        >
                          {item.postedBy.at(0).toUpperCase()}
                        </span>
                        <span className="d-flex flex-column">
                          <small className="text-muted">{item.postedBy}</small>
                        </span>
                      </div>
                      <i
                        className="fa-solid fa-ellipsis-vertical"
                        onClick={() => toggleEllipsis(item._id)}
                      ></i>
                    </div>
                    <hr />
                    <div>
                      <img src={item.post} alt={item.post} width={"100%"} />
                    </div>
                    <strong>{item.postedBy}</strong>
                    <span className="text-muted"> {item.caption}</span>
                    <hr />
                    <div className="d-flex gap-3">
                      <i className="fa-regular fa-heart"></i>
                      <i className="fa-regular fa-comment"></i>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {activeEllipsis ? (
        <div
          className="position-fixed bg-white p-3 shadow-lg w-100 h-25"
          style={{ bottom: "0px" }}
        >
          <div className="d-flex justify-content-between ">
            <span style={{width:"20px"}}></span>
            <span style={{height:"3px ",width:"50px",background:"black",borderRadius:"3px"}}></span>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setActiveEllipsis(false)}
            ></i>

          </div>
          <hr />
          <div className="d-flex align-items-center gap-2 text-danger">

          <i className="fa-solid fa-trash-can text-danger fs-5" onClick={()=>deletePost}></i><span className="fw-semibold">Delete</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
