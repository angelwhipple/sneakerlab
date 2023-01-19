import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";

import anonymous from "../../public/anon.jpg";

const Profile = () => {
  const [displayName, setDisplayName] = useState("add Display name");
  const [about, setAbout] = useState("add About section");
  const [userCollections, setUserCollections] = useState([]);

  // mount profile page
  useEffect(() => {
    console.log("mounted profile component");

    get("/api/whoami").then((user) => {
      // check if a user is logged in
      if (user) {
        // console.log("checkpoint1", user._id);
        setDisplayName(user.displayName);
        setAbout(user.about);

        get("/api/usercollections", { creator: user._id }).then((collections) => {
          // find all of the user's collections
          // console.log("checkpoint2", collections);
          setUserCollections(collections);
        });
      }
    });
  }, []);

  return (
    <div className="centered">
      <img src={anonymous} height="100" width="100" />
      <h3 className="Profile-name">{displayName}</h3>
      <h4>{about}</h4>
      <p>0 followers, 0 following</p>
    </div>
    // <div className="Profile-collections">
    //   {userCollections.map((collection) => {
    //     <CollectionDisplay
    //       collection={collection.creator}
    //       title={collection.title}
    //       shoes={collection.shoes}
    //     />;
    //   })}
    // </div>
  );
};

export default Profile;
