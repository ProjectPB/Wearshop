import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUserStart, signUpError } from "../../redux/User/user.actions";
import { WarningOutlined } from "@material-ui/icons";
import Button from "../forms/Button";
import Input from "../forms/Input";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signUpErrors: user.signUpErrors,
});

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, signUpErrors } = useSelector(mapState);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);

  useEffect(() => {
    return () => {
      dispatch(signUpError({}));
    };
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(signUpErrors) && signUpErrors.length > 0) {
      setErrors(signUpErrors);
    }
  }, [signUpErrors]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
  };

  return (
    <div className="signUpContainer">
      <div className="signUp">
        <h1>Sign Up</h1>

        <form className="body" onSubmit={handleFormSubmit}>
          <Input
            label="Full name"
            type="text"
            name="displayName"
            value={displayName}
            handleChange={(e) => setDisplayName(e.target.value)}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
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
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
