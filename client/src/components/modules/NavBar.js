import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navContainer">
      <div className="u-reverseFlex">
        <Link to="/profile/" className="nav-link">
          profile
        </Link>
        <Link to="/" className="nav-link">
          discover
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
