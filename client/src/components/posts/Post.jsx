import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import "./post.css";

const post = ({ _id, title, summary, content, file, createdAt }) => {
  return (
    <div>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={"https://myblogs-ko51.onrender.com/" + file} alt="" />
          </Link>
        </div>

        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a href="/" className="author">
              Karan Sutar
            </a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
      <hr className="postHr" />
    </div>
  );
};

export default post;
