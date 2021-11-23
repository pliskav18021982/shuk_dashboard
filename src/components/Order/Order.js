import React from 'react'
import { useNavigate } from 'react-router-dom';
import { orderStatuses } from '../../utils/orderstatuses';
import { restaurants } from '../../utils/restaurants';
import axios from 'axios';
import { SERVER_PATH } from '../../utils/externalPaths';
import { EDIT_ORDER, EDIT_ORDER_STATUS } from '../../utils/endpoints';

function Order (props) {
  const navigate = useNavigate()
  const { order, user, clickHandler, items, clicked, statusHandler } = props;
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

  const actionClickHandler = (event, {type, link, payloadStatus}) => {
    if (type==='internal'){
      navigate(`${link}`, { state: { order, user, items} })}
    else{
      const request = axios.request({
        method: 'put',
        url: link,
        data: payloadStatus,
        headers: {"Content-Type": "text/plain"},
      });
      console.log(request)
      request
        .then((response) => {
          if(response.status===200) {
            statusHandler(order.id, payloadStatus)
          }
        })
        
    }
  }
  
  return (
    <div className="order_row">
      <div className="small_cell">{order.id}</div>
      <div className="small_cell">
        <a
          href={`https://54.216.45.40/public/store-owner/order/${order.unique_order_id}`}
          className="small_cell letter-icon-title bold_text"
          onClick={orderClick}
        >
          {clicked ? `hide` : `show`}
        </a>
      </div>

      <div className="user_info">
        <div>{user.name}</div>
        <div>{user.phone}</div>
        <div>{user.email}</div>
      </div>
      <div className="small_cell text-center new-order-actions">
        {actionMenu.map((action) => (
          <i
            key={action.action}
            onClick={(e) => actionClickHandler(e, action)}
            className={`${action.icon} icon-1x`}
          ></i>
        ))}
      </div>
      <div>{restaurants[order.restaurant_id]}</div>
      <div className="small_cell text-nowrap">
        <span className="text-semibold no-margin">₪ {order.total}</span>
      </div>
      <div className="small_cell">
        <span className="badge badge-flat border-grey-800 text-default text-capitalize">
          {orderStatuses[order.orderstatus_id]}
        </span>
      </div>
    </div>
  );
}
export default Order