import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";

const Profile = () => {
  const [displayName, setDisplayName] = useState("add display name");
  const [about, setAbout] = useState("add about info")

  // mount profile page
  useEffect(() => {
    console.log("mounted profile component");

    get("/api/whoami").then((user) => {
      setDisplayName(user.name);
      setAbout(user.about); //hey how do you do this part
    });

    return () => {
      setDisplayName(""); //what is this
    };
  }, []);

  return (
    <div> {displayName ?
      <div className="u-flex-alignCenter">
       <div className="Profile-name">{displayName}+{about}</div>
       <div>insert pfp</div>
       <div>0 followers, 0 following</div>
      </div>
      : "Login to see cool content :)"}
    </div>
  );
};

export default Profile;
