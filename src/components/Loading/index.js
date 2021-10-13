import React from "react";
import ReactLoading from "react-loading";
import "./styles.scss";

const Loading = () => {
  return (
    <div className="container">
      <ReactLoading
        type={"spin"}
        color={"#1a50a1"}
        height={"50px"}
        width={"50px"}
      />
    </div>
  );
};

export default Loading;
