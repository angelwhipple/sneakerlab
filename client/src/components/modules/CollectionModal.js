import React from "react";
import "./Modal.css";
import "./CollectionModal.css";
import { get, post } from "../../utilities";
import { useState, useEffect } from "react";

const CollectionModal = (props) => {
  const [collectionButtons, setCollectionButtons] = useState([]);

  useEffect(() => {
    get("/api/usercollections", { id: props.userId }).then((collections) => {
      let buttons = collections.map((collection) => (
        <button
          onClick={() => {
            post("/api/deletecollection", {
              collectionId: collection._id,
            });
          }}
          className="collection-link u-pointer"
        >
          {collection.name}
        </button>
      ));
      setCollectionButtons(buttons);
    });
  });

  return (
    <div className="modal-Container">
      <div className="modal-Content">
        <h2 className="u-textCenter">delete a collection</h2>
        <div className="Collections-scroll u-flex-justifyCenter">{collectionButtons}</div>
        <button
          onClick={() => {
            props.setCollectionModal(false);
          }}
          className="collection-button u-pointer floatRight"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default CollectionModal;
