import { get } from "../../utilities";
import React, { useState, useEffect } from "react";
import ShoeListing from "../modules/ShoeListing";

import "./Search.css";

const Search = (props) => {
  const [query, setQuery] = useState("");

  console.log("mounted search results page");
  useEffect(() => {
    setQuery(props.query);
    props.setOnLoginPage(false);
  });

  // only update search results when search query changes
  useEffect(() => {
    get("/api/searchresults", { searchQuery: query }).then((searchResults) => {
      props.setResults(searchResults);
    });
  }, [query]);
  console.log(props.results);

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

  return (
    <div>
      <h2 className="u-textCenter">search results for: {query}</h2>
      <div className="Listing-scroll">{listings}</div>
    </div>
  );
};

export default Search;
