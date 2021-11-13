import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './orderpage.css';

function OrderPage() {
  const location = useLocation();

  const { order, items, user } = location.state;

  const [orderItems, setOrderItems] = useState(items);
  const navigate = useNavigate();

  const increaseButtonClickHandler = (index) => {
    const quantity = parseInt(orderItems[index].quantity);
    const itemEdited = { ...orderItems[index], quantity: quantity + 1 };
    setOrderItems([
      ...orderItems.slice(0, index),
      itemEdited,
      ...orderItems.slice(index + 1),
    ]);
  };
  const decreaseButtonClickHandler = (index) => {
    let quantity = orderItems[index].quantity;

    let itemEdited = orderItems[index];
    if (quantity <= 0) {
      itemEdited = { ...orderItems[index], quantity: 0 };
    } else {
      itemEdited = { ...orderItems[index], quantity: quantity - 1 };
    }
    setOrderItems([
      ...orderItems.slice(0, index),
      itemEdited,
      ...orderItems.slice(index + 1),
    ]);
  };

  const removeClickHandler = (index) => {
    setOrderItems([
      ...orderItems.slice(0, index),
      ...orderItems.slice(index + 1),
    ]);
  };

  const clearClickHandler = (e) => {
    setOrderItems([...items]);
  };

  const saveClickHandler = () => {
    const str = orderItems
      .map((item) => item.id + ',' + item.quantity)
      .join(',');
    const total = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    console.log('total', total);
    console.log(str);
    console.log(order);
    navigate(`/`, { state: { itemsString: str, orderId: order.id, total } });
  };

  return (
    <>
      <div className="user-block">
        <div className="user-avatar">
          <img src={user.avatar} alt="" />
        </div>
        <div className="user-info">
          <div>{user.name}</div>
          <div>{user.phone}</div>
          <div>{user.email}</div>
        </div>
      </div>
      <div className="items-block">
        <div className="items-item">
          {orderItems.length > 0 ? (
            orderItems.map((orderItem, index) => (
              <div className="order_item_row" key={orderItem.id + index}>
                <div className="item-image">
                  <img src={orderItem.image} alt={orderItem.name} />
                </div>
                <div className="item-info">
                  <div className="itemname">{orderItem.name}</div>
                  <div className="item-price">{orderItem.price}</div>
                  <div className="item-quantity">
                    <button onClick={(e) => decreaseButtonClickHandler(index)}>
                      -
                    </button>
                    <div className="quantity-input">{orderItem.quantity}</div>
                    <button onClick={(e) => increaseButtonClickHandler(index)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="item-button-section">
                  <button onClick={(e) => removeClickHandler(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3> There are no items in this order</h3>
          )}
        </div>
      </div>
      <div className="button-block">
        <button onClick={(e) => clearClickHandler()}>Clear</button>
        <button onClick={saveClickHandler}>Save</button>
      </div>
    </>
  );
}

export default OrderPage;
