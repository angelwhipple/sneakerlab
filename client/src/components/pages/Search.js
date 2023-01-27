import { get } from "../../utilities";
import React, { useState, useEffect } from "react";
import ShoeListing from "../modules/ShoeListing";
import "./Search.css";
import ProfileCard from "../modules/ProfileCard";
import { socket } from "../../client-socket";

const Search = (props) => {
  const [query, setQuery] = useState("");
  let products = null;
  let users = null;
  // const [products, setProducts] = useState([]);
  // const [users, setUsers] = useState([]);

  console.log("mounted search results page");
  useEffect(() => {
    setQuery(props.query);
    props.setOnLoginPage(false);
  });

  // listen for search query emission
  // socket.on("newsearch", (newSearch) => {
  //   console.log(newSearch);
  //   setQuery(newSearch);
  //   get("/api/searchresults", { searchQuery: newSearch }).then((productResults) => {
  //     temp_products = productResults;
  //   });
  //   console.log(temp_products);
  //   if (newSearch) {
  //     get("/api/userresults", { searchQuery: query }).then((userResults) => {
  //       temp_users = userResults;
  //     });
  //   }
  //   let listingCards = temp_products.map((shoe) => (
  //     <ShoeListing
  //       name={shoe.make}
  //       release={shoe.releaseDate}
  //       colorway={shoe.colorway}
  //       image={shoe.thumbnail}
  //       prices={shoe.lowestResellPrice}
  //       links={shoe.resellLinks}
  //       styleId={shoe.styleID}
  //       userId={props.userId}
  //     />
  //   ));
  //   setProducts(listingCards);
  //   let userCards = temp_users.map((user) => (
  //     <ProfileCard
  //       profileId={user._id}
  //       userId={props.userId}
  //       setCurrentProfileId={props.setCurrentProfileId}
  //     />
  //   ));
  //   setUsers(userCards);
  // });

  // only update search results when search query changes
  useEffect(() => {
    get("/api/searchresults", { searchQuery: query }).then((productResults) => {
      props.setResults(productResults);
    });

    if (query) {
      get("/api/userresults", { searchQuery: query }).then((userResults) => {
        props.setUsers(userResults);
      });
    }
  }, [query]);
  console.log(props.results);

  if (props.results) {
    products = props.results.map((shoe) => (
      <ShoeListing
        name={shoe.make}
        release={shoe.releaseDate}
        colorway={shoe.colorway}
        image={shoe.thumbnail}
        prices={shoe.lowestResellPrice}
        links={shoe.resellLinks}
        styleId={shoe.styleID}
        userId={props.userId}
      />
    ));
  }

  if (props.users) {
    users = props.users.map((user) => (
      <ProfileCard
        profileId={user._id}
        userId={props.userId}
        setCurrentProfileId={props.setCurrentProfileId}
      />
    ));
  }

  return (
    <div>
      <h2 className="u-textCenter">product results for: {query}</h2>
      {products.length > 0 ? (
        <div className="Search-scroll">{products}</div>
      ) : (
        <p className="u-textCenter">no results to display</p>
      )}
      {props.userId && query ? (
        <>
          <h2 className="u-textCenter">users:</h2>
          {users.length > 0 ? (
            <div className="Search-scroll">{users}</div>
          ) : (
            <p className="u-textCenter">no users to display</p>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
