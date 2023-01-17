import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";

const Profile = ({ handleLogout }) => {
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");

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
      setDisplayName("");
    };
  }, [displayName, about]); //re-render every time any profile info changes

  return (
    <div className="centered">
      <p>Insert profile picture</p>
      <p className="Profile-name">{displayName}</p>
      <p>{about}</p>
      <p>0 followers, 0 following</p>
    </div>
    // <div className="Profile-collections">
    //   {/* {userCollections.map((userCollection) => {
    //     <UserCollection />;
    //   })} */}
    // </div>
  );
};

export default Profile;
