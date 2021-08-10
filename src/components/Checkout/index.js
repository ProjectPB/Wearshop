import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import {
  selectCartItems,
  selectCartTotal,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from "./../forms/Button";
import Item from "./Item";
import "./styles.scss";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Checkout = ({}) => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);

  const errMsg = "You have no items in your cart.";

  return (
    <div className="checkoutContainer">
      {cartItems.length > 0 ? (
        <div className="checkout">
          <table>
            <tbody>
              <tr className="headerRow">
                <th>Product</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>

              {cartItems.map((item, index) => {
                return <Item key={index} {...item} />;
              })}
            </tbody>
          </table>

          <div className="totalRow">
            <h2>
              Total:{" "}
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" PLN"}
                decimalScale="2"
              />
            </h2>
          </div>

          <div className="buttonsRow">
            <Button onClick={() => history.goBack()}>Continue Shopping</Button>
            <Button>Checkout</Button>
          </div>
        </div>
      ) : (
        <p>{errMsg}</p>
      )}
    </div>
  );
};

export default Checkout;
