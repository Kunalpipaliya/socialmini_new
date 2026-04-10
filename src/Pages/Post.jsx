import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

const Post = () => {
  const token = "w3KH694RqiZ64T9M";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [posts, setPosts] = useState([]);

  const initialValues = {
    post: null,
    caption: "",
    postedBy: currentUser?.email || "",
  };

  const fetchPost = () => {
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
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handlePosts = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("post", values.post);
    formData.append("caption", values.caption);
    formData.append("postedBy", values.postedBy);

    axios
      .post("https://generateapi.techsnack.online/api/postImg", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        resetForm();
        fetchPost();
        console.log(posts);

        window.location.href = "/profile";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center container"
      style={{ height: "80vh" }}
    >
      <div className="col-12 col-md-6 col-lg-6">
        <Formik initialValues={initialValues} onSubmit={handlePosts}>
          {({ setFieldValue }) => (
            <Form
              className="  m-auto p-3 rounded shadow-sm"
              encType="multipart/form-data"
            >
              <div className="form-group mb-2">
                <label className="form-label">Post</label>
                <input
                  className="form-control"
                  name="post"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("post", event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Caption</label>
                <Field
                  name="caption"
                  className="form-control"
                  placeholder="caption..."
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Post
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Post;
