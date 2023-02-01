import { get } from "../../utilities";
import "./Profile.css";
import React, { useState, useEffect } from "react";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "@reach/router";
import EditProfileModal from "../modules/EditProfileModal";
import CollectionModal from "../modules/CollectionModal";
import { socket } from "../../client-socket";
import CollectionDisplay from "../modules/CollectionDisplay";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Search.css";

const Profile = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [pfp, setPfp] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const [collectionModal, setCollectionModal] = useState(false);

  // return to home onClick logout button
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  socket.on("profile", (updatedInfo) => {
    setDisplayName(updatedInfo.name);
    setAbout(updatedInfo.about);
  });

  socket.on("setpfp", (user) => {
    setPfp(user.pfp);
  });

  socket.on("profilechange", (user) => {
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

  socket.on("deletedcollection", (collectionId) => {
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
        <div className="Profile-container">
          <div className="Profile-picContainer">
            <img src={pfp} width="100" className="Profile-pic" />
          </div>
          <div className="Profile-name">{displayName}</div>
          <div className="Profile-about">{about}</div>
          <div className="Profile-interaction">
            {followers.length} followers | {following.length} following
          </div>
          {/* only display edit/logout on main user profile  */}
          {props.currentProfileId == props.userId ? (
            <div className="Profile-personal">
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
        </div>
      ) : (
        <p className="u-textCenter">awaiting profile content...</p>
      )}
      <hr></hr>

      {typeof userCollections === "string" ? (
        <p className="u-textCenter">{userCollections}</p>
      ) : (
        <>
          {userCollections.length > 0 ? (
            <>
              <div className="u-flex">
                <button
                  onClick={() => {
                    setCollectionModal(true);
                  }}
                  className="editButton-Container u-pointer"
                >
                  <BsThreeDotsVertical />
                </button>
                <div className="Collection-scroll">{userCollections}</div>
              </div>
              {collectionModal ? (
                <CollectionModal setCollectionModal={setCollectionModal} userId={props.userId} />
              ) : (
                <></>
              )}
            </>
          ) : (
            <p className="u-textCenter">loading user collections...</p>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
