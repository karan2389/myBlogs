import { formatISO9075 } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./postPage.css";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://myblogs-ko51.onrender.com/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);
 
  if (!postInfo) return "";

  return (
   <div className="post-page container">
     <h1>{postInfo.title}</h1>
     <div className="post-author"> By Karan Sutar</div>
     <time className="time">{formatISO9075(new Date(postInfo.createdAt))}</time>
    <div className="image">
        <img src={`https://myblogs-ko51.onrender.com/${postInfo.file}`} alt="" />
    </div>
   
    <div className="postContent" dangerouslySetInnerHTML={{__html:postInfo.content}} />
   </div>
  );
};

export default PostPage;
