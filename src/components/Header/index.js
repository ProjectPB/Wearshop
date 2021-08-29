import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Logo from "../Logo";
import ProfileModal from "../ProfileModal";
import { menOptions, womenOptions } from "../../utils/config";
import NavMenu from "../NavMenu";
import "./styles.scss";

const mapState = (state) => ({
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalNumCartItems } = useSelector(mapState);

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

  return (
    <div className="header">
      <Logo />

      <Link to="/products">
        <div
          className="productsLink"
          onMouseOver={openMenu}
          onMouseOutCapture={closeMenu}
        >
          <p className="navLink">products</p>

          {window.innerWidth > 600 && <NavMenu {...menuConfig} />}
        </div>
      </Link>

      <div className="icons">
        <Link to="/cart">
          <div className="cartContainer">
            <ShoppingCartOutlinedIcon className="cartIcon" />
            <p>{totalNumCartItems}</p>
          </div>
        </Link>
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
    </div>
  );
};

export default Header;
