import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sixcoin">Six Coin Puzzle</Link>
      </li>
      <li>
        <Link to="/fivecoin">Five Coin Puzzle</Link>
      </li>
    </div>
  );
};

export default Navbar;
