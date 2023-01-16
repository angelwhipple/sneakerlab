import { get } from "../../utilities";
import React from "react";
import { useState, useEffect } from "react";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");

  // mount profile page
  useEffect(() => {
    console.log("mounted profile component");

    get("/api/whoami").then((user) => {
      setDisplayName(user.name);
    });

    return () => {
      setDisplayName("");
    };
  }, []);

  return (
    <div className="centered">
      {displayName ? "Welcome back, " + displayName : "Login to see content"}
    </div>
  );
};

export default Profile;
