import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import "./TradeListing.css";
import { BiReply } from "react-icons/bi";

const TradeListing = (props) => {
  const [creatorName, setCreatorName] = useState("");

  useEffect(() => {
    get("/api/getuser", { id: props.creator }).then((user) => {
      setCreatorName(user.displayName);
    });
  }, []);

  return (
    <div className="TradeListing-container">
      <div className="u-flexColumn">
        <p className="u-textCenter Trade-shoename">posted by: {creatorName}</p>
        <div className="u-flex u-flex-justifyCenter">
          <img src={props.details.image} className="TradeListing-icon" />
          <button
            onClick={() => {
              props.setViewListings(false);
              props.setPostOrReply(props.tradeId);
              props.setMakeListing(true);
            }}
            className="u-pointer replyButton-Container"
          >
            <BiReply />
          </button>
        </div>
        <div className="TradeListing-infoColumns">
          <div className="TradeListing-info">
            <p className="Trade-shoename">{props.details.shoeName}</p>
            <p className="TradeListing-colorway">
              size {props.details.size}, {props.details.colorway}
            </p>
          </div>
          <div className="TradeListing-info">
            <p className="Trade-shoename">{props.details.brand}</p>
            <p className="TradeListing-colorway">retail: {props.details.retail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeListing;
