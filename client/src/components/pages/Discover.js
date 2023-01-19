import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";

import "../../utilities.css";
import "./Discover.css";
import logo from "../../public/sneakerlab.png";

const Discover = ({ userId, setOnLoginPage }) => {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/login/");
    setOnLoginPage(true);
  };

  useEffect(() => {
    console.log("mounted discover page");
  });

  return (
    <div>
      {userId ? (
        <h1 className="u-textCenter">Discover</h1>
      ) : (
        <>
          <div class="centered">
            <img src={logo} width="600" height="150" />
            <div className="u-flex-alignCenter">
              <button className="u-pointer" onClick={routeChange}>
                login
              </button>
              <button className="u-pointer" onClick={routeChange}>
                signup
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Discover;
