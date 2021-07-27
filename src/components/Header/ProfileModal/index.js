import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ExitToApp, ListAlt, PersonOutlineOutlined } from "@material-ui/icons";
import { signOutUserStart } from "./../../../redux/User/user.actions";
import Button from "../../forms/Button";
import { checkUserIsAdmin } from "../../../utils";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProfileModal = () => {
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
              <div className="row admin">
                <p>Admin</p>
              </div>
            </Link>
          )}

          <div className="row">
            <ListAlt />
            <p>My profile</p>
          </div>

          <div className="row" onClick={signOut}>
            <ExitToApp />
            <p>Logout</p>
          </div>
        </div>
      )}

      {!currentUser && (
        <div className="menu">
          <Link className="row" to="/register">
            <Button>Sign Up</Button>
          </Link>

          <Link className="row" to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
