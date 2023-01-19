import React from "react";
import "./ShoeListing.css";

const ShoeListing = (props) => {
  let buyLinks = [];
  // check for non-null price object first
  if (props.prices) {
    // create buttons redirecting to purchase links
    for (const [reseller, price] of Object.entries(props.prices)) {
      let link = props.links[reseller];
      buyLinks.push(
        <a href={link}>
          <button className="buy-link u-pointer">
            {reseller} : ${price}
          </button>
        </a>
      );
    }
  }

  return (
    <div className="u-inlineFlex Listing-container Listing-card">
      <img src={props.image} className="Listing-icon" width="100" height="100" />
      <div className="u-flexColumn">
        <h3>{props.name}</h3>
        <p className="Listing-colorway">{props.colorway}</p>
        <p className="Listing-release">Release: {props.release}</p>
      </div>
      <div className="u-flexColumn u-flex-alignCenter Buy-links-container">{buyLinks}</div>
    </div>
  );
};

export default ShoeListing;
