import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context api/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import "./header.css";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://myblogs-ko51.onrender.com/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("https://myblogs-ko51.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <main className="hcontainer">
      <header>
        <Link to="/" className="logo">
          Auto<span className="car">Thrust.</span>
        </Link>
        <nav className="headerNav">
          {username && (
            <>
              <Link to ="/create">
              <CreateIcon className="headerIcon"  />
              </Link>
              <Link className="headerButton" to="/create">
                {" "}
                New Post
              </Link>
              <LogoutIcon className="headerIcon" onClick={logout} />
              <Link className="headerLink" onClick={logout}>
                {" "}
                Logout
              </Link>
            </>
          )}
          {!username && (
            <>
            <Link to ="/login">
              <LoginIcon className="headerIcon"  />
              </Link>
              <Link className="headerButton" to="/login">
                Login
              </Link>
              <Link to ="/register">
              <VpnKeyIcon className="headerIcon"  />
              </Link>
              <Link className="headerButton" to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </main>
  );
};

export default Header;
