import React from "react";
import { Close } from "@material-ui/icons";
import "./styles.scss";

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleModal()} />,
    <div className="modalWrap">
      <div className="modal">
        <Close className="closeIcon" onClick={() => toggleModal()} />
        {children}
      </div>
    </div>,
  ];
};

export default Modal;
