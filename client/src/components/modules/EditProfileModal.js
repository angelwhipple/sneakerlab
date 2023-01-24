import React from "react";
import "./Modal.css";
import "../pages/Profile.css";
import { post } from "../../utilities";

const EditProfileModal = (props) => {
  let temp_name = null;
  let temp_about = null;
  let temp_pfp = null;

  const handleInput_name = (event) => {
    temp_name = event.target.value;
  };

  const handleInput_about = (event) => {
    temp_about = event.target.value;
  };

  // reads a FileList obj, extract File
  const handleInput_pfp = (event) => {
    temp_pfp = event.target.files[0];
  };

  // update info to user profile document
  const updateProfile = (event) => {
    event.preventDefault();

    const body = { id: props.userId };
    if (temp_name) {
      body["newName"] = temp_name;
    } else {
      body["newName"] = props.oldName;
    }
    if (temp_about) {
      body["newAbout"] = temp_about;
    } else {
      body["newAbout"] = props.oldAbout;
    }
    if (temp_pfp) {
      const newPfp = document.createElement("img");
      newPfp.src = URL.createObjectURL(temp_pfp);
      body["newPfp"] = newPfp.src;
    } else {
      body["newPfp"] = props.oldPfp;
    }
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
          <div>
            <label className="col-20">profile picture</label>
            <input className="col-70" type="file" accept="image/*" onChange={handleInput_pfp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
