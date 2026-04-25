import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Form, Field, Formik } from 'formik';
import { Link } from '@mui/material';
const Userprofile = () => {
  const token = "w3KH694RqiZ64T9M"
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const now = new Date();
  const today =
    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
  const { userEmail } = useParams()

  const [posts, setPosts] = useState([])

  const fetchpost = () => {
    axios
      .get("https://generateapi.techsnack.online/api/postImg", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setPosts(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [likes, setLikes] = useState([]);
  const fetchLikes = () => {
    axios
      .get("https://generateapi.techsnack.online/api/like", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLikes(res.data.Data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = (item) => {

    console.log(item);
    const liked = likes.find(
      (l) => l.postid._id === item._id && l.likedby === currentUser.email,
    );
    if (liked) {
      axios
        .delete(`https://generateapi.techsnack.online/api/like/${liked._id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          fetchLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {


      axios
        .post(
          "https://generateapi.techsnack.online/api/like",
          {
            postid: item._id, likedby: currentUser.email, likedTo: item._id
          },
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .then(() => {
          fetchLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [comments, setComments] = useState([]);
  const [commentsection, setCommentsection] = useState(null);
  const fetchComment = () => {
    axios
      .get("https://generateapi.techsnack.online/api/comments", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setComments(res.data.Data || []);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleComment = (id) => {
    setCommentsection(commentsection === id ? null : id);
  };

  const handleComment = (values) => {
    axios
      .post("https://generateapi.techsnack.online/api/comments", values, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        fetchComment();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [profileUser, setProfileUser] = useState(null)
  useEffect(() => {
    fetchpost();
    fetchComment()
    fetchLikes()
    axios.get("https://generateapi.techsnack.online/api/users", {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        const allusers = res.data.Data || []
        const foundUser = allusers.find((u) => u.email === userEmail)
        setProfileUser(foundUser)
      })
      .catch((err) => {
        console.log(err);

      })
  }, [userEmail]);

  const filteredPosts = posts.filter((p) => p.postedBy === userEmail)

  return (
    <div>
      
      <div className='p-3  bg-white border border-top-0 border-end-0 border-start-0 border-bottom-2 '>
        <div className="d-flex gap-3 aling-items-center ">
          <Link href="/search"><i className="fa-solid fa-arrow-left text-dark"></i></Link>

          <strong>{userEmail}</strong>

        </div>
      </div>
      <div>
        <div className="container mt-4 mb-4">
          <div className="d-flex justify-content-around align-items-center">

            <div className="d-flex flex-column align-items-center">

              <span
                style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                className="bg-dark rounded-circle text-white d-flex justify-content-center align-items-center fw-bold"
              >
                {userEmail.at(0).toUpperCase()}
              </span>
              <strong className="mt-2">{profileUser ? profileUser.username : userEmail.split('@')[0]}</strong>
            </div>
            <div className="d-flex flex-column gap-2">

              <div className="d-flex gap-4 text-center">
                <div className="d-flex flex-column">
                  <span className="fs-5 fw-bold">{filteredPosts.length}</span>
                  <span>Posts</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="fs-5 fw-bold">0</span>
                  <span>Followers</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="fs-5 fw-bold">0</span>
                  <span>Following</span>
                </div>

              </div>
              <div className="d-flex gap-2">

            <button className="btn btn-primary w-50">Follow</button>
            <button className="btn btn-primary w-50" onClick={() => window.location.href = `/chat/${userEmail}`}>Message</button>
              </div>
            </div>

          </div>
        </div>

        <div className="mb-5">
          {filteredPosts.length === 0 ? (
            <h3 className="text-center">0 post by {profileUser ? profileUser.username : userEmail.split('@')[0]}</h3>
          ) : (
            filteredPosts.map((item, index) => {
              const filteredComments = comments.filter(
                (c) => c.postid === item._id,
              );
              const liked = likes.find(
                (l) =>
                  l.postid._id === item._id && l.likedby === currentUser.email
              );
              const likesCount = likes.filter((l) => l.postid._id === item._id);
              return (
                <div key={item._id}>
                  <div
                    className=" col-12 col-md-8 col-lg-5 mx-auto shadow-sm rounded-4 bg-white p-3 border border-1 my-3"

                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <span
                          style={{ width: "40px", height: "40px" }}
                          className="bg-dark rounded-circle text-white d-flex justify-content-center align-items-center fw-bold"
                        >
                          {item.postedBy.at(0).toUpperCase()}
                        </span>
                        <span className="d-flex flex-column">
                          <small className="text-muted">
                            {item.postedBy}
                          </small>
                        </span>
                      </div>

                    </div>
                    <hr />
                    <div>
                      <img src={item.post} alt={item.post} width={"100%"} />
                    </div>
                    <strong>{item.postedBy}</strong>
                    <span className="text-muted"> {item.caption}</span>
                    <hr />
                    <div className="d-flex gap-3 align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <i
                          className={
                            liked
                              ? "fa-solid fa-heart text-danger"
                              : "fa-regular fa-heart"
                          }
                          onClick={() => handleLike(item)}
                        ></i>
                        <span>{likesCount.length}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i
                          className="fa-regular fa-comment"
                          onClick={() => toggleComment(item._id)}
                        ></i>
                        <span>{filteredComments.length}</span>
                      </div>
                    </div>
                    <div className="my-2">
                      {commentsection === item._id &&
                        filteredComments.map((item, index) => {
                          return (
                            <div key={index}>
                              <div className="p-2 my-2 bg-light rounded shadow-sm border border-1">
                                <div className="d-flex align-items-start gap-2 ">
                                  <span
                                    style={{ width: "30px", height: "30px" }}
                                    className="bg-secondary rounded-circle text-white d-flex justify-content-center align-items-center  "
                                  >
                                    {item.author.at(0).toUpperCase()}
                                  </span>
                                  <div className="d-flex flex-column">
                                    <small className="pt-1">
                                      {item.author}
                                    </small>
                                    <span>{item.text}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {commentsection === item._id ? (
                      <Formik
                        initialValues={{
                          text: "",
                          author: currentUser.email,
                          date: `${today}`,
                          postid: item._id,
                        }}
                        onSubmit={handleComment}
                      >
                        <Form>
                          <div className="d-flex gap-2 align-items-center mt-3">
                            <Field
                              name="text"
                              placeholder="write a comment....."
                              className="form-control"
                            ></Field>
                            <button
                              type="submit"
                              className="border border-0 bg-white"
                            >
                              <i className="fa-solid fa-paper-plane"></i>
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    ) : (
                      ""
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>

  )
}

export default Userprofile