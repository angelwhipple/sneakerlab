import { get } from "../../utilities";
import "./Profile.css";
import React, { useState, useEffect } from "react";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "@reach/router";
import EditProfileModal from "../modules/EditProfileModal";

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

  // mount profile page
  useEffect(() => {
    console.log("mounted profile page");

    get("/api/whoami").then((user) => {
      setDisplayName(user.displayName);
      setAbout(user.about);
      setPfp(user.pfp);
      setFollowers(user.followers);
      setFollowing(user.following);

      // get("/api/usercollections", { creator: user._id }).then((collections) => {
      //   setUserCollections(collections);
      // });
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
            setNewName={setDisplayName}
            setNewAbout={setAbout}
            setNewPfp={setPfp}
            setNavBarPfp={props.setNavBarPfp}
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

      {/* <div className="Profile-collections">
        {userCollections.map((collection) => {
          <CollectionDisplay
            collection={collection.creator}
            title={collection.title}
            shoes={collection.shoes}
          />;
        })}
      </div> */}
    </>
  );
};

export default Profile;
