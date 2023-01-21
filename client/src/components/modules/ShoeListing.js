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
  // const saveIcon = styled(FaRegHeart){
  //   :hover{background-color:red;
  // };
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

  return (
    <div className="u-flexColumn Listing-container">
      <div className="Listing-info">
        <img src={props.image} className="Listing-icon" />
        <div className="Listing-content">
          <div className="Listing-name">{props.name}</div>
          <div className="Listing-colorway">{props.colorway}</div>
          <div className="Listing-release">Release: {props.release}</div>
        </div>
      </div>
      <div className="Buy-links-container">
        <div>{buyLinks}</div>
        <div>
          <button onClick={toggleSaveModal} className="Listing-heartContainer"><FaRegHeart className="Listing-heart" /></button>
          {saveModal ? (
          <div className="Listing-modalContainer">
          <div className="Listing-modalContent">
            <button onClick={toggleSaveModal} className="Listing-cancelbutton" >cancel</button>
            <div>{userCollections.map((collection) => {collection.title})}</div>
            <p>favorites</p>
            <p>red</p>
            <button>create new collection</button>
          </div>
          </div>
          ) : <></>
          }
        </div>
      </div>

      {/* <div>
        <button onClick={toggleSaveModal}><FaRegHeart className="Listing-heart" /></button>
        {saveModal ? (
        <div className="Listing-modalContainer">
        <div className="Listing-modalContent">
          <button onClick={toggleSaveModal} className="Listing-cancelbutton" >cancel</button>
          <div>{userCollections.map((collection) => {collection.title})}</div>
          <p>favorites</p>
          <p>red</p>
          <button>create new collection</button>
        </div>
        </div>
        ) : <></>
        }
      </div> */}
    
    </div> 
  );
};

export default ShoeListing;
