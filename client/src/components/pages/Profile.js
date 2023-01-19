import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";

import anonymous from "../../public/anon.jpg";

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
      <div className="u-flex-alignCenter">
        <div className="Profile-name">
          {displayName}+{about}
        </div>
        <div>insert pfp</div>
        <div>0 followers, 0 following</div>
      </div>
      <div className="Profile-collections">
        {userCollections.map((collection) => {
          <CollectionDisplay
            collection={collection.creator}
            title={collection.title}
            shoes={collection.shoes}
          />;
        })}
      </div>
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
