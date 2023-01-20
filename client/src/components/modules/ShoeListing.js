import { get } from "../../utilities";
import React, { useState, useEffect } from "react";
import "./ShoeListing.css";
import { FaRegHeart } from 'react-icons/fa';

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

  const [saveModal, setSaveModal] = useState(false);
  const toggleSaveModal = () => {
    setSaveModal(!saveModal);
  };
  const [user, setUser] = useState();
  const [userCollections, setUserCollections] = useState([]);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      // check if a user is logged in
      if (user) {
        setUser(user._id);

        get("/api/usercollections", { creator: user._id }).then((collections) => {
          // find all of the user's collections
          setUserCollections(collections);
        });
      }
    });
  }, [userCollections]);

  if (!user) {
    return (<>Login to see content!</>);
  } else {
    return (
      <div className="u-inlineFlex Listing-container Listing-card">
        <img src={props.image} className="Listing-icon" width="100" height="100" />
        <div className="u-flexColumn">
          <h3>{props.name}</h3>
          <p className="Listing-colorway">{props.colorway}</p>
          <p className="Listing-release">Release: {props.release}</p>
        </div>
        <div className="u-flexColumn u-flex-alignCenter Buy-links-container">{buyLinks}</div>

        <div>
          <button onClick={toggleSaveModal} ><FaRegHeart /></button>
          {saveModal ? (
          <div className="Listing-modalContainer">
          <div className="Listing-modalContent">
            <button onClick={toggleSaveModal} className="Listing-cancelbutton" >cancel</button>
            <div>{userCollections.map((collection) => {collection.title})}</div>
            <div>favorites</div>
            <div>red</div>
            <button>create new collection</button>
          </div>
          </div>
          ) : <></>
          }
        </div>
      
      </div> 
    );
  };
};

export default ShoeListing;
