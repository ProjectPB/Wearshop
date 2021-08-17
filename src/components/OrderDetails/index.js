import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getOrderDetailsStart,
  setOrderDetails,
} from "./../../redux/Orders/orders.actions";
import "./styles.scss";

const columns = [
  {
    id: "productThumbnail",
    label: "Image",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
];

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      return `${columnValue} PLN`;
    case "productThumbnail":
      return <img src={columnValue} className="thumbnail" alt="" />;
    default:
      return columnValue;
  }
};

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderID } = useParams();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;
  const orderItems = orderDetails && orderDetails.orderItems;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));

    return () => {
      dispatch(setOrderDetails({}));
    };
  }, [dispatch, orderID]);

  return (
    <div className="orderDetailsContainer">
      <h1>Order ID: {orderID}</h1>

      <table className="orderDetails">
        <thead>
          <tr>
            {columns.map((column, index) => {
              const { label } = column;
              return <th key={index}>{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, index) => {
              return (
                <tr className="order" key={index}>
                  {columns.map((column, index) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const formattedText = formatText(columnName, columnValue);

                    return <td key={index}>{formattedText}</td>;
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>

      <h1 className="price">Total: {orderTotal} PLN</h1>
    </div>
  );
};

export default OrderDetails;
