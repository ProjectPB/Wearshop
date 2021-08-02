import React from "react";
import "./styles.scss";

const Product = (product) => {
  const { documentID, productThumbnail, productName, productPrice } = product;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  return (
    <div className="product">
      <div className="thumbnail">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="details">
        <p className="name">{productName}</p>
        <p className="price">{productPrice} PLN</p>
      </div>
    </div>
  );
};

export default Product;
