import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import { apiInstance } from "./../../utils";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "./../../redux/Cart/cart.selectors";
import { saveOrderHistory } from "./../../redux/Orders/orders.actions";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  useEffect(() => {
    if (itemCount < 1) {
      history.push("/products");
    }
  }, [itemCount]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance
      .post("/payments/create", {
        amount: (total * 100).toFixed(2) * 1,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: total,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    } = item;
                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  const handleShipping = (e) => {
    const { name, value } = e.target;

    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;

    setBillingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping</h2>

          <Input
            required
            label="Recipient Name"
            name="recipientName"
            handleChange={(e) => setRecipientName(e.target.value)}
            value={recipientName}
            type="text"
          />

          <Input
            required
            label="Line 1"
            name="line1"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.line1}
            type="text"
          />

          <Input
            label="Line 2"
            name="line2"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.line2}
            type="text"
          />

          <Input
            required
            label="City"
            name="city"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.city}
            type="text"
          />

          <Input
            required
            label="State"
            name="state"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.state}
            type="text"
          />

          <Input
            required
            label="Postal Code"
            name="postal_code"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.postal_code}
            type="text"
          />

          <div className="dropdownContainer">
            <label>Country</label>
            <CountryDropdown
              className="dropdown"
              onChange={(val) =>
                handleShipping({
                  target: { name: "country", value: val },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
        </div>

        <div className="group">
          <h2>Billing Address</h2>

          <Input
            required
            label="Name on Card"
            name="nameOnCard"
            handleChange={(e) => setNameOnCard(e.target.value)}
            value={nameOnCard}
            type="text"
          />

          <Input
            required
            label="Line 1"
            name="line1"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.line1}
            type="text"
          />

          <Input
            label="Line 2"
            name="line2"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.line2}
            type="text"
          />

          <Input
            required
            label="City"
            name="city"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.city}
            type="text"
          />

          <Input
            required
            label="State"
            name="state"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.state}
            type="text"
          />

          <Input
            required
            label="Postal Code"
            name="postal_code"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.postal_code}
            type="text"
          />

          <div className="dropdownContainer">
            <label>Country</label>
            <CountryDropdown
              className="dropdown"
              onChange={(val) =>
                handleShipping({
                  target: { name: "country", value: val },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>

        <div className="group">
          <h2 className="cardDetails">Card Details</h2>
          <CardElement options={configCardElement} />
        </div>

        <Button type="submit">Pay Now</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
