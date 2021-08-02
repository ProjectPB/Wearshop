import React from "react";
import { Link } from "react-router-dom";
import MenImg from "./../../assets/men.jpg";
import WomenImg from "./../../assets/women.jpg";
import "./styles.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div className="navImg">
        <Link to="/products/women">
          <img src={WomenImg} alt="Women" />
          <h1>Women</h1>
        </Link>
      </div>

      <div className="navImg">
        <Link to="/products/men">
          <img src={MenImg} alt="Men" />
          <h1>Men</h1>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
