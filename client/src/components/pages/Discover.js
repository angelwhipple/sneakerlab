import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import "../../utilities.css";
import "./Discover.css";
import logo from "../../public/sneakerlab.png";
import { get, post } from "../../utilities";
import CollectionDisplay from "../modules/CollectionDisplay";

const Discover = ({ userId, setOnLoginPage, setSearch }) => {
  const [trending, setTrending] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [featuredName, setFeaturedName] = useState({});

  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/login/");
    setOnLoginPage(true);
  };

  // on initial mount
  useEffect(() => {
    get("/api/trending").then((trendingProducts) => {
      let trendingShoes = [];
      for (const shoeObj of trendingProducts) {
        post("/api/createshoe", {
          shoeName: shoeObj.make,
          release: shoeObj.releaseDate,
          colorway: shoeObj.colorway,
          image: shoeObj.thumbnail,
          styleId: shoeObj.styleID,
        }).then(() => {
          trendingShoes.push(shoeObj.styleID);
        });
      }
      setTrending(trendingShoes);
    });
    get("/api/featured").then((collection) => {
      setFeatured(collection.shoes);
      get("/api/getuser", { id: collection.creator }).then((user) => {
        setFeaturedName("featured: " + collection.name + " by " + user.displayName);
      });
    });
  }, []);

  if (userId) {
    get("/api/getuser", { id: userId }).then((user) => {
      setRecentlyViewed(user.clickHistory);
    });
  }

  // any mount/state change
  useEffect(() => {
    if (!userId) {
      setOnLoginPage(true);
    }
  });

  return (
    <div>
      {userId ? (
        <>
          {trending.length > 0 && featured.length > 0 && recentlyViewed.length > 0 ? (
            <>
              <h1 className="u-textCenter">discover</h1>
              <CollectionDisplay name="trending" shoes={trending} setSearch={setSearch} />
              <CollectionDisplay
                name="recently viewed"
                shoes={recentlyViewed}
                setSearch={setSearch}
              />
              <CollectionDisplay name={featuredName} shoes={featured} setSearch={setSearch} />
            </>
          ) : trending.length > 0 && featured.length > 0 ? (
            <>
              <h1 className="u-textCenter">discover</h1>
              <CollectionDisplay name="trending" shoes={trending} setSearch={setSearch} />
              <CollectionDisplay name={featuredName} shoes={featured} setSearch={setSearch} />
            </>
          ) : (
            <div className="centered">loading discover page...</div>
          )}
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
