/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Order from '../../components/Order/Order';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { GET_ORDERS } from '../../utils/endpoints';
import { SERVER_PATH } from '../../utils/externalPaths';

import './orderlist.css'

function OrdersListPage() {
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
  const [totalOrders, setTotalOrders] = useState(0)
  const [showEndMessage, setShowEndMessage] = useState(false)

  const location = useLocation();

  const urlGetOrders = `${SERVER_PATH}/${GET_ORDERS}`;

  const orderClickHandler = (orderId) => {
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
    let orderClicked = orders.find((o) => o.order.id === orderId)
    const orderIndex = orders.findIndex((o) => o.order.id === orderId)
    let {order} = orderClicked
    order = { ...order, orderstatus_id: status };
    orderClicked = {...orderClicked, order}
    setOrders([
      ...orders.slice(0, orderIndex),
      orderClicked,
      ...orders.slice(orderIndex + 1)
    ])
  }

  const findItems = (itemList) => {
    const items = [];
    itemList.forEach((item) => {
      let orderItem = orderItems.find((i) => i.id === item.id);
      orderItem = { ...orderItem, quantity: item.quantity };
      items.push(orderItem);
    });
    return items;
  };

  const fetch = (currentPage) => {
    let orderData;
    if (orders.length === 0 || totalOrders===0 || orders.length < totalOrders) {
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
          
          setTotalOrders(data.total_count)
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
      setShowEndMessage(true)
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

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler);
  //   };
  // }, []);

  // const scrollHandler = (e) => {
  //   if (
  //     e.target.documentElement.scrollHeight -
  //       (e.target.documentElement.scrollTop + window.innerHeight) <
  //     100
  //   ) {
  //     setLoading(true);
  //   }
  // };

  // useEffect(() => {
  //   if (props.location.state === null || props.location.state === undefined) {
  //     const request = axios.request({
  //       method: 'get',
  //       url: urlGetOrders,
  //       params: {
  //         current_page,
  //         items_on_page: 10,
  //       },
  //       data: {},
  //     });
  //     request
  //       .then((response) => response.data)
  // .then((data) => {
  //   const newOrderItems = []
  //   data.orderPage.items.map((item) => {
  //     if(orderItems.indexOf(item) === -1) {
  //       newOrderItems.push(item)
  //     }
  //   })
  //   setOrderItems([...orderItems, ...newOrderItems]);
  //   setOrders([
  //     ...orders,
  //     ...data.orderPage.orders.map(
  //       (order) => (order = { ...order, clicked: false }),
  //     ),
  //   ]);
  //   sessionStorage.removeItem('orders');
  //   sessionStorage.removeItem('items')
  //   sessionStorage.setItem('items', JSON.stringify(orderItems))
  //   sessionStorage.setItem('orders', JSON.stringify(orders))
  //   setCurrentPage((prev) => prev + 1);
  //   setInitialLoading(false);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // } else {
  //   const oldOrders = JSON.parse(sessionStorage.getItem('orders'));
  //   let oldItems = JSON.parse(sessionStorage.getItem('items'))

  //   const newItems = props.location.state.items;
  //   const orderId = props.location.state.orderId
  //         const itemsString = newItems
  //           .map((item) =>
  //             item.id.toString().concat(',').concat(item.quantity.toString()),
  //           )
  //           .join(',');
  //   let updatedOrder = oldOrders.find((order) => order.order.id === orderId)
  //   const updatedOrderIndex = oldOrders.indexOf(updatedOrder)
  //   updatedOrder = {...updatedOrder, orderItemsDtos: itemsString }
  //     'new array of orders, first part',
  //     ...oldOrders.slice(0, updatedOrderIndex-1),
  //   );
  //     'new new array of orders, last part',
  //     ...oldOrders.slice(updatedOrderIndex + 1),
  //   );
  //   setOrders([
  //     ...oldOrders.slice(0, updatedOrderIndex-1),
  //     updatedOrder,
  //     ...oldOrders.slice(updatedOrderIndex + 1),
  //   ]);
  //   newItems.map((item) =>
  //     {
  //       oldItems = oldItems.filter((i) => i.id !== item.id);
  //     oldItems.push(item)
  //   }
  //   );
  //   setOrderItems([...oldItems]);

  //   sessionStorage.removeItem('orders');
  //   sessionStorage.removeItem('items');
  //   sessionStorage.setItem('items', JSON.stringify([...oldItems]));
  //   sessionStorage.setItem('orders', JSON.stringify([...oldOrders.slice(0, updatedOrderIndex), updatedOrder, ...oldOrders.slice(updatedOrderIndex + 1)]));
  //   setCurrentPage((prev) =>  prev + 1);
  //   setInitialLoading(false);
  //   setLoading(false)
  // }

  // }, [loading]);

  return (
    <>
      <div className="row pt-4 p-0">
        <div className="col-xl-12">
          {/*--------------------------------------------- ORDERS TABLE ---------------------------------*/}
          {
            <div className="panel panel-flat dashboard-main-col mt-4">
              <div className="panel-heading">
                <h4 className="panel-title pl-3 pt-3">
                  <strong>New Orders</strong>
                </h4>
                <hr />
              </div>
              <div id="newOrdersTable" className="table-responsive ">
                <div className="table">
                  <div className="order_row header">
                    <div className="small_cell">Order Id</div>
                    <div className="small_cell">Order Info</div>
                    <div className="user_hidden">Client's Info</div>
                    <div className="user_info">
                      <div>Client's Name</div>
                      <div>Client's Phone</div>
                      <div>Client's Email</div>
                    </div>
                    <div className="small_cell text-center">Action</div>
                    <div>Store</div>
                    <div className="small_cell">Price</div>
                    <div className="small_cell">Order Status</div>
                  </div>
                  {orders.map((order, index) => (
                    <div key={order.id}>
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
              </div>
            </div>
          }
        </div>
        {/* <div className="col-xl-12">
                <div className="panel panel-flat dashboard-main-col mt-4">
                  <div className="panel-heading">
                    <h4 className="panel-title pl-3 pt-3">
                      <strong>Preparing Orders</strong>
                    </h4>
                    <hr />
                  </div>
                  <div className="table-responsive">
                    <div className="text-center text-muted pb-2">
                      <h4> No orders to show </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="panel panel-flat dashboard-main-col mt-4">
                  <div className="panel-heading">
                    <h4 className="panel-title pl-3 pt-3">
                      <strong>Self-Pickup Orders</strong>
                    </h4>
                    <hr />
                  </div>
                  <div className="table-responsive">
                    <div className="text-center text-muted pb-2">
                      <h4> No orders to show </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="panel panel-flat dashboard-main-col mt-4">
                  <div className="panel-heading">
                    <h4 className="panel-title pl-3 pt-3">
                      <strong>OnGoing Deliveries</strong>
                    </h4>
                    <hr />
                  </div>
                  <div className="text-center text-muted pb-2">
                    <h4> No orders to show </h4>
                  </div>
                </div>
              </div> */}

        {/* <input
          type="hidden"
          value="pY6gC8jKMsLcmCxDC3mzp8vLFWrSSuBMUjKXWssv"
          className="csrfToken"
        /> */}
        {/* <div
          id="newOrderModal"
          className="modal fade mt-5"
          tabIndex="-1"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <h5 className="modal-title mt-3">
                  {' '}
                  <i className="icon-bell3 animated-bell"></i>{' '}
                </h5>
              </div>
              <div
                className="float-right pr-3 pt-3"
                style={{ position: 'absolute', right: 0 }}
              >
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
              </div>
              <div className="modal-body" id="newOrdersData">
                <div className="d-flex justify-content-center">
                  <h3 className="text-muted"> No orders to show </h3>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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

export default OrdersListPage;
