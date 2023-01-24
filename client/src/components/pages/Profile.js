import { get } from "../../utilities";
import "./Profile.css";
import React, { useState, useEffect } from "react";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "@reach/router";
import EditProfileModal from "../modules/EditProfileModal";
import { socket } from "../../client-socket";
import CollectionDisplay from "../modules/CollectionDisplay";
import "./Search.css";

const Profile = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [pfp, setPfp] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [userCollections, setUserCollections] = useState([]);

  // return to home onClick logout button
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  socket.on("profile", (updatedInfo) => {
    setDisplayName(updatedInfo.name);
    setAbout(updatedInfo.about);
    setPfp(updatedInfo.pfp);
  });

  get("/api/usercollections", { id: props.userId }).then((collections) => {
    let collectionDisplays = collections.map((collection) => (
      <CollectionDisplay
        creator={collection.creator}
        name={collection.name}
        shoes={collection.shoes}
      />
    ));
    setUserCollections(collectionDisplays);
  });

  // mount profile page
  useEffect(() => {
    console.log("mounted profile page");

    get("/api/whoami").then((user) => {
      setDisplayName(user.displayName);
      setAbout(user.about);
      setPfp(user.pfp);
      setFollowers(user.followers);
      setFollowing(user.following);
    });
  }, []);

  return (
    <>
      <div className="Profile-container">
        <div className="u-flexColumn u-flex-justifyCenter">
          <div className="Profile-interaction">{followers.length} followers</div>
          <div className="Profile-interaction">{following.length} following</div>
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
        <button
          onClick={() => {
            setProfileModal(true);
          }}
          className="Profile-button u-pointer"
        >
          edit profile
        </button>
        {profileModal ? (
          <EditProfileModal
            userId={props.userId}
            oldName={displayName}
            oldPfp={pfp}
            oldAbout={about}
            toggleModal={setProfileModal}
          />
        ) : (
          <></>
        )}
        <GoogleOAuthProvider>
          <button
            onClick={() => {
              googleLogout();
              props.handleLogout();
              routeChange();
            }}
            className="Profile-button u-pointer"
          >
            logout
          </button>
        </GoogleOAuthProvider>
      </div>
      <hr></hr>

      <div className="Collection-scroll">{userCollections}</div>
    </>
  );
};

export default Profile;
