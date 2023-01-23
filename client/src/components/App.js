import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Discover from "./pages/Discover.js";
import Profile from "./pages/Profile.js";
import NavBar from "./modules/NavBar.js";
import Search from "./pages/Search.js";
import Login from "./pages/Login.js";
import Trade from "./pages/Trade.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [pageLogin, setPageLogin] = useState(false);
  const [navBarPfp, setNavBarPfp] = useState("");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setNavBarPfp(user.pfp);
      }
    });

    return () => {
      setSearchQuery("");
      setSearchResults("");
      setUserResults("");
    };
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Router primary={false}>
        <NavBar
          default
          id={userId}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          setSearch={setSearchQuery}
          onLoginPage={pageLogin}
          navBarPfp={navBarPfp}
        />
      </Router>
      <Router>
        <Discover path="/" userId={userId} setOnLoginPage={setPageLogin} />
        <Profile
          path="/profile/"
          userId={userId}
          handleLogout={handleLogout}
          setNavBarPfp={setNavBarPfp}
        />
        <Login path="/login/" handleLogin={handleLogin} setOnLoginPage={setPageLogin} />
        <Trade path="/trade/" />
        <Search
          path="/search/"
          query={searchQuery}
          results={searchResults}
          setResults={setSearchResults}
          users={userResults}
          setUsers={setUserResults}
          setOnLoginPage={setPageLogin}
          userId={userId}
        />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
