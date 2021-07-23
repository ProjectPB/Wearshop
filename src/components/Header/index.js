import React, { useState } from "react";
import { Avatar, ClickAwayListener } from "@material-ui/core";
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
        <p>Men</p>
        <p>Women</p>
      </nav>

      <div className="icons">
        <ShoppingCartOutlinedIcon fontSize="large" className="cartIcon" />
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Avatar onClick={handleProfileModal} />
            {profileModalOpen ? <ProfileModal /> : null}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};

export default Header;
