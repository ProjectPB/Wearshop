import React from "react";
import { Avatar } from "@material-ui/core";
import { ExitToApp, ListAlt } from "@material-ui/icons";
import "./styles.scss";

const ProfileModal = () => {
  return (
    <div className="profileModal">
      <div>
        <p>@USERNAME@</p>
      </div>

      <br />

      <div>
        <ListAlt />
        <p>My profile</p>
      </div>

      <div>
        <ExitToApp />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfileModal;
