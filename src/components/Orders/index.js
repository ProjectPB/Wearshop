import React from "react";

import "./styles.scss";

const Orders = () => {
  return (
    <div className="ordersContainer">
      <h1>ORDERS HISTORY</h1>
      <table className="orders">
        <tbody>
          <tr>
            <th>DATE</th>
            <th>ID</th>
            <th>PRICE</th>
          </tr>
          <tr>
            <td>@date1@</td>
            <td>@id1@</td>
            <td>@price1@</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
