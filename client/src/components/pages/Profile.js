import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";

const Profile = (props) => {
  const [username, setUsername] = useState("");

  // mount profile page
  useEffect(() => {
    console.log("mounted profile component");

    get("api/user", { id: userId }).then((name) => {
      setUsername(name);
    });

    // dismount/cleanup callback
    return () => {
      setUsername("");
    };
  }, []);

  return <div>{username ? "Welcome back, " + username : "Login to see content"}</div>;
};

export default Profile;
