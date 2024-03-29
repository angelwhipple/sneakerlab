import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import { get, post } from "../../utilities";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./NavBar.css";
import SearchBar from "./SearchBar";
import logo from "../../public/sneakerlab.png";
import { socket } from "../../client-socket";

const GOOGLE_CLIENT_ID = "577941677274-3aeilnjtp2hj98r8jvcsa6jvkoq9r5kc.apps.googleusercontent.com";

const NavBar = (props) => {
  const [pfp, setPfp] = useState("");
  const [trade, setTrade] = useState(false);
  const [discover, setDiscover] = useState(true);
  const [profile, setProfile] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  // always get current user's pfp
  if (props.id) {
    get("/api/getuser", { id: props.id }).then((user) => {
      setPfp(user.pfp);
    });
  }

  socket.on("setpfp", (user) => {
    setPfp(user.pfp);
  });

  // return to home onClick logout button
  const navigate = useNavigate();
  const routeProfile = () => {
    props.setCurrentProfileId(props.id);
    post("/api/changeprofile", { newId: props.id });
    navigate("/profile/");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <nav className="navContainer">
        {props.id ? (
          <Link to="/">
            <img src={logo} className="logo-icon u-pointer" />
          </Link>
        ) : (
          <></>
        )}
        <div className="ml-auto u-reverseFlex">
          {props.id ? (
            <>
              {profile ? (
                <button
                  onClick={() => {
                    routeProfile();
                    setProfile(true);
                    setTrade(false);
                    setDiscover(false);
                    setSearchBar(false);
                  }}
                  className="nav-link-selected button1 u-pointer"
                >
                  <img src={pfp} className="profile-icon" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    routeProfile();
                    setProfile(true);
                    setTrade(false);
                    setDiscover(false);
                    setSearchBar(false);
                  }}
                  className="nav-link button1 u-pointer"
                >
                  <img src={pfp} className="profile-icon" />
                </button>
              )}
              {discover ? (
                <Link
                  to="/"
                  onClick={() => {
                    setDiscover(true);
                    setProfile(false);
                    setTrade(false);
                    setSearchBar(false);
                  }}
                  className="nav-link-selected"
                >
                  discover
                </Link>
              ) : (
                <Link
                  to="/"
                  onClick={() => {
                    setDiscover(true);
                    setProfile(false);
                    setTrade(false);
                    setSearchBar(false);
                  }}
                  className="nav-link"
                >
                  discover
                </Link>
              )}
              {trade ? (
                <Link
                  to="/trade/"
                  onClick={() => {
                    setTrade(true);
                    setProfile(false);
                    setDiscover(false);
                    setSearchBar(false);
                  }}
                  className="nav-link-selected"
                >
                  trade
                </Link>
              ) : (
                <Link
                  to="/trade/"
                  onClick={() => {
                    setTrade(true);
                    setProfile(false);
                    setDiscover(false);
                    setSearchBar(false);
                  }}
                  className="nav-link"
                >
                  trade
                </Link>
              )}
            </>
          ) : props.onLoginPage ? (
            <></>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
          )}
          <SearchBar
            id={props.id}
            setSearch={props.setSearch}
            searchBar={searchBar}
            setSearchBar={setSearchBar}
            setTrade={setTrade}
            setProfile={setProfile}
            setDiscover={setDiscover}
          />
        </div>
      </nav>
    </GoogleOAuthProvider>
  );
};

export default NavBar;
