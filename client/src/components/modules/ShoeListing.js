import { get, post } from "../../utilities";
import React, { useState, useEffect } from "react";
import "./ShoeListing.css";
import { FaRegHeart } from "react-icons/fa";

const ShoeListing = (props) => {
  const [saveModal, setSaveModal] = useState(false);
  let buyLinks = [];

  // for saving to/adding user collections
  const [collectionButtons, setCollectionButtons] = useState([]);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [tempName, setTempName] = useState("");

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

  const toggleSaveModal = () => {
    setSaveModal(!saveModal);
  };

  // generate user collection buttons on any mount/state change
  useEffect(() => {
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
            toggleSaveModal();
          }}
          className="buy-link u-pointer"
        >
          {collection.name}
        </button>
      ));
      setCollectionButtons(buttons);
    });
  });

  const createCollection = () => {
    post("/api/createcollection", { id: props.userId, name: tempName });
    setCreatingCollection(false);
  };

  const handleInput_name = (event) => {
    setTempName(event.target.value);
  };

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
            <button onClick={toggleSaveModal} className="Listing-heartContainer u-pointer">
              <FaRegHeart />
            </button>
            {saveModal ? (
              <div className="Listing-modalContainer">
                <div className="Listing-modalContent">
                  <h2 className="u-textCenter">save to a collection</h2>
                  {creatingCollection ? (
                    <div>
                      <label className="col-20">collection name</label>
                      <input
                        className="col-70"
                        type="text"
                        placeholder="enter collection name"
                        onChange={handleInput_name}
                      />
                      <button
                        onClick={() => {
                          setCreatingCollection(false);
                        }}
                        className="listing-button u-pointer floatRight"
                      >
                        cancel
                      </button>
                      <button
                        onClick={createCollection}
                        type="submit"
                        value="Submit"
                        className="listing-button u-pointer floatRight"
                      >
                        create
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="Collections-scroll u-flex-justifyCenter">
                        {collectionButtons}
                      </div>
                      <button
                        onClick={() => {
                          setCreatingCollection(true);
                        }}
                        className="listing-button u-pointer"
                      >
                        create new collection
                      </button>
                      <button
                        onClick={toggleSaveModal}
                        className="listing-button u-pointer floatRight"
                      >
                        cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
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
