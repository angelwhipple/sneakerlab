import { get, post } from "../../utilities";
import React, { useState, useEffect } from "react";
import "./ShoeListing.css";
import { FaRegHeart } from "react-icons/fa";

const ShoeListing = (props) => {
  let buyLinks = [];

  // check for non-null price object first
  if (props.prices) {
    // create buttons redirecting to purchase links
    for (const [reseller, price] of Object.entries(props.prices)) {
      let link = props.links[reseller];
      buyLinks.push(
        <a href={link} target="_blank">
          <button
            onClick={() => {
              post("/api/savetoclickhistory", {
                id: props.userId,
                shoeName: props.name,
                release: props.release,
                colorway: props.colorway,
                image: props.image,
                styleId: props.styleId,
              });
            }}
            className="buy-link u-pointer"
          >
            {reseller} : ${price}
          </button>
        </a>
      );
    }
  }

  // generate user collection buttons on any mount/state change
  useEffect(() => {
    if (props.userId) {
      get("/api/usercollections", { id: props.userId }).then((collections) => {
        let buttons = collections.map((collection) => (
          <button
            onClick={() => {
              post("/api/savetocollection", {
                id: props.userId,
                collectionName: collection.name,
                shoeName: props.name,
                release: props.release,
                colorway: props.colorway,
                image: props.image,
                styleId: props.styleId,
              });
              props.setSaveModal(false);
            }}
            className="buy-link u-pointer"
          >
            {collection.name}
          </button>
        ));
        props.setCollectionButtons(buttons);
      });
    }
  });

  return (
    <div className="u-flexColumn Listing-container">
      <div className="u-flex">
        <img src={props.image} className="Listing-icon" />
        <div className="Buy-links-container">{buyLinks}</div>
      </div>
      <div className="Listing-info">
        <div className="Listing-name">{props.name}</div>
        <div className="Listing-colorway">{props.colorway}</div>
        <div className="Listing-release">Release Date: {props.release}</div>
        {props.userId ? (
          <div className="u-relative">
            <button
              onClick={() => {props.setSaveModal(true);}}
              className="Listing-heartContainer u-pointer"
            >
              <FaRegHeart />
            </button>
          </div>
        ) : (<></>)}
      </div>
    </div>
  );
};

export default ShoeListing;
