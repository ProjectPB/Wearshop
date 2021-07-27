import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Logo from "../Logo";
import ProfileModal from "./ProfileModal";
import "./styles.scss";

const Header = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  const handleClickAway = () => {
    setProfileModalOpen(false);
  };

  return (
    <div className="header">
      <Logo />

      <nav>
        <p>PRODUCTS</p>
      </nav>

      <div className="icons">
        <ShoppingCartOutlinedIcon className="cartIcon" />
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <PersonOutlineOutlinedIcon
              className="profileIcon"
              onClick={handleProfileModal}
            />
            {profileModalOpen ? <ProfileModal /> : null}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};

export default Header;
