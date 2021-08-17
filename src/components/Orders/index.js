import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "./../../redux/Orders/orders.actions";
import moment from "moment";
import "./styles.scss";
import { useHistory } from "react-router-dom";

const columns = [
  {
    id: "documentID",
    label: "ID",
  },
  {
    id: "orderCreatedDate",
    label: "Date",
  },
  {
    id: "orderTotal",
    label: "Price",
  },
];

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `${columnValue} PLN`;
    case "orderCreatedDate":
      return moment(columnValue.nano).format("DD/MM/YYYY");
    default:
      return columnValue;
  }
};

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, [currentUser.id, dispatch]);

  return (
    <div className="ordersContainer">
      <h1>ORDERS HISTORY</h1>
      <table className="orders">
        <thead>
          <tr>
            {columns.map((column, index) => {
              const { label } = column;
              return <th key={index}>{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderHistory) &&
            orderHistory.length > 0 &&
            orderHistory.map((row, index) => {
              const { documentID } = row;

              return (
                <tr
                  className="order"
                  key={index}
                  onClick={() => history.push(`/order/${documentID}`)}
                >
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
    </div>
  );
};

export default Orders;
