import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import "./addPost.css";
import CreateIcon from '@mui/icons-material/Create';

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch("https://myblogs-ko51.onrender.com/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
  
    <form
      className=" formContainer container"
      onSubmit={createNewPost}
      encType="multipart/form-data"
    >
      <h1> <CreateIcon className="icon" /> Add a New Post!!  </h1>
      <input
        className="formInput"
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        className="formInput"
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        className="formInput2"
        type="file"
        name="file"

        onChange={(ev) => setFiles(ev.target.files)}
      />
      <ReactQuill className="content" value={content} onChange={setContent} />
      <button className="postButton">Create Post</button>
    </form>
    </>
  );
};

export default AddPost;
