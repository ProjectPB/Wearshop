import React from "react";
import "./styles.scss";

const Input = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="inputContainer">
      {label && <label>{label}</label>}

      <input className="input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default Input;
