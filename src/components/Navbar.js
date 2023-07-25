import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import { PATHS } from "../paths";

const Navbar = () => {
  return (
    <div className="navbar">
      <li>
        <Link to={PATHS.HOME}>Home</Link>
      </li>
      <li>
        <Link to={PATHS.SIX_COIN}>Six Coin Puzzle</Link>
      </li>
      <li>
        <Link to={PATHS.FIVE_COIN}>Five Coin Puzzle</Link>
      </li>
    </div>
  );
};

export default Navbar;
