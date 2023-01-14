import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navContainer">
      <div class="u-reverseFlex">
        <Link to="/profile/">Profile</Link>
        <h4>discover</h4>
      </div>
    </nav>
  );
};

export default NavBar;
