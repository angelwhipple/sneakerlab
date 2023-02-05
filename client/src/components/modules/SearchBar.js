import React, { useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { post } from "../../utilities";
import "./SearchBar.css";
import "./NavBar.css";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const DEFAULT_TEXT = "";

  // mount search bar w/ empty field
  useEffect(() => {
    setQuery(DEFAULT_TEXT);

    // dismount/cleanup callback
    return () => {
      setQuery(DEFAULT_TEXT);
    };
  }, []);

  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/search/");
  };

  // called when user types in search box
  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  // called when user hits "search"
  const handleSearch = (event) => {
    event.preventDefault();

    // save to user's recent searches, emit search query
    const body = { id: props.id, searchQuery: query };

    post("/api/search", body);

    // set overall app search query state
    props.setSearch(query);
    setQuery(DEFAULT_TEXT);

    // set navbar highlights
    props.setSearchBar(true);
    props.setDiscover(false);
    props.setProfile(false);
    props.setTrade(false);

    // navigate to search results component
    routeChange();
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={query}
        value={query}
        onChange={handleInput}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch(event);
          }
        }}
        className="search-input"
      />
      {props.searchBar ? (
        <button
          type="submit"
          onClick={handleSearch}
          className="search-button-selected u-pointer"
          value="Submit"
        >
          search
        </button>
      ) : (
        <button
          type="submit"
          onClick={handleSearch}
          className="search-button u-pointer"
          value="Submit"
        >
          search
        </button>
      )}
    </div>
  );
};

export default SearchBar;
