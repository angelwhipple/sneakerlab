import React, { useState } from "react";
import "./Modal.css";
import "./ShoeListing.css";
import { post } from "../../utilities";

const SaveModal = (props) => {
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [tempName, setTempName] = useState("");

  const createCollection = () => {
    post("/api/createcollection", { id: props.userId, name: tempName });
    setCreatingCollection(false);
  };

  const handleInput_name = (event) => {
    setTempName(event.target.value);
  };

  return (
    <div className="modal-Container">
      <div className="modal-Content">
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
            <div className="Collections-scroll u-flex-justifyCenter">{props.buttons}</div>
            <button
              onClick={() => {
                setCreatingCollection(true);
              }}
              className="listing-button u-pointer"
            >
              create new collection
            </button>
            <button
              onClick={() => {
                props.toggleModal(false);
              }}
              className="listing-button u-pointer floatRight"
            >
              cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SaveModal;
