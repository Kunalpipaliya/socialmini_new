import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Notification = () => {
  const token="w3KH694RqiZ64T9M"
  const [like,setLike]=useState()
  const fetchLikes=()=>{
    axios.get('https://generateapi.techsnack.online/api/like',{
      headers:{
        Authorization:token
      }
    })
    .then((res)=>{
      console.log(res.data.Data);
      
      setLike(res.data.Data)
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }
  useEffect(()=>{
    fetchLikes()
  },[])
  return (
    <div>
        {
          {like}
        }
    </div>
  )
}

export default Notification
