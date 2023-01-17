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
