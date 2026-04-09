import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

const Home = () => {
  const token = "w3KH694RqiZ64T9M";
  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || "Guest";
  const [posts, setposts] = useState([]);
  const now = new Date();
  const today =
    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();

  const [comments, setComments] = useState([]);
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
  const [commentsection, setCommentsection] = useState(null);
  const toggleComment = (id) => {
    setCommentsection(commentsection === id ? null : id);
  };

  const handleComment = (values) => {
    if (currentUser === "Guest") {
      alert("You can't Comment a post without Login!")
      window.location.href="/login"
    } else {
      axios
        .post("https://generateapi.techsnack.online/api/comments", values, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          fetchPost();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      if (currentUser === "Guest") {
        alert("without login you can't like a post");
        window.location.href = "/login";
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
    }
  };

  useEffect(() => {
    fetchPost();
    fetchLikes();
  }, []);
  return (
    <div className="mb-5 mt-2">
      {posts.map((item, index) => {
        const filteredComments = comments.filter((c) => c.postid === item._id);
        const liked = likes.find(
          (l) => l.postid === item._id && l.likedby === currentUser.email,
        );
        const likesCount = likes.filter((l) => l.postid === item._id);
        return (
          <div key={index}>
            <div className="w-md-50  w-100 m-auto shadow-sm rounded-4 bg-white p-3 border border-1 my-3">
              <div className="d-flex gap-2 align-items-center">
                <span
                  style={{ width: "40px", height: "40px" }}
                  className="bg-dark border border-1 rounded-circle text-white d-flex justify-content-center align-items-center fw-bold"
                >
                  {item.postedBy.at(0).toUpperCase()}
                </span>
                <span className="d-flex flex-column">
                  <small className="text-muted">{item.postedBy}</small>
                </span>
              </div>
              <hr />
              <div>
                <img src={item.post} alt={item.post} width={"100%"} />
              </div>
              <strong>{item.postedBy}</strong>
              <span className="text-muted"> {item.caption}</span>
              <hr />
              <div className="d-flex align-items-center gap-3">
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
                              <small className="pt-1">{item.author}</small>
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
      })}
    </div>
  );
};

export default Home;
