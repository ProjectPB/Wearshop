import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { MenuOutlined } from "@material-ui/icons";
import Logo from "../Logo";
import ProfileModal from "../ProfileModal";
import { menOptions, womenOptions } from "../../utils/config";
import NavMenu from "../NavMenu";
import MobileNav from "../MobileNav";
import "./styles.scss";

const mapState = (state) => ({
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = () => {
  const { totalNumCartItems } = useSelector(mapState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    if (windowWidth > 600) {
      closeMobileMenu();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const handleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  const handleClickAway = () => {
    setProfileModalOpen(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const menuConfig = {
    menOptions,
    womenOptions,
    menuOpen,
    openMenu,
    closeMenu,
  };

  const mobileMenuConfig = {
    menOptions,
    womenOptions,
    mobileMenuOpen,
    closeMobileMenu,
  };

  return (
    <div className="headerContainer">
      <div className="header">
        <Logo />

        <div
          className="productsLink"
          onMouseOver={openMenu}
          onMouseOut={closeMenu}
        >
          <Link to="/products" onClick={closeMenu}>
            <p className="navLink">products</p>
          </Link>
          {windowWidth > 600 && <NavMenu {...menuConfig} />}
        </div>

        <div className="icons">
          <div className="icon">
            <Link to="/cart">
              <div className="cartContainer">
                <ShoppingCartOutlinedIcon className="cartIcon" />
                <p>{totalNumCartItems}</p>
              </div>
            </Link>
          </div>

          <div className="icon">
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="profileContainer">
                <PersonOutlineOutlinedIcon
                  className="profileIcon"
                  onClick={handleProfileModal}
                />
                {profileModalOpen ? (
                  <ProfileModal close={() => handleClickAway()} />
                ) : null}
              </div>
            </ClickAwayListener>
          </div>

          {windowWidth <= 600 && (
            <div className="icon">
              <MenuOutlined className="menuIcon" onClick={handleMobileMenu} />
            </div>
          )}
        </div>
      </div>
      {mobileMenuOpen && <MobileNav {...mobileMenuConfig} />}
    </div>
  );
};

export default Header;
