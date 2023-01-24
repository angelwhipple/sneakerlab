import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import "../pages/Search.css";
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

  useEffect(() => {
    console.log("mounted collection display");
    console.log(props.shoes);
    let shoePics = [];
    for (const shoeId of props.shoes) {
      get("/api/getshoe", { id: shoeId }).then((shoe) => {
        console.log(shoe);
        shoePics.push(
          <div className="Shoe-container">
            <img className="Listing-icon" src={shoe.image} />
          </div>
        );
      });
    }
    setShoeImages(shoePics);
  }, []);

  return (
    <div>
      <div className="Listing-scroll Collection-shoeContainer">{shoeImages}</div>
      <h3 className="Collection-name">{props.name}</h3>
    </div>
  );
};

export default CollectionDisplay;
