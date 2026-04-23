import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Link } from "@mui/material";
import { Field, Form, Formik } from "formik";
import axios from "axios";
const Messages = () => {
  const token = "w3KH694RqiZ64T9M";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { userEmail } = useParams();
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const today =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  const [messages, setmessages] = useState([]);
  const fetchMessages = () => {
    axios
      .get("https://generateapi.techsnack.online/api/messages", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setmessages(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChat = (values, { resetForm }) => {
    // 1. Create a new FormData object
    const formData = new FormData();

    // 2. Append all your fields
    formData.append("sender", values.sender);
    formData.append("reciever", values.reciever); // Verify if backend wants "receiver" instead
    formData.append("message", values.message);
    formData.append("time", values.time);
    formData.append("date", values.date);

    // 3. Send the request
    axios
      .post("https://generateapi.techsnack.online/api/messages", formData, {
        headers: {
          Authorization: token,
          // When sending FormData, Axios usually sets the Content-Type
          // to 'multipart/form-data' automatically, but you can be explicit:
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("Message sent successfully");
        resetForm(); // Clears the input field for the next message
      })
      .catch((err) => {
        // Improved error logging to see the validation details
        console.error("Submission Error:", err.response?.data || err.message);
      });
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const filteredMessages = messages.filter(
    (m) =>
      (m.sender === currentUser.email && m.reciever === userEmail) ||
      (m.sender === userEmail && m.reciever === currentUser.email),
  );
  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <div className="p-3  bg-white border border-top-0 border-end-0 border-start-0 border-bottom-2 ">
        <div className="d-flex gap-2 align-items-center ">
          <Link href="/chat">
            <i className="fa-solid fa-arrow-left text-dark"></i>
          </Link>
          <div className="d-flex align-items-center gap-2">
            <strong
              className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              {userEmail.at(0).toUpperCase()}
            </strong>
            <strong>{userEmail}</strong>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column gap-2 mt-3 pb-5">
        {" "}
        {/* pb-5 to prevent keyboard overlap */}
        {filteredMessages.map((item, index) => {
          const isCurrentUser = item.sender === currentUser.email;

          return (
            <div
              key={item._id}
              className={`d-flex flex-column p-2 rounded shadow-sm ${
                isCurrentUser
                  ? "bg-info text-white align-self-end" // Your messages: Blue and Right
                  : "bg-white text-dark align-self-start" // Their messages: White and Left
              }`}
              style={{
                maxWidth: "75%",
                minWidth: "100px",
                borderRadius: isCurrentUser
                  ? "15px 15px 0px 15px"
                  : "15px 15px 15px 0px",
              }}
            >
              <span className="mb-1">{item.message}</span>
              <span
                className={`text-end ${isCurrentUser ? "text-white-50" : "text-muted"}`}
                style={{ fontSize: "10px" }}
              >
                {item.time}
              </span>
            </div>
          );
        })}
        <Formik
          initialValues={{
            sender: currentUser.email,
            reciever: userEmail,
            message: "",
            time: hour + ":" + min,
            date: `${today}`,
          }}
          onSubmit={handleChat}
        >
          <Form
            style={{
              position: "fixed",
              bottom: "15px",
              left: "15px",
              right: "15px",
            }}
          >
            <div className="d-flex gap-2">
              <Field
                className="form-control"
                type="text"
                name="message"
                placeholder="Type message here..."
              ></Field>
              <button type="submit" className="border-0 bg-transparent  text-primary">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Messages;
