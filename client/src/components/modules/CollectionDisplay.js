import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import "../pages/Search.css";
import "./ShoeListing.css";

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
    let shoePics = [];
    for (const shoeId of props.shoes) {
      get("/api/getshoe", { id: shoeId }).then((shoe) => {
        shoePics.push(<img className="Listing-icon" src={shoe.image} />);
      });
    }
    setShoeImages(shoePics);
  }, []);

  return (
    <div>
      <p>{props.name}</p>
      <div className="Listing-scroll">{shoeImages}</div>
    </div>
  );
};

export default CollectionDisplay;
