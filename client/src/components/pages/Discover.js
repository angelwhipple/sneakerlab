import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import "../../utilities.css";
import "./Discover.css";
import logo from "../../public/sneakerlab.png";
import { get, post } from "../../utilities";
import CollectionDisplay from "../modules/CollectionDisplay";

const Discover = ({ userId, setOnLoginPage }) => {
  const [trending, setTrending] = useState([]);

  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/login/");
    setOnLoginPage(true);
  };

  // on initial mount
  useEffect(() => {
    let trendingShoes = [];
    get("/api/trending").then((trendingProducts) => {
      console.log(trendingProducts);
      for (const shoeObj of trendingProducts) {
        post("/api/createshoe", {
          shoeName: shoeObj.make,
          release: shoeObj.releaseDate,
          colorway: shoeObj.colorway,
          image: shoeObj.thumbnail,
          styleId: shoeObj.styleID,
        }).then(trendingShoes.push(shoeObj.styleID));
      }
    });
    setTrending(trendingShoes);
  }, []);
  console.log(trending);

  // any mount/state change
  useEffect(() => {
    console.log("mounted discover page");
    if (!userId) {
      setOnLoginPage(true);
    }
  });

  return (
    <div>
      {userId ? (
        <>
          <h1 className="u-textCenter">discover</h1>
          <CollectionDisplay name="trending" shoes={trending} />
        </>
      ) : (
        <>
          <div className="centered">
            <img src={logo} width="600" height="150" />
            <div className="u-flex-alignCenter">
              <button className="u-pointer" onClick={routeChange}>
                login/signup
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Discover;
