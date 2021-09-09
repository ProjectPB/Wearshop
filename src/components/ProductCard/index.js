import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./../forms/Button";
import { addProduct } from "./../../redux/Cart/cart.actions";
import "./styles.scss";
import { Add, ShoppingCartOutlined } from "@material-ui/icons";
import { useSnackbar } from "notistack";

const ProductCard = (product) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { documentID, productThumbnail, productName, productPrice } = product;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const handleAddToCart = (product, variant) => {
    if (!product) return;
    dispatch(addProduct(product));

    enqueueSnackbar(`${productName} added to cart.`, { variant });
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCard">
      <div className="thumbnail">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <div className="detailsLeft">
          <p className="name">{productName}</p>
          <p className="price">{productPrice} PLN</p>
        </div>
        <div className="detailsRight">
          <Button
            {...configAddToCartBtn}
            onClick={() => handleAddToCart(product, "success")}
            style={{ padding: "0.4rem 0.8rem" }}
          >
            <Add />
            <ShoppingCartOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
