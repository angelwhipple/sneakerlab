import React from "react";
import "./Modal.css";
import "../pages/Profile.css";
import { post } from "../../utilities";
import { useState } from "react";

const EditProfileModal = (props) => {
  const [temp_name, setTempName] = useState("");
  const [temp_about, setTempAbout] = useState("");

  const handleInput_name = (event) => {
    setTempName(event.target.value);
  };

  const handleInput_about = (event) => {
    setTempAbout(event.target.value);
  };

  // update info to user profile document
  const updateProfile = (event) => {
    event.preventDefault();

    const body = { id: props.userId };
    if (temp_name) {
      console.log("new name entered");
      body["newName"] = temp_name;
    } else {
      console.log("new name not entered");
      body["newName"] = props.oldName;
    }
    if (temp_about) {
      body["newAbout"] = temp_about;
    } else {
      body["newAbout"] = props.oldAbout;
    }
    console.log("body: ", body);
    post("/api/updateprofile", body);
    props.toggleModal(false);
  };

  return (
    <div className="modal-Container">
      <div className="modal-Content">
        <div className="Profile-modalButton">
          <button
            onClick={() => {
              props.toggleModal(false);
            }}
            className="Profile-button u-pointer"
          >
            cancel
          </button>
          <button
            onClick={updateProfile}
            type="submit"
            value="Submit"
            className="Profile-button u-pointer"
          >
            done
          </button>
        </div>
        <div className="u-flex u-flexColumn">
          <div>
            <label className="col-20">display name</label>
            <input
              className="col-70"
              type="text"
              placeholder="enter a display name"
              onChange={handleInput_name}
            />
          </div>
          <div>
            <label className="col-20">about</label>
            <input
              className="col-70"
              type="text"
              placeholder="enter new about info"
              onChange={handleInput_about}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
