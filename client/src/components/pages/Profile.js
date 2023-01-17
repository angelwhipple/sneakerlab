import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";

const Profile = () => {
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
  });

  return (
    <div>
      {displayName ? (
        <div className="centered">
          <div className="Profile-name">{displayName}</div>
          <p>{about}</p>
          <div>insert pfp</div>
          <p>0 followers, 0 following</p>
        </div>
      ) : (
        <div className="centered">Login to see cool content :)</div>
      )}
    </div>
  );
};

export default Profile;
