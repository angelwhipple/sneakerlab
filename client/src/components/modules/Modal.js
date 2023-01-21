import React from "react";

import "./Modal.css";

const Modal = (props) => {
  return props.modal ? (
    <div className="modal-Container">
      <div className="modal-Content"></div>
    </div>
  ) : (
    <></>
  );
};

const SaveModal = (props) => {};

const ProfileModal = ({ modal }) => {};
export { SaveModal, ProfileModal };
