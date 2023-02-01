import { get } from "../../utilities";
import React, { useState, useEffect } from "react";
import ShoeListing from "../modules/ShoeListing";
import { FiUser } from "react-icons/fi";
import { TbShoe } from "react-icons/tb";
import "./Search.css";
import ProfileCard from "../modules/ProfileCard";
import { socket } from "../../client-socket";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const [showProducts, setShowProducts] = useState(true);
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
      <div className="resultsContainer">
        {showProducts == true ? (
          <>
            <h2 className="u-textCenter">product results for: {query}</h2>
            {products.length > 0 ? (
              <div className="Search-scroll">{products}</div>
            ) : (
              <p className="u-textCenter">fetching search results...</p>
            )}
          </>
        ) : (
          <>
            {props.userId && query ? (
              <>
                <h2 className="u-textCenter">user results for:</h2>
                {users.length > 0 ? (
                  <div className="Search-scroll">{users}</div>
                ) : (
                  <p className="u-textCenter">no users to display</p>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>

      <div className="filterBarContainer filterBar">
        <div className="u-textCenter">filter by:</div>

        <div className="filterCriteria">category</div>
        <div className="criteriaContainer">
          <div className="u-flex">
            <button2
              className="u-pointer categoryCriteria"
              onClick={() => {
                setShowProducts(true);
              }}
            >
              {showProducts == true ? (
                <TbShoe size="1x" strokeWidth="2px" className="filterIcon" />
              ) : (
                <TbShoe size="1x" strokeWidth="1px" className="filterIcon" />
              )}
            </button2>
            <button2
              className="u-pointer categoryCriteria"
              onClick={() => {
                setShowProducts(false);
              }}
            >
              {showProducts == false && props.userId ? (
                <FiUser size="1x" strokeWidth="2px" className="filterIcon" />
              ) : (
                <FiUser size="1x" strokeWidth="1px" className="filterIcon" />
              )}
            </button2>
          </div>
        </div>

        <div className="filterCriteria">size (US mens')</div>
        <div className="criteriaContainer sizeCriteria">
          <input type="checkbox" id="5" />
          <label for="5">5</label>
          <input type="checkbox" id="5.5" />
          <label for="5.5">5.5</label>
          <input type="checkbox" id="6" />
          <label for="6">6</label>
          <input type="checkbox" id="6.5" />
          <label for="6.5">6.5</label>
          <input type="checkbox" id="7" />
          <label for="7">7</label>
          <input type="checkbox" id="7.5" />
          <label for="7.5">7.5</label>
          <input type="checkbox" id="8" />
          <label for="8">8</label>
          <input type="checkbox" id="8.5" />
          <label for="8.5">8.5</label>
        </div>

        <div className="filterCriteria">colorway</div>
        <div className="criteriaContainer">
          <input type="checkbox" id="white" className="colorwayCriteria white" />
          <input type="checkbox" id="black" className="colorwayCriteria black" />
          <input type="checkbox" id="brown" className="colorwayCriteria brown" />
          <input type="checkbox" id="red" className="colorwayCriteria red" />
          <input type="checkbox" id="orange" className="colorwayCriteria orange" />
          <input type="checkbox" id="yellow" className="colorwayCriteria yellow" />
          <input type="checkbox" id="green" className="colorwayCriteria green" />
          <input type="checkbox" id="blue" className="colorwayCriteria blue" />
          <input type="checkbox" id="purple" className="colorwayCriteria purple" />
        </div>

        <div className="filterCriteria">price range</div>
        <div className="priceCriteria">
          <input type="range" min="0" max="1000" className="priceMin" />
          <input type="range" min="0" max="1000" className="priceMax" />
        </div>

        <input type="reset" className="button"></input>
        <input type="submit" className="button"></input>
      </div>
    </div>
  );
};

export default Search;
