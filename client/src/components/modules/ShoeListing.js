import { get, post } from "../../utilities";
import React, { useState, useEffect } from "react";
import "./ShoeListing.css";
import { FaRegHeart } from "react-icons/fa";

import SaveModal from "./SaveModal";

const ShoeListing = (props) => {
  const [saveModal, setSaveModal] = useState(false);
  let buyLinks = [];

  // for saving to user collections
  const [collectionButtons, setCollectionButtons] = useState([]);

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
              });
              setSaveModal(false);
            }}
            className="buy-link u-pointer"
          >
            {collection.name}
          </button>
        ));
        setCollectionButtons(buttons);
      });
    }
  });

  return (
    <div className="u-flexColumn Listing-container">
      <div className="Listing-info">
        <img src={props.image} className="Listing-icon" />
        <div className="Listing-content">
          <div className="Listing-name">{props.name}</div>
          <div className="Listing-colorway">{props.colorway}</div>
          <div className="Listing-release">Release Date: {props.release}</div>
        </div>
      </div>
      <div className="Buy-links-container">
        <div>{buyLinks}</div>
        {/* only display save button/modal if logged in */}
        {props.userId ? (
          <div>
            <button
              onClick={() => {
                setSaveModal(true);
              }}
              className="Listing-heartContainer u-pointer"
            >
              <FaRegHeart />
            </button>
            {saveModal ? (
              <SaveModal
                userId={props.userId}
                buttons={collectionButtons}
                toggleModal={setSaveModal}
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ShoeListing;
