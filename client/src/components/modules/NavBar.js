import React from "react";
import { Link } from "@reach/router";

import "../../utilities.css";

const NavBar = () => {
  return (
    <nav className="navContainer">
      <div class="u-reverseFlex">
        <Link to="./profile"></Link>
        <h4>discover</h4>
      </div>
    </nav>
  );
};

export default NavBar;
