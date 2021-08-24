import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ExitToApp, ListAlt, PersonOutlineOutlined } from "@material-ui/icons";
import { signOutUserStart } from "../../redux/User/user.actions";
import { checkUserIsAdmin } from "../../utils/index";
import Button from "../forms/Button";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProfileModal = ({ close }) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="profileModal">
      {currentUser && (
        <div className="menu">
          <div className="profile">
            <PersonOutlineOutlined />
            <p>{currentUser.displayName}</p>
          </div>

          {checkUserIsAdmin(currentUser) && (
            <Link to="/admin">
              <div className="row adminLink">
                <p>Admin</p>
              </div>
            </Link>
          )}

          <Link to="/profile">
            <div className="row">
              <ListAlt />
              <p>My profile</p>
            </div>
          </Link>

          <div className="row" onClick={signOut}>
            <ExitToApp />
            <p>Logout</p>
          </div>
        </div>
      )}

      {!currentUser && (
        <div className="menu">
          <Link onClick={() => close()} className="row" to="/register">
            <Button>Sign Up</Button>
          </Link>

          <Link onClick={() => close()} className="row" to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
