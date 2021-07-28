import React from "react";
import AdminProducts from "../../components/AdminProducts";
import NewProduct from "../../components/NewProduct";
import "./styles.scss";

const Admin = () => {
  return (
    <div className="admin">
      <AdminProducts />
      <NewProduct />
    </div>
  );
};

export default Admin;
