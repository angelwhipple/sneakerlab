import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";
import Search from "./Search.js";

import logo from "../../public/sneakerlab.png";

const NavBar = (props) => {
  return (
    <nav className="navContainer">
      <img
        src={logo}
        height="70"
        width="200"
        className="floatLeft u-pointer u-relative"
        onClick={<Link to="/"></Link>}
      />
      <div className="u-reverseFlex">
        <Link to="/profile/" className="nav-link">
          profile
        </Link>
        <Link to="/" className="nav-link">
          discover
        </Link>
        <Search id={props.id} />
      </div>
    </nav>
  );
};

export default NavBar;
