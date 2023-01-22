import { Link } from "@reach/router";
import React, { useState, useEffect } from "react";
import { useNavigate } from "@reach/router";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./NavBar.css";
import SearchBar from "./SearchBar";

import logo from "../../public/sneakerlab.png";
import { get } from "../../utilities";

const GOOGLE_CLIENT_ID = "577941677274-3aeilnjtp2hj98r8jvcsa6jvkoq9r5kc.apps.googleusercontent.com";

const NavBar = (props) => {
  const [pfp, setPfp] = useState("");

  // navigate to profile onClick pfp
  const routeProfile = () => {
    navigate("/profile/");
  };

  useEffect(() => {
    if (props.id) {
      get("/api/whoami").then((user) => {
        setPfp(user.pfp);
      });
    }
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <nav className="navContainer ">
        {props.id ? (
          <Link to="/">
            <img src={logo} className="logo-icon floatLeft u-pointer u-relative" />
          </Link>
        ) : (
          <></>
        )}
        <div className="u-reverseFlex">
          {props.id ? (
            <>
              <button1 onClick={routeProfile} className="nav-link u-pointer">
                <img src={pfp} className="profile-icon" />
              </button1>
              <Link to="/" className="nav-link">
                discover
              </Link>
              <Link to="/trade/" className="nav-link">
                trade
              </Link>
            </>
          ) : props.onLoginPage ? (
            <></>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
          )}
          <SearchBar id={props.id} setSearch={props.setSearch} />
        </div>
      </nav>
    </GoogleOAuthProvider>
  );
};

export default NavBar;
