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
  // const [currentProfileId, setCurrentProfileId] = useState("");

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

  socket.on("profilechange", (user) => {
    console.log("received profile change emission");
    // setCurrentProfileId(user._id);
    setDisplayName(user.displayName);
    setAbout(user.about);
    setPfp(user.pfp);
    setFollowers(user.followers);
    setFollowing(user.following);
    get("/api/usercollections", { id: props.currentProfileId }).then((collections) => {
      if (collections.length == 0) {
        setUserCollections("no collections to display");
      } else {
        let collectionDisplays = collections.map((collection) => (
          <CollectionDisplay
            creator={collection.creator}
            name={collection.name}
            shoes={collection.shoes}
            setSearch={props.setSearch}
          />
        ));
        setUserCollections(collectionDisplays);
      }
    });
  });

  // mount profile page
  useEffect(() => {
    console.log("mounted profile page");
    // setCurrentProfileId(props.userId);

    get("/api/getuser", { id: props.currentProfileId }).then((user) => {
      setDisplayName(user.displayName);
      setAbout(user.about);
      setPfp(user.pfp);
      setFollowers(user.followers);
      setFollowing(user.following);
    });

    get("/api/usercollections", { id: props.currentProfileId }).then((collections) => {
      if (collections.length == 0) {
        setUserCollections("no collections to display");
      } else {
        let collectionDisplays = collections.map((collection) => (
          <CollectionDisplay
            creator={collection.creator}
            name={collection.name}
            shoes={collection.shoes}
            setSearch={props.setSearch}
          />
        ));
        setUserCollections(collectionDisplays);
      }
    });
  }, []);

  return (
    <>
      {displayName != "" && pfp != "" && about != "" ? (
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

          {/* only display edit/logout on main user profile  */}
          {props.currentProfileId == props.userId ? (
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
          ) : (
            <></>
          )}
        </>
      ) : (
        <p className="u-textCenter">awaiting profile content...</p>
      )}
      <hr></hr>

      {typeof userCollections === "string" ? (
        <p className="u-textCenter">{userCollections}</p>
      ) : (
        <>
          {userCollections.length > 0 ? (
            <div className="Collection-scroll">{userCollections}</div>
          ) : (
            <p className="u-textCenter">loading user collections...</p>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
