import { get, post } from "../../utilities";
import "./Profile.css";
import React, { useState, useEffect } from "react";

const Profile = (props) => {
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
        setDisplayName(user.displayName);
        setAbout(user.about);
        setPfp(user.pfp);

        get("/api/usercollections", { creator: user._id }).then((collections) => {
          // find all of the user's collections
          setUserCollections(collections);
        });
      }
    });
  });

  let temp_name = displayName;
  const handleInput_name = (event) => {
    temp_name = event.target.value;
  };
  console.log(temp_name);

  let temp_about = about;
  const handleInput_about = (event) => {
    temp_about = event.target.value;
  };
  // console.log(temp_about);

  let temp_pfp = pfp;
  const handleInput_pfp = (event) => {
    temp_pfp = event.target.value;
  };
  // console.log(temp_pfp);

  const body = {
    id: props.id,
    newName: temp_name,
    newAbout: temp_about,
    newPfp: temp_pfp,
  };

  const [profileModal, setProfileModal] = useState(false);
  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  // update info to user profile document
  const updateProfile = (event) => {
    event.preventDefault();
    post("/api/updateprofile", body).then((profile) => {
      console.log("updated user profile");
    });
    toggleProfileModal();
  };

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
          <div className="Profile-editModal">
            <button onClick={toggleProfileModal} className="Profile-button u-pointer">
              edit profile
            </button>
            {profileModal ? (
              <div>
                <button className="u-pointer" onClick={updateProfile}>
                  done
                </button>
                <form>
                  <label>display name</label>
                  <input type="text" onChange={handleInput_name} />
                  <label>about</label>
                  <input type="text" onChange={handleInput_about} />
                  <label>profile picture url </label>
                  <input type="text" onChange={handleInput_pfp} />
                </form>
              </div>
            ) : (
              <></>
            )}
          </div>

          <button
            onClick={() => {
              logout();
            }}
            className="Profile-button u-pointer"
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
