/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { GET_ORDERS } from '../../utils/endpoints';
import { ACCOUNT_SERVER_PATH } from '../../utils/externalPaths';

// onClick={(e) => saveClickHandler(e, order.id, orderItems)}
 function OrdersListPage(props) {
  
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [current_page, setCurrentPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const urlGetOrders = `${ACCOUNT_SERVER_PATH}/${GET_ORDERS}`;

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

  const findItems = (itemList) => {
    const ids = itemList.split(',').filter((item, index) => index % 2 === 0);
    const quantityArray = itemList
      .split(',')
      .filter((item, index) => index % 2 !== 0);
    const items = [];
    ids.forEach((id) =>
      items.push(orderItems.find((o) => o.id === parseInt(id))),
    );
    return items.map(
      (item, index) =>
        (item = {
          ...item,
          quantity: quantityArray[index],
        }),
    );
  };

  const findItemsAdv = (itemList) => {
    const ids = itemList.split(',').filter((item, index) => index % 2 === 0);
    const quantityArray = itemList
      .split(',')
      .filter((item, index) => index % 2 !== 0);
    const items = [];
    ids.forEach((id) =>
      items.push(orderItems.find((o) => o.id === parseInt(id))),

    );
    return items.map(
      (item, index) =>
        (item = {
          ...item,
          quantity: quantityArray[index],
        }),
    );
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (props.location.state === null || props.location.state === undefined) {
      const request = axios.request({
        method: 'get',
        url: urlGetOrders,
        params: {
          current_page,
          items_on_page: 10,
        },
        data: {},
      });
      request
        .then((response) => response.data)
        .then((data) => {
          const newOrderItems = []
          data.orderPage.items.forEach((item) => {
            if(orderItems.indexOf(item) === -1) {
              newOrderItems.push(item)
            }
          })
          setOrderItems([...orderItems, ...newOrderItems]);
          setOrders([
            ...orders,
            ...data.orderPage.orders.map(
              (order) => (order = { ...order, clicked: false }),
            ),
          ]);
          localStorage.removeItem('orders');
          localStorage.removeItem('items')
          localStorage.setItem('items', JSON.stringify(orderItems))
          localStorage.setItem('orders', JSON.stringify(orders))
          setCurrentPage((prev) => prev + 1);
          setInitialLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const oldOrders = JSON.parse(localStorage.getItem('orders'));
      let oldItems = JSON.parse(localStorage.getItem('items'))
      console.log('orders from localstorage', oldOrders)
      
      const newItems = props.location.state.items;
      const orderId = props.location.state.orderId
      console.log('orderid from props', orderId);
            const itemsString = newItems
              .map((item) =>
                item.id.toString().concat(',').concat(item.quantity.toString()),
              )
              .join(',');
      let updatedOrder = oldOrders.find((order) => order.order.id === orderId)
      console.log('order before edit', updatedOrder)
      const updatedOrderIndex = oldOrders.indexOf(updatedOrder)
      console.log('edit order index in the array', updatedOrderIndex)
      updatedOrder = {...updatedOrder, orderItemsDtos: itemsString }
      console.log('order after edit', updatedOrder);
      console.log(
        'new array of orders, first part',
        ...oldOrders.slice(0, updatedOrderIndex),
      );
      console.log('new order', updatedOrder);
      console.log(
        'new new array of orders, last part',
        ...oldOrders.slice(updatedOrderIndex + 1),
      );
      setOrders([
        ...oldOrders.slice(0, updatedOrderIndex-1),
        updatedOrder,
        ...oldOrders.slice(updatedOrderIndex + 1),
      ]);
      newItems.forEach((item) =>
        {
          oldItems = oldItems.filter((i) => i.id !== item.id);
        oldItems.push(item)
      }
      );
      setOrderItems([...oldItems]);
      
      localStorage.removeItem('orders');
      localStorage.removeItem('items');
      localStorage.setItem('items', JSON.stringify([...oldItems]));
      localStorage.setItem('orders', JSON.stringify([...oldOrders.slice(0, updatedOrderIndex), updatedOrder, ...oldOrders.slice(updatedOrderIndex + 1)]));
      console.log('current page', current_page)
      setCurrentPage((prev) => { 
        console.log('prev page', prev)
        return prev + 1
      });
      setInitialLoading(false);
      setLoading(false)
    }
    
    
  }, [loading]);
  
  
  return (
    <>
      <div className="row pt-4 p-0">
        <div className="col-xl-12">
          {/*--------------------------------------------- ORDERS TABLE ---------------------------------*/}
          {initialLoading ? (
            <div>loading</div>
          ) : (
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
                  {orders.map((order, index) => {
                    return (
                      <div key={order.id}>
                        <Order
                          order={order}
                          items={findItems(order.orderItemsDtos)}
                          clickHandler={orderClickHandler}
                          index={index}
                        />
                        {order.clicked && (
                          <OrderDetails
                            order={order}
                            items={findItems(order.orderItemsDtos)}
                            index={index}
                          />
                        )}
                        ,
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
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

        <input
          type="hidden"
          value="pY6gC8jKMsLcmCxDC3mzp8vLFWrSSuBMUjKXWssv"
          className="csrfToken"
        />
        <div
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
        </div>
      </div>
    </>
  );
}


export default OrdersListPage