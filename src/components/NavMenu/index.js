import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function NavMenu({ menOptions, womenOptions, menuOpen, openMenu, closeMenu }) {
  return (
    <div className="navMenu" style={menuOpen ? {} : { display: "none" }}>
      <div className="menuRow">
        <Link to="/products/men" onClick={openMenu}>
          <h3>MEN</h3>
        </Link>

        <ul>
          {menOptions.slice(1).map(({ name, value }) => (
            <Link to={`/products/men/${value}`} onClick={() => closeMenu}>
              <li>{name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="menuRow">
        <Link to="/products/women" onClick={() => closeMenu}>
          <h3>WOMEN</h3>
        </Link>
        <ul>
          {womenOptions.slice(1).map((option) => (
            <Link
              to={`/products/women/${option.value}`}
              onClick={() => closeMenu}
            >
              <li>{option.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavMenu;
