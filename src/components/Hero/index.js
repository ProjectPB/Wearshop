import React from "react";
import MenImg from "./../../assets/men.jpg";
import WomenImg from "./../../assets/women.jpg";
import "./styles.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div>
        <img src={MenImg} alt="Men" />
        <h1>Men</h1>
      </div>

      <div>
        <img src={WomenImg} alt="Women" />
        <h1>Women</h1>
      </div>
    </div>
  );
};

export default Hero;
