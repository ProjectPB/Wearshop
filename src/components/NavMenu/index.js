import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function NavMenu({ menOptions, womenOptions, menuOpen, closeMenu }) {
  return (
    <div className="navMenu" style={menuOpen ? {} : { display: "none" }}>
      <div className="menuRow">
        <ul>
          <Link to="/products/men" onClick={closeMenu}>
            <h3>MEN</h3>
          </Link>
          {menOptions.slice(1).map(({ name, value }) => (
            <Link key={value} to={`/products/men/${value}`} onClick={closeMenu}>
              <li>{name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="menuRow">
        <ul>
          <Link to="/products/women" onClick={closeMenu}>
            <h3>WOMEN</h3>
          </Link>
          {womenOptions.slice(1).map(({ name, value }) => (
            <Link
              key={value}
              to={`/products/women/${value}`}
              onClick={closeMenu}
            >
              <li>{name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavMenu;
