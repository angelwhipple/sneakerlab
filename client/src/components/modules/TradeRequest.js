import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { BiX, BiCheck } from "react-icons/bi";
import "./TradeListing.css";

const TradeRequest = (props) => {
  const [creatorName, setCreatorName] = useState("");
  const [originalTradeCreator, setOriginalTradeCreator] = useState("");

  // initial mount
  useEffect(() => {
    get("/api/getuser", { id: props.creator }).then((user) => {
      setCreatorName(user.displayName);
    });
    get("/api/gettrade", { tradeId: props.originalTradeId }).then((trade) => {
      setOriginalTradeCreator(trade.creator);
    });
  }, []);

  return (
    <div className="TradeListing-container">
      <div className="u-flexColumn">
        <p className="u-textCenter Trade-shoename">trade request from: {creatorName}</p>
        <div className="u-flex u-flex-justifyCenter">
          <img src={props.details.image} className="TradeListing-icon" />
          <button
            className="u-pointer"
            onClick={() => {
              post("/api/accepttrade", {
                originalTrade: props.originalTradeId,
                requestId: props.requestId,
                creator: props.creator,
                originalTradeCreator: originalTradeCreator,
              });
              props.setViewTrades(false);
              props.setListingPage(false);
              props.setMessagePage(true);
            }}
          >
            <BiCheck />
          </button>
          <button className="u-pointer">
            <BiX />
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
            <p className="TradeListing-colorway">retail: ${props.details.retail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeRequest;
