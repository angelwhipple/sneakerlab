import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [userCollections, setUserCollections] = useState([])
  const [user, setUser] = useState(null)

  // mount profile page
  useEffect(() => {
    console.log("mounted profile component");

    get("/api/whoami").then((user) => {
      // check if a user is returned first (logged in)
      if (user) {
        console.log("checkpoint2");
        setDisplayName(user.displayName);
        setAbout(user.about);
        setUser(user);
        get ("/api/usercollections").then((collections) => {
          console.log("before checking")
          if (user) { //can i reference user here?
            console.log("collections");
            console.log(collections); 
            setUserCollections(collections);
          }
        })
      } else {

      }
    });

    return () => {
      setDisplayName("");
    };
  }, []);

  if (user)
  return (
    <div>
      <div className="u-flex-alignCenter">
       <div className="Profile-name">{displayName}+{about}</div>
       <div>insert pfp</div>
       <div>0 followers, 0 following</div>
      </div>;
      <div className="Profile-collections">
        {userCollections.map((userCollection) => {
          <UserCollection />
        })}
      </div>;
    </div>;
    <div className="Profile-collections">
      {userCollections.map((userCollection) => {
        <UserCollection />;
      })}
    </div>
  );
};

export default Profile;
