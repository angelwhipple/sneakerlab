import { get } from "../../utilities";
import "./Profile.css";
import React, { useState, useEffect } from "react";

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

  const [profileModal, setProfileModal] = useState(false);
  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const logout = () => {};

  if (!displayName) {
    return <div className="centered">Login to see content!</div>;
  } else {
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

        <div className="u-flex u-flex-justifyCenter">
          <div>
            <button onClick={toggleProfileModal} className="Profile-button" >
              edit profile
            </button>
            {profileModal ? (
            <div className="Profile-modalContainer">
            <div className="Profile-modalContent">
              <div className="Profile-modalButton">
                <button onClick={toggleProfileModal} className="Profile-button" >cancel</button>
                <button onClick={toggleProfileModal} className="Profile-button" >done</button>
              </div>
              <form><div className="u-flex u-flexColumn">
                <div>
                  <label className="col-20">display name</label>
                  <input className="col-70" type="text" placeholder="enter text" />
                </div>
                <div>
                  <label className="col-20">about</label>
                  <input className="col-70" type="text" placeholder="enter text" />
                </div>
                <div>
                  <label className="col-20">profile picture</label>
                  <input className="col-70" type="text" placeholder="enter url" />
                </div>
                </div></form>
            </div>
            </div>
            ) : <></>
            }
          </div>

          <button
            onClick={() => {
              logout();
            }}
            className="Profile-button"
          >
            logout
          </button>
          <div></div>
        </div>

        <hr></hr>

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
    );
  }
};

export default Profile;
