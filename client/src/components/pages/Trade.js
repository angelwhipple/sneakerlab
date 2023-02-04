import React, { useState, useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { FaList } from "react-icons/fa";
import { get, post } from "../../utilities";
import TradeListing from "../modules/TradeListing";
import TradeRequest from "../modules/TradeRequest";
import ChatPreview from "../modules/ChatPreview";
import ChatView from "../modules/ChatView";
import { socket } from "../../client-socket";
import PostTrade from "../modules/PostTrade";
import "./Trade.css";

const Trade = (props) => {
  // dynamic display variables
  const [messagePage, setMessagePage] = useState(false);
  const [listingPage, setListingPage] = useState(true);
  const [makeListing, setMakeListing] = useState(false);
  const [viewListings, setViewListings] = useState(true);
  const [viewTrades, setViewTrades] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");

  // content variables
  const [tradeRequests, setTradeRequests] = useState([]);
  const [tradeListings, setTradeListings] = useState([]);
  const [chats, setChats] = useState([]);

  // either set to "post" or the trade listing ID being replied to
  const [postOrReply, setPostOrReply] = useState("post");

  const getTradeRequests = () => {
    get("/api/traderequests", { creator: props.userId }).then((tradeRequests) => {
      if (tradeRequests.length == 0) {
        setTradeRequests("no trade requests");
      } else {
        let requestCards = tradeRequests.map((request) => (
          <TradeRequest
            requestId={request._id}
            creator={request.creator}
            details={request.details}
            status={request.status}
            originalTradeId={request.originalTrade}
            setViewTrades={setViewTrades}
            setMessagePage={setMessagePage}
            setListingPage={setListingPage}
          />
        ));
        setTradeRequests(requestCards);
      }
    });
    setViewTrades(true);
    setMakeListing(false);
    setViewListings(false);
  };

  socket.on("newtrade", (trade) => {
    get("/api/tradelistings").then((listings) => {
      let listingCards = listings.map((listing) => (
        <TradeListing
          tradeId={listing._id}
          creator={listing.creator}
          details={listing.details}
          status={listing.status}
          setViewListings={setViewListings}
          setMakeListing={setMakeListing}
          setPostOrReply={setPostOrReply}
        />
      ));
      setTradeListings(listingCards);
    });
  });

  socket.on("newreplytrade", (trade) => {
    get("/api/tradelistings").then((listings) => {
      let listingCards = listings.map((listing) => (
        <TradeListing
          tradeId={listing._id}
          creator={listing.creator}
          details={listing.details}
          status={listing.status}
          setViewListings={setViewListings}
          setMakeListing={setMakeListing}
          setPostOrReply={setPostOrReply}
        />
      ));
      setTradeListings(listingCards);
    });
  });

  // initial mount
  useEffect(() => {
    get("/api/tradelistings").then((listings) => {
      if (listings.length == 0) {
        setTradeListings("no trade listings to show");
      } else {
        let listingCards = listings.map((listing) => (
          <TradeListing
            tradeId={listing._id}
            creator={listing.creator}
            details={listing.details}
            status={listing.status}
            setViewListings={setViewListings}
            setMakeListing={setMakeListing}
            setPostOrReply={setPostOrReply}
          />
        ));
        setTradeListings(listingCards);
      }
    });
    get("/api/getuser", { id: props.userId }).then((user) => {
      let chatPreviews = user.chats.map((chat) => (
        <ChatPreview
          chatId={chat}
          userId={props.userId}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      ));
      setChats(chatPreviews);
    });
  }, []);

  return (
    <>
      <div className="page-30">
        <div className="toggleIcon-Container">
          <button2
            onClick={() => {
              setMessagePage(true);
              setListingPage(false);
            }}
            className="u-pointer"
          >
            {messagePage ? (
              <FiMessageSquare className="toggleIcon-selected" />
            ) : (
              <FiMessageSquare className="toggleIcon" />
            )}
          </button2>
          <button2
            onClick={() => {
              setListingPage(true);
              setMessagePage(false);
              setSelectedChat("");
            }}
            className="u-pointer"
          >
            {listingPage ? (
              <FaList className="toggleIcon-selected" />
            ) : (
              <FaList className="toggleIcon" />
            )}
          </button2>
        </div>
        <hr></hr>
        {messagePage == true ? (
          <div className="verticalView">{chats}</div>
        ) : listingPage == true ? (
          <div className="tradeAction-Container">
            {viewListings ? (
              <div
                onClick={() => {
                  setViewListings(true);
                  setMakeListing(false);
                  setViewTrades(false);
                }}
                className="tradeAction-selected u-pointer"
              >
                view trade listings
              </div>
            ) : (
              <div
                onClick={() => {
                  setViewListings(true);
                  setMakeListing(false);
                  setViewTrades(false);
                }}
                className="tradeAction u-pointer"
              >
                view trade listings
              </div>
            )}
            {makeListing ? (
              <div
                onClick={() => {
                  setPostOrReply("post");
                  setMakeListing(true);
                  setViewListings(false);
                  setViewTrades(false);
                }}
                className="tradeAction-selected u-pointer"
              >
                make a listing
              </div>
            ) : (
              <div
                onClick={() => {
                  setPostOrReply("post");
                  setMakeListing(true);
                  setViewListings(false);
                  setViewTrades(false);
                }}
                className="tradeAction u-pointer"
              >
                make a listing
              </div>
            )}
            {viewTrades ? (
              <div onClick={getTradeRequests} className="tradeAction-selected u-pointer">
                trade requests
              </div>
            ) : (
              <div onClick={getTradeRequests} className="tradeAction u-pointer">
                trade requests
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="page-70">
        {listingPage == true ? (
          viewListings == true ? (
            <>
              {typeof tradeListings === "string" ? (
                <p className="u-textCenter">{tradeListings}</p>
              ) : (
                <>
                  {tradeListings.length > 0 ? (
                    <div className="verticalView">
                      <div className="tradeAction-Container">{tradeListings}</div>
                    </div>
                  ) : (
                    <p className="u-textCenter">fetching listings...</p>
                  )}
                </>
              )}
            </>
          ) : makeListing == true ? (
            <PostTrade
              userId={props.userId}
              setMakeListing={setMakeListing}
              setViewListings={setViewListings}
              postOrReply={postOrReply}
            />
          ) : viewTrades == true ? (
            <>
              {typeof tradeRequests === "string" ? (
                <p className="u-textCenter">{tradeRequests}</p>
              ) : (
                <>
                  {tradeRequests.length > 0 ? (
                    <div className="verticalView">
                      <div className="tradeAction-Container">{tradeRequests}</div>
                    </div>
                  ) : (
                    <p className="u-textCenter">fetching trade requests...</p>
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          )
        ) : messagePage == true ? (
          selectedChat == "" ? (
            <p className="u-textCenter">no messages to show</p>
          ) : (
            <ChatView userId={props.userId} chatId={selectedChat} />
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Trade;
