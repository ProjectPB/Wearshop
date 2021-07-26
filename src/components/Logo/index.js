import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo">
        <h1>
          wear<span>shop</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
