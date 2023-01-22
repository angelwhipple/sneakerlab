import { get } from "../../utilities";
import React, { useState, useEffect } from "react";
import ShoeListing from "../modules/ShoeListing";

import "./Search.css";
import ProfileCard from "../modules/ProfileCard";

const Search = (props) => {
  const [query, setQuery] = useState("");

  console.log("mounted search results page");
  useEffect(() => {
    setQuery(props.query);
    props.setOnLoginPage(false);
  });

  // only update search results when search query changes
  useEffect(() => {
    get("/api/searchresults", { searchQuery: query }).then((productResults) => {
      props.setResults(productResults);
    });

    get("/api/userresults", { searchQuery: query }).then((userResults) => {
      props.setUsers(userResults);
    });
  }, [query]);
  console.log(props.results);
  console.log(props.users);

  let listings = null;
  if (props.results) {
    listings = props.results.map((shoe) => (
      <ShoeListing
        name={shoe.make}
        release={shoe.releaseDate}
        colorway={shoe.colorway}
        image={shoe.thumbnail}
        prices={shoe.lowestResellPrice}
        links={shoe.resellLinks}
        userId={props.userId}
      />
    ));
  }

  let users = null;
  if (props.users) {
    users = props.users.map((user) => <ProfileCard profileId={user._id} userId={props.userId} />);
  }

  return (
    <div>
      <h2 className="u-textCenter">product results for: {query}</h2>
      {props.results ? (
        <div className="Listing-scroll">{listings}</div>
      ) : (
        <p className="u-textCenter">no products found</p>
      )}
      <h2 className="u-textCenter">users:</h2>
      {props.users ? (
        <div className="Listing-scroll u-flex-justifyCenter">{users}</div>
      ) : (
        <p className="u-textCenter">no users found</p>
      )}
    </div>
  );
};

export default Search;
