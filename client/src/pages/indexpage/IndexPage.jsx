import React, { useEffect, useState } from "react";
import Post from "../../components/posts/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://myblogs-ko51.onrender.com/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return <div>{posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}</div>;
};

export default IndexPage;
