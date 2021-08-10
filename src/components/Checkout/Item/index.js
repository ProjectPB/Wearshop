import React from "react";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { HighlightOff } from "@material-ui/icons";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "./../../../redux/Cart/cart.actions";

const Item = (product) => {
  const dispatch = useDispatch();
  const { productName, productThumbnail, productPrice, quantity, documentID } =
    product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <tr className="itemRow">
      <td>
        <img src={productThumbnail} alt={productName} />
      </td>
      <td>{productName}</td>
      <td>
        <span
          className="cartBtn"
          onClick={() => handleReduceItem(product)}
        >{`< `}</span>
        <span>{quantity}</span>
        <span
          className="cartBtn"
          onClick={() => handleAddProduct(product)}
        >{` >`}</span>
      </td>
      <td>
        {" "}
        <NumberFormat
          value={productPrice}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" PLN"}
          decimalScale="2"
        />
      </td>
      <td>
        <span
          className="cartBtn"
          onClick={() => handleRemoveCartItem(documentID)}
        >
          <HighlightOff fontSize="large" />
        </span>
      </td>
    </tr>
  );
};

export default Item;
