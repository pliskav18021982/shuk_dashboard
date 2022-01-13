/* eslint-disable no-unused-vars */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { orderStatuses } from '../../utils/orderstatuses';
import { restaurants } from '../../utils/restaurants';
import axios from 'axios';
import { SERVER_PATH } from '../../utils/externalPaths';
import { EDIT_ORDER, EDIT_ORDER_STATUS } from '../../utils/endpoints';
import { clearTextFromComas } from '../../utils/clearTextFromComas';
import formatDate from '../../utils/getFormattedDate';


import './order.css'

function Order(props) {
  const navigate = useNavigate();
  const { order, user, clickHandler, items, clicked, statusHandler } = props;
  const date =
    order.orderDate !== null ? JSON.parse(order.orderDate).date : 'oops';
  // console.log(`order ${order.id}`, order);
  const actionMenu = [
    {
      action: 'accept',
      payloadStatus: '11',
      icon: 'icon-checkmark2',
      link: `${SERVER_PATH}${EDIT_ORDER}${order.id}${EDIT_ORDER_STATUS}`,
      type: 'external',
    },
    {
      action: 'edit',
      icon: 'icon-pencil',
      link: `/orders/${order.id}`,
      type: 'internal',
    },
    {
      action: 'delete',
      payloadStatus: '6',
      icon: 'icon-bin',
      link: `${SERVER_PATH}${EDIT_ORDER}${order.id}${EDIT_ORDER_STATUS}`,
      type: 'external',
    },
  ];
  const orderClick = (event) => {
    event.preventDefault();
    clickHandler(order.id);
  };

  const actionClickHandler = (event, { type, link, payloadStatus }) => {
    if (type === 'internal') {
      navigate(`${link}`, { state: { order, user, items } });
    } else {
      const request = axios.request({
        method: 'put',
        url: link,
        data: payloadStatus,
        headers: { 'Content-Type': 'text/plain' },
      });
      console.log(request);
      request.then((response) => {
        if (response.status === 200) {
          statusHandler(order.id, payloadStatus);
        }
      });
    }
  };

  return (
    <>
      <div className="order-row-item1">{order.id}</div>
      <div className="order-row-item2">
        <div className='show__button' onClick={() => clickHandler(order.id)}>{clicked ? `hide` : `show`}</div>
      </div>
      <div className="order-row-item3">
        <div>{user.name}</div>
        <div>{user.phone}</div>
        <div>{user.email}</div>
      </div>
      <div className="order-row-item4">
        <div>{restaurants[order.restaurant_id]}</div>
        <div>
          <span className="text-semibold no-margin">₪ {order.total}</span>
        </div>
        <div className="order-item-buttonstyle-stroked">
          {orderStatuses[order.orderstatus_id]}
        </div>
      </div>
      <div className="order-row-item5">
        {actionMenu.map((action) => (
          <i
            key={action.action}
            onClick={(e) => actionClickHandler(e, action)}
            className={`${action.icon} icon-1x`}
          ></i>
        ))}
      </div>
      <div className="order-row-item6">
        <div className="order-row-subitem1">
          <div className="order-item-buttonstyle">
            <span>
              <i className="icon-location3 icon-pr3"></i>
            </span>
            {clearTextFromComas(order.address)}
          </div>
        </div>
        <div className="order-row-subitem2">
          <div className="order-item-buttonstyle-stroked">
            <span>
              <i className="icon-folder-plus icon-pr3"></i>
            </span>
            {formatDate(new Date(order.createdAt))}
          </div>
        </div>
        <div className="order-row-subitem3">
          <div className="order-item-buttonstyle">
            <span>
              <i className="icon-calendar icon-pr3"></i>
            </span>
            {order.orderDate !== null && formatDate(new Date(date))}
          </div>
        </div>
        <div className="order-row-subitem4">
          <div className="order-item-buttonstyle-stroked">
            <span>
              <i className="icon-coin-dollar icon-pr3"></i>
            </span>
            {order.payment_mode}
          </div>
        </div>
      </div>
    </>
  );
}
export default Order;
