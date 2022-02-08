/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';


import Order from '../Order/Order';
import OrderDetails from '../OrderDetails/OrderDetails';


import './orderlist.css';

function OrdersList({ orders, clickHandler, findItems, statusClickHandler }) {
  return (
    <>
      <div id="newOrdersTable" className="grid-table">
        <div className="grid-item-header header">
          <div className="header-item1">Order Id</div>
          <div className="header-item2">Order Info</div>
          {/* <div>Client's Info</div> */}
          <div className="header-item3">
            <div>Client's Name</div>
            <div>Client's Phone</div>
            <div>Client's Email</div>
          </div>
          <div className="header-item4">
            <div>Store</div>
            <div>Price</div>
            <div>Order Status</div>
          </div>
          <div className="header-item5">Action</div>
        </div>
        {orders.map((order, index) => (
          <div className="order-row-grid" key={order.id}>
            <Order
              order={order.order}
              user={order.user}
              items={findItems(order.orderItemsDtos)}
              clickHandler={clickHandler}
              index={index}
              clicked={order.clicked}
              statusHandler={statusClickHandler}
            />
            {order.clicked && (
              <OrderDetails
                order={order}
                items={findItems(order.orderItemsDtos)}
                index={index}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default OrdersList;
