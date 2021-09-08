import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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

const Checkout = () => {
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
            <h2>Total: {total.toFixed(2)} PLN</h2>
          </div>

          <div className="buttonsRow">
            <Button onClick={() => history.goBack()}>Return</Button>
            <Link to="/payment">
              <Button>Checkout</Button>
            </Link>
          </div>
        </div>
      ) : (
        <p>{errMsg}</p>
      )}
    </div>
  );
};

export default Checkout;
