import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import { useNavigate } from "@reach/router";
import "./ShoeListing.css";
import "./CollectionDisplay.css";

/**
 * Component to render a single collection for discover or profile
 * Proptypes
 * @param {string} creator
 * @param {string} name
 * @param {list} shoes
 */
const CollectionDisplay = (props) => {
  const [shoeImages, setShoeImages] = useState([]);

  const navigate = useNavigate();
  const routeSearch = () => {
    navigate("/search/");
  };

  useEffect(() => {
    for (const shoeId of props.shoes) {
      get("/api/getshoe", { id: shoeId }).then((shoe) => {
        let shoeImage = (
          <div className="Shoe-container">
            <button
              className="u-pointer"
              // search shoe on select
              onClick={() => {
                routeSearch();
                props.setSearch(shoe.shoeName);
              }}
            >
              <img className="Listing-icon" src={shoe.image} />
            </button>
          </div>
        );
        setShoeImages((oldShoeImages) => {
          return [...oldShoeImages, shoeImage];
        });
      });
    }
  }, []);

  return (
    <div>
      <div className="Collection-shoeContainer">{shoeImages}</div>
      <h3 className="Collection-name">{props.name}</h3>
    </div>
  );
};

export default CollectionDisplay;
