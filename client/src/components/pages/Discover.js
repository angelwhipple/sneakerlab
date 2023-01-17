import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import "../../utilities.css";
import "./Discover.css";
import logo from "../../public/sneakerlab.png";
import { get } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "577941677274-3aeilnjtp2hj98r8jvcsa6jvkoq9r5kc.apps.googleusercontent.com";

const Discover = ({ userId, handleLogin }) => {
  const [lastSearch, setLastSearch] = useState("");

  useEffect(() => {
    console.log("mounted discover page");

    if (userId) {
      get("/api/whoami").then((user) => {
        if (user.searches) {
          // get last elem of search history
          setLastSearch(user.searches.pop());
          console.log("updated last search query");
        } else {
          console.log("no user search history");
        }
      });
    }
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        lastSearch ? (
          <div class="centered">
            <p>User logged in, last search: {lastSearch}</p>
          </div>
        ) : (
          <div class="centered">
            <p>User logged in, no last known search</p>
          </div>
        )
      ) : (
        <>
          <div class="centered">
            <img src={logo} width="600" height="150" />
            <div className="u-flex-alignCenter">
              <button
                className="u-pointer"
                onClick={() => {
                  useGoogleLogin({
                    onSuccess: handleLogin(),
                    onError: (err) => {
                      console.log(err);
                    },
                  });
                }}
              >
                login
              </button>
              <button className="u-pointer">signup</button>
            </div>
          </div>
          <h1>Good luck on your project :)</h1>
          <h2>How to go from this skeleton to our actual app</h2>
          <a href="https://docs.google.com/document/d/110JdHAn3Wnp3_AyQLkqH2W8h5oby7OVsYIeHYSiUzRs/edit?usp=sharing">
            Check out this getting started guide
          </a>
        </>
      )}
    </GoogleOAuthProvider>
  );
};

export default Discover;
