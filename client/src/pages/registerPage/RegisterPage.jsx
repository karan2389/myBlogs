import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./registerPage.css"

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("https://myblogs-ko51.onrender.com/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if(response.status === 200){
      alert("registration successful!!")
      setRedirect(true);
    }else{
      alert("registration failed!!!")
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
 
  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1>REGISTER</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>REGISTER</button>
        <div className="loginPage">
        Don't have an account     <Link className="link" to="/login"> Sign Up </Link> 
      </div>
      </form>
    </div>
  );
};

export default RegisterPage;
