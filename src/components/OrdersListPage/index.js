/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Order from '../Order/Order';
import OrderDetails from '../OrderDetails/OrderDetails';
import { GET_ORDERS } from '../../utils/endpoints';
import { SERVER_PATH } from '../../utils/externalPaths';

import './orderlist.css';

function OrdersList() {
  const [orders, setOrders] = useState(
    JSON.parse(sessionStorage.getItem('orders')) || [],
  );
  const [orderItems, setOrderItems] = useState(
    JSON.parse(sessionStorage.getItem('items')) || [],
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(
    parseInt(sessionStorage.getItem('nextPage')) || 0,
  );
  const [totalOrders, setTotalOrders] = useState(0);
  const [showEndMessage, setShowEndMessage] = useState(false);

  const location = useLocation();

  const urlGetOrders = `${SERVER_PATH}/${GET_ORDERS}`;

  const orderClickHandler = (orderId) => {
    console.log(orderId)
    let orderClicked = orders.find((o) => o.order.id === orderId);
    const orderIndex = orders.findIndex((o) => o.order.id === orderId);
    const click = orderClicked.clicked;
    orderClicked = { ...orderClicked, clicked: !click };
    const newOrdersList = [
      ...orders.slice(0, orderIndex),
      orderClicked,
      ...orders.slice(orderIndex + 1),
    ];
    setOrders(newOrdersList);
  };

  const statusClickHandler = (orderId, status) => {
    let orderClicked = orders.find((o) => o.order.id === orderId);
    const orderIndex = orders.findIndex((o) => o.order.id === orderId);
    let { order } = orderClicked;
    order = { ...order, orderstatus_id: status };
    orderClicked = { ...orderClicked, order };
    setOrders([
      ...orders.slice(0, orderIndex),
      orderClicked,
      ...orders.slice(orderIndex + 1),
    ]);
  };

  const findItems = (itemList) => {
    const items = [];
    itemList.forEach((item) => {
      let orderItem = orderItems.find((i) => i.id === item.id);
      orderItem = { ...orderItem, quantity: item.quantity, limit: item.limit };
      items.push(orderItem);
    });
    return items;
  };

  const fetch = (currentPage) => {
    let orderData;
    if (
      orders.length === 0 ||
      totalOrders === 0 ||
      orders.length < totalOrders
    ) {
      const request = axios.request({
        method: 'get',
        url: urlGetOrders,
        params: {
          current_page: page,
          items_on_page: 10,
        },
        data: {},
      });

      request
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setTotalOrders(data.total_count);
          const newOrderItems = [];
          data.orderPage.items.forEach((item) => {
            if (orderItems.indexOf(item) === -1) {
              newOrderItems.push(item);
            }
          });
          const newData = [
            ...data.orderPage.orders.map(
              (order) => (order = { ...order, clicked: false }),
            ),
          ];
          if (location !== null && location.state !== null) {
            orderData = location.state.itemsString;
            console.log('orderdata', orderData);
            const orderId = location.state.orderId;
            const total = location.state.total;

            let orderEdited = orders.find((obj) => obj.order.id === orderId);
            let { order } = orderEdited;
            order = { ...order, total };
            orderEdited = { ...orderEdited, order, orderItemsDtos: orderData };
            console.log(orderEdited);

            const updatedIndex = orders.findIndex(
              (o) => o.order.id === orderId,
            );
            setOrderItems([...orderItems, ...newOrderItems]);
            setOrders([
              ...orders.slice(0, updatedIndex),
              orderEdited,
              ...orders.slice(updatedIndex + 1),
              ...data.orderPage.orders.map(
                (order) => (order = { ...order, clicked: false }),
              ),
            ]);
            sessionStorage.setItem(
              'items',
              JSON.stringify([...orderItems, ...newOrderItems]),
            );
            sessionStorage.setItem(
              'orders',
              JSON.stringify([
                ...orders.slice(0, updatedIndex),
                orderEdited,
                ...orders.slice(updatedIndex + 1),
                ...data.orderPage.orders.map(
                  (order) => (order = { ...order, clicked: false }),
                ),
              ]),
            );
          } else {
            setOrderItems([...orderItems, ...newOrderItems]);
            setOrders([
              ...orders,
              ...data.orderPage.orders.map(
                (order) => (order = { ...order, clicked: false }),
              ),
            ]);
            sessionStorage.setItem(
              'items',
              JSON.stringify([...orderItems, ...newOrderItems]),
            );
            sessionStorage.setItem(
              'orders',
              JSON.stringify([...orders, ...newData]),
            );
          }

          sessionStorage.setItem('nextPage', page + 1);
          setLoading(true);
        })
        .finally(() => {});
    } else {
      setShowEndMessage(true);
    }
  };
  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  const pageEnd = useRef();

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchMore();
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  useEffect(() => {
    fetch(page);
  }, [page]);

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
              clickHandler={orderClickHandler}
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

      <div className="load-controls">
        {showEndMessage ? (
          <div>No more items to load</div>
        ) : (
          <div>
            <div ref={pageEnd}>Loading ...</div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrdersList;
