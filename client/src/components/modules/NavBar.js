import { Link } from "@reach/router";
import React, { useState, useEffect } from "react";
import { useNavigate } from "@reach/router";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./NavBar.css";
import SearchBar from "./SearchBar";

import logo from "../../public/sneakerlab.png";

const GOOGLE_CLIENT_ID = "577941677274-3aeilnjtp2hj98r8jvcsa6jvkoq9r5kc.apps.googleusercontent.com";

const NavBar = (props) => {
  // return to home onClick logout button
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <nav className="navContainer">
        <Link to="/">
          <img src={logo} height="75" width="250" className="floatLeft u-pointer u-relative" />
        </Link>
        <div className="u-reverseFlex">
          {props.id ? (
            <>
              <button1
                className="u-pointer"
                onClick={() => {
                  googleLogout();
                  props.handleLogout();
                  routeChange();
                }}
              >
                logout
              </button1>
              <Link to="/profile/" className="nav-link">
                profile
              </Link>
              <Link to="/" className="nav-link">
                discover
              </Link>
            </>
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
