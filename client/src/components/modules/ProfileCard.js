import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BiMinus } from "react-icons/bi";
import { get, post } from "../../utilities";
import { useState, useEffect } from "react";

import "./ProfileCard.css";

const ProfileCard = (props) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [pfp, setPfp] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    get("/api/getuser", { id: props.profileId }).then((otherUser) => {
      setName(otherUser.displayName);
      setAbout(otherUser.about);
      setPfp(otherUser.pfp);
      setFollowing(otherUser.following);
      setFollowers(otherUser.followers);
    });
  });

  return (
    <div className="u-flexColumn Profilecard-container">
      <div className="Profilecard-info">
        <img src={pfp} className="Profilecard-icon u-pointer" />
        <div className="Profile-content">
          <p className="Profilecard-name">{name}</p>
          <p className="Profilecard-about">{about}</p>
          <p className="Profilecard-about">{followers.length} followers</p>
          <p className="Profilecard-about">{following.length} following</p>
        </div>
        {/* don't display follow/unfollow button if not logged in/viewing own profile */}
        {props.userId && props.userId != props.profileId ? (
          followers.includes(props.userId) ? (
            <button
              onClick={() => {
                post("/api/unfollowuser", { id: props.userId, otherId: props.profileId });
              }}
              className="Follow-heartContainer u-pointer"
            >
              <BiMinus />
            </button>
          ) : (
            <button
              onClick={() => {
                post("/api/followuser", { id: props.userId, otherId: props.profileId });
              }}
              className="Follow-heartContainer u-pointer"
            >
              <FaRegHeart />
            </button>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
