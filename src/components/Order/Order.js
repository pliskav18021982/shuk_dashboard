import React from 'react'
import { Link,withRouter } from 'react-router-dom';

function Order (props) {
  const { order: orderCombo, clickHandler, items } = props;
  const { order: orderActual, user } = orderCombo;
  const actionMenu = [
    { action: 'accept', icon: 'icon-checkmark2', link: '' },
    {
      action: 'edit',
      icon: 'icon-pencil',
      link: `/orders/${orderActual.id}`,
    },
    { action: 'delete', icon: 'icon-bin' },
  ];
  const orderClick = (event) => {
    event.preventDefault();
    clickHandler(orderActual.id);
  };
  
  return (
    <div className="order_row">
      <div className="small_cell">{orderActual.id}</div>
      <div className="small_cell">
        <a
          href={`https://54.216.45.40/public/store-owner/order/${orderActual.unique_order_id}`}
          className="small_cell letter-icon-title bold_text"
          onClick={orderClick}
        >
          {orderCombo.clicked ? `hide` : `show`}
        </a>
      </div>

      <div className="user_info">
        <div>{user.name}</div>
        <div>{user.phone}</div>
        <div>{user.email}</div>
      </div>
      <div className="small_cell text-center new-order-actions">
        {actionMenu.map((action) => (
          <Link
            to={{
              pathname: action.link,
              state: { orderActual, items, user },
            }}
          >
            <i key={action.action} className={`${action.icon} icon-1x`}></i>
          </Link>
        ))}
      </div>
      <div>Shuk Club (Ariel)</div>
      <div className="small_cell text-nowrap">
        <span className="text-semibold no-margin">₪ {orderActual.total}</span>
      </div>
      <div className="small_cell">
        <span className="badge badge-flat border-grey-800 text-default text-capitalize">
          {orderActual.orderstatus === 1 ? 'NEW' : ''}
        </span>
      </div>
    </div>
  );
}
export default withRouter (Order)