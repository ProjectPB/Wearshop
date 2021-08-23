import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  resetPasswordStart,
  resetUserState,
  resetPasswordError,
} from "../../redux/User/user.actions";
import { WarningOutlined } from "@material-ui/icons";
import Button from "../forms/Button";
import Input from "../forms/Input";
import "./styles.scss";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordErrors: user.resetPasswordErrors,
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess, history, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetPasswordError({}));
    };
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(resetPasswordErrors) && resetPasswordErrors.length > 0) {
      setErrors(resetPasswordErrors);
    }
  }, [resetPasswordErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  return (
    <div className="resetContainer">
      <div className="reset">
        <p>Please provide an email to get a message with a password reset.</p>
        {errors.length > 0 && (
          <ul>
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
        <form className="body" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Send email</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
