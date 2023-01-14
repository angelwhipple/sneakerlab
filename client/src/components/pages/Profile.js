import React, { useState, useEffect } from "react";

import { get } from "../../utilities.css";

const Profile = () => {
  const [user, setUser] = useState("");

  // mount profile page
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <body>
      <div class="smallSplit left">
        <div class="u-center">
          <h2>Profile</h2>
          <p>{user ? "User information" : "Login to see profile"}</p>
        </div>
      </div>
    </body>
  );
};
export default Profile;
