import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import Input from "../forms/Input";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="signInContainer">
      <div className="signIn">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="body">
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/recover">
            <p>Forgot Password</p>
          </Link>
          <Button type="submit">Sign In</Button>
          <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
