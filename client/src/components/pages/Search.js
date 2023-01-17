import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";

const Search = (props) => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  console.log("mounted search results page");
  useEffect(() => {
    get("/api/whoami").then((user) => {
      setName(user.displayName);
      setQuery(props.searchQuery);
    });
  });

  return (
    <div className="centered">
      <p>user: {name}</p>
      <p>id: {props.id}</p>
      <p>search query: {query}</p>
    </div>
  );
};

export default Search;
