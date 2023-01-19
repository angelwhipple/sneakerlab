import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [displayName, setDisplayName] = useState("add Display name");
  const [about, setAbout] = useState("add About section");
  const [pfp, setPfp] = useState("");
  const [userCollections, setUserCollections] = useState([]);

  // mount profile page
  useEffect(() => {
    console.log("mounted profile component");

    get("/api/whoami").then((user) => {
      // check if a user is logged in
      if (user) {
        console.log("checkpoint1", user._id);
        setDisplayName(user.displayName);
        setAbout(user.about);
        setPfp(user.pfp);

        get("/api/usercollections", { creator: user._id }).then((collections) => {
          // find all of the user's collections
          console.log("checkpoint2", collections);
          setUserCollections(collections);
        });
      }
    });
  }, []);

  return (
    <div>
      <div className="Profile-container">
        <div className="u-flexColumn u-flex-justifyCenter">
          <div className="Profile-interaction">0 followers</div>
          <div className="Profile-interaction">0 following</div>
        </div>
        <div className="Profile-picContainer">
          <img src={pfp} width="100" className="Profile-pic" />
        </div>
        <div className="u-flexColumn u-flex-justifyCenter">
          <div className="Profile-name">{displayName}</div>
          <div className="Profile-about">{about}</div>
        </div>
        
      </div>

      <button onClick={() => {editProfile();}}>
        edit profile
      </button>

      <hr></hr>

      <div className="Profile-collections">
        {userCollections.map((collection) => {
          <CollectionDisplay collection={collection.creator} title={collection.title} shoes={collection.shoes} />
        })}
      </div>
    </div>
  );
};

export default Profile;
