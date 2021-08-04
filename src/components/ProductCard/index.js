import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const ProductCard = (product) => {
  const { documentID, productThumbnail, productName, productPrice } = product;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  return (
    <div className="productCard">
      <div className="thumbnail">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <p className="name">{productName}</p>
        <p className="price">{productPrice} PLN</p>
      </div>
    </div>
  );
};

export default ProductCard;
