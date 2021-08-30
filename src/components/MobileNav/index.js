import React from "react";
import { Link } from "react-router-dom";
import { menOptions, womenOptions } from "../../utils/config";
import "./styles.scss";

function MobileNav({ mobileMenuOpen, closeMobileMenu }) {
  return (
    <div className="mobileNav">
      {mobileMenuOpen && (
        <div className="categories">
          <div className="item">
            <Link onClick={closeMobileMenu} to={`/products/men`}>
              <h3>Men</h3>
            </Link>

            <ul>
              {menOptions.slice(1).map(({ name, value }) => (
                <Link
                  key={value}
                  onClick={closeMobileMenu}
                  to={`/products/men/${value}`}
                >
                  <li>{name}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="item">
            <Link onClick={closeMobileMenu} to={`/products/women`}>
              <h3>Women</h3>
            </Link>

            <ul>
              {womenOptions.slice(1).map(({ name, value }) => (
                <Link
                  key={value}
                  to={`/products/women/${value}`}
                  onClick={closeMobileMenu}
                >
                  <li>{name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
