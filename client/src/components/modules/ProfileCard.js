import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { post } from "../../utilities";

import "./ProfileCard.css";

const ProfileCard = (props) => {
  return (
    <div className="u-flexColumn Profilecard-container">
      <div className="Profilecard-info">
        <img src={props.pfp} className="Profilecard-icon u-pointer" />
        <div className="Profile-content">
          <p className="Profilecard-name">{props.name}</p>
          <p className="Profilecard-about">{props.about}</p>
          <p className="Profilecard-about">{props.followers} followers</p>
          <p className="Profilecard-about">{props.following} following</p>
        </div>
        {props.userId ? (
          <button
            onClick={() => {
              post("/api/followuser", { id: props.userId, otherId: props.profileId });
            }}
            className="Follow-heartContainer u-pointer"
          >
            <FaRegHeart />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
