import axios from "axios";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";

const Profile = () => {
  const token = "w3KH694RqiZ64T9M";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [posts, setposts] = useState([]);
  const now = new Date();
  const today =
    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();

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
  const filteredPosts = posts.filter((p) => p.postedBy === currentUser.email);
  const deletePost = (id) => {
    axios
      .delete(` https://generateapi.techsnack.online/api/postImg/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setActiveEllipsis(false);
        fetchPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const [activeEllipsis, setActiveEllipsis] = useState(null);
  const toggleEllipsis = (id) => {
    setActiveEllipsis(activeEllipsis === id ? null : id);
  };

  const [likes, setLikes] = useState([]);
  const fetchLikes = () => {
    axios
      .get("https://generateapi.techsnack.online/api/likes", {
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

  const handleLike = (id) => {
    const liked = likes.find(
      (l) => l.postid === id && l.likedby === currentUser.email,
    );
    if (liked) {
      axios
        .delete(`https://generateapi.techsnack.online/api/likes/${liked._id}`, {
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
          "https://generateapi.techsnack.online/api/likes",
          { postid: id, likedby: currentUser.email },
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
        console.log(res.data.Data);
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
  const [openMenu, setOpenmenu] = useState(false);

  const handleMenu = () => {
    setActiveEllipsis(false);
    setOpenmenu(openMenu === true ? false : true);
  };
  useEffect(() => {
    fetchLikes();
    fetchComment();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div>
      <div>
        <div
          className={
            openMenu
              ? "container d-flex justify-content-between bg-light"
              : "container d-flex justify-content-between bg-white"
          }
        >
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
          <i className="fa-solid fa-bars mt-4" onClick={handleMenu}></i>
        </div>
        {openMenu ? (
          <div
            className="position-fixed bg-white w-100 h-100 p-3 shadow-lg rounded-4"
            style={{ top: "200px" }}
          >
            <div className="d-flex justify-content-center">
              <span
                style={{
                  height: "3px ",
                  width: "50px",
                  background: "gray",
                  borderRadius: "5px",
                }}
              ></span>
            </div>
            <hr className="text-dark" />
            <div
              className="d-flex align-items-center text-danger gap-2 "
              onClick={handleLogout}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            {filteredPosts.length === 0 ? (
              <h3 className="text-center">0 post by {currentUser.username}</h3>
            ) : (
              filteredPosts.map((item, index) => {
                const filteredComments = comments.filter(
                  (c) => c.postid === item._id,
                );
                const liked = likes.find(
                  (l) =>
                    l.postid === item._id && l.likedby === currentUser.email,
                );
                const likesCount = likes.filter((l) => l.postid === item._id);
                return (
                  <div key={index}>
                    <div
                      className=" col-12 col-md-8 col-lg-6 mx-auto shadow-sm rounded-4 bg-white p-3 border border-1 my-3"
                      style={
                        activeEllipsis === item._id
                          ? {
                              filter: "contrast(100%) ",
                              opacity: "0.5",
                            }
                          : { filter: "blur(0px)", opacity: "1" }
                      }
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
                      <div className="d-flex gap-3 align-items-center">
                        <div className="d-flex gap-2 align-items-center">
                          <i
                            className={
                              liked
                                ? "fa-solid fa-heart text-danger"
                                : "fa-regular fa-heart"
                            }
                            onClick={() => handleLike(item._id)}
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
                    {activeEllipsis === item._id ? (
                      <div
                        className="position-fixed bg-white p-3 shadow-lg w-100 h-25 rounded-5"
                        style={{ bottom: "15px", zIndex: "1" }}
                      >
                        <div className="d-flex justify-content-between ">
                          <span style={{ width: "20px" }}></span>
                          <span
                            style={{
                              height: "3px ",
                              width: "50px",
                              background: "black",
                              borderRadius: "3px",
                            }}
                          ></span>
                          <i
                            className="fa-solid fa-xmark"
                            onClick={() => setActiveEllipsis(false)}
                          ></i>
                        </div>
                        <hr />
                        <div
                          className="d-flex align-items-center gap-2 text-danger"
                          onClick={() => deletePost(item._id)}
                        >
                          <i className="fa-solid fa-trash-can text-danger fs-5"></i>
                          <span className="fw-semibold">Delete</span>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
