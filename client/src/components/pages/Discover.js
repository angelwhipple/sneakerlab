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
        </>
      )}
    </GoogleOAuthProvider>
  );
};

export default Discover;
