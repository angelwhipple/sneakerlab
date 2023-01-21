import { get, post } from "../../utilities";
import "./Profile.css";
import React, { useState, useEffect } from "react";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "@reach/router";

const GOOGLE_CLIENT_ID = "577941677274-3aeilnjtp2hj98r8jvcsa6jvkoq9r5kc.apps.googleusercontent.com";

const Profile = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [pfp, setPfp] = useState("");
  const [userCollections, setUserCollections] = useState([]);
  const [profileModal, setProfileModal] = useState(false);

  let temp_name = null;
  let temp_about = null;
  let temp_pfp = null;

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

      // get("/api/usercollections", { creator: user._id }).then((collections) => {
      //   setUserCollections(collections);
      // });
    });
  }, []);

  const handleInput_name = (event) => {
    temp_name = event.target.value;
  };

  const handleInput_about = (event) => {
    temp_about = event.target.value;
  };

  const handleInput_pfp = (event) => {
    temp_pfp = event.target.value;
  };

  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  // update info to user profile document
  const updateProfile = (event) => {
    event.preventDefault();

    const body = { id: props.userId };
    if (temp_name) {
      setDisplayName(temp_name);
      body["newName"] = temp_name;
    } else {
      body["newName"] = displayName;
    }
    if (temp_about) {
      setAbout(temp_about);
      body["newAbout"] = temp_about;
    } else {
      body["newAbout"] = about;
    }
    if (temp_pfp) {
      setPfp(temp_pfp);
      body["newPfp"] = temp_pfp;
    } else {
      body["newPfp"] = pfp;
    }
    post("/api/updateprofile", body);
    toggleProfileModal();
  };

  return (
    <>
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
        <button onClick={toggleProfileModal} className="Profile-button u-pointer">
          edit profile
        </button>
        {profileModal ? (
          <div className="Profile-modalContainer">
            <div className="Profile-modalContent">
              <div className="Profile-modalButton">
                <button onClick={toggleProfileModal} className="Profile-button u-pointer">
                  cancel
                </button>
                <button
                  onClick={updateProfile}
                  type="submit"
                  value="Submit"
                  className="Profile-button u-pointer"
                >
                  done
                </button>
              </div>
              <div className="u-flex u-flexColumn">
                <div>
                  <label className="col-20">display name</label>
                  <input
                    className="col-70"
                    type="text"
                    placeholder="enter a display name"
                    onChange={handleInput_name}
                  />
                </div>
                <div>
                  <label className="col-20">about</label>
                  <input
                    className="col-70"
                    type="text"
                    placeholder="enter new about info"
                    onChange={handleInput_about}
                  />
                </div>
                <div>
                  <label className="col-20">profile picture</label>
                  <input
                    className="col-70"
                    type="text"
                    placeholder="enter a url"
                    onChange={handleInput_pfp}
                  />
                </div>
              </div>
            </div>
          </div>
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
