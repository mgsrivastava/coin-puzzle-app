import "../styles.css";
import finn from "../images/finn.jpg";
import React from "react";

const HomePage = () => {
  return (
    <div className="home-page">
      <img className="background-img" src={finn} alt="a white cat" />
    </div>
  );
};

export default HomePage;
