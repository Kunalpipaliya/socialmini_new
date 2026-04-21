import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { userEmail } = useParams();

  return (
    <div>
      hey ! {currentUser.username} chat with{" "}
      {currentUser.email === userEmail ? "yourself" : userEmail}
    </div>
  );
};

export default Messages;
