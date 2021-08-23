import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
  signInError,
} from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import Input from "../forms/Input";
import { WarningOutlined } from "@material-ui/icons";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signInErrors: user.signInErrors,
});

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, signInErrors } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);

  useEffect(() => {
    return () => {
      dispatch(signInError({}));
    };
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(signInErrors) && signInErrors.length > 0) {
      setErrors(signInErrors);
    }
  }, [signInErrors]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors([]);
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
          {errors.length > 0 && (
            <ul className="errors">
              {errors.map((err, index) => {
                return (
                  <li key={index}>
                    <WarningOutlined />
                    {err}
                  </li>
                );
              })}
            </ul>
          )}
          <Button className="submitLogin button" type="submit">
            Sign In
          </Button>
          <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
