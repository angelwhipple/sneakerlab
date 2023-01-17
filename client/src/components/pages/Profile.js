import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";

const Profile = ({ handleLogout }) => {
  const [displayName, setDisplayName] = useState("insert display name");
  const [about, setAbout] = useState("insert about info");

  // mount profile page
  useEffect(() => {
    console.log("mounted profile component");

    get("/api/whoami").then((user) => {
      // check if a user is returned first (logged in)
      if (user) {
        setDisplayName(user.displayName);
        setAbout(user.about);
      }
    });

    return () => {
      setDisplayName(""); //what is this
    };
  }, [displayName, about]); //re-render every time any profile info changes

  return (
    <div>
      <div className="u-flex-alignCenter">
       <div className="Profile-name">{displayName}+{about}</div>
       <div>insert pfp</div>
       <div>0 followers, 0 following</div>
      </div>
      <div className="Profile-collections">
        {userCollections.map((userCollection) => {
          <UserCollection />
        })}
      </div>
    </div>
  );
};

export default Profile;
