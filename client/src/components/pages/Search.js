import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";
import ShoeListing from "../modules/ShoeListing";

const Search = (props) => {
  const [query, setQuery] = useState("");

  console.log("mounted search results page");
  useEffect(() => {
    setQuery(props.query);
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
    listings = props.results.map((shoe) => {
      <ShoeListing
        name={shoe.make}
        release={shoe.releaseDate}
        colorway={shoe.colorway}
        image={shoe.thumbnail}
        prices={shoe.lowestResellPrice}
        links={shoe.resellLinks}
      />;
    });
  }
  console.log(listings);

  return (
    <div>
      <h2 className="u-textCenter">Showing results for: {query}</h2>
      <div>{listings}</div>
    </div>
  );
};

export default Search;
