import React, { useState } from "react";
import Modal from "./../../components/Modal";
import AdminProducts from "../../components/AdminProducts";
import NewProduct from "../../components/NewProduct";
import Button from "../../components/forms/Button";
import "./styles.scss";

const Admin = () => {
  const [hideModal, setHideModal] = useState(true);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const closeModal = () => {
    setHideModal(true);
  };

  return (
    <div className="admin">
      <div className="adminHeader">
        <Button onClick={() => toggleModal()}>Add product</Button>
      </div>
      <AdminProducts />

      <Modal {...configModal}>
        <NewProduct close={() => closeModal()} />
      </Modal>
    </div>
  );
};

export default Admin;
