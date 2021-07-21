import React from "react";
import "./styles.scss";

const Header = () => {
  return (
    <div className="header">
      <h1>LOGO</h1>

      <nav>
        <p>Men</p>
        <p>Women</p>
      </nav>

      <div>
        <p>register</p>
        <p>sign in</p>
      </div>
    </div>
  );
};

export default Header;
