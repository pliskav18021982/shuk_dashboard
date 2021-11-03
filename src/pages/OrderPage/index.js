import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './orderpage.css'

function OrderPage({location, history}) {
 
  const {state} = location
  const { orderActual: order, items, user } = state;

  const [orderItems, setOrderItems] = useState(items)
  
  const increaseButtonClickHandler = (index) => {
    const quantity = parseInt(orderItems[index].quantity);
    const itemEdited = { ...orderItems[index], quantity: quantity + 1};
    setOrderItems([...orderItems.slice(0, index), itemEdited, ...orderItems.slice(index+1)])
  }
  const decreaseButtonClickHandler = (index) => {
    let quantity = orderItems[index].quantity;
    
    let itemEdited = orderItems[index]
    if(quantity === 0) {
          itemEdited = { ...orderItems[index], quantity: 0 };
    }else{
          itemEdited = { ...orderItems[index], quantity: quantity - 1};
    }
    setOrderItems([
          ...orderItems.slice(0, index),
          itemEdited,
          ...orderItems.slice(index + 1),
        ]);  };

  const removeClickHandler = (index) => {
    setOrderItems([
          ...orderItems.slice(0, index),
          ...orderItems.slice(index + 1),
        ]);  
      }

  const clearClickHandler = (e) => {
setOrderItems([...items])
  }

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
              <div className="order_item_row" key={orderItem.id+index}>
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
        <button>
          <Link
            to={{
              pathname: '/',
              state: { items: orderItems,
              orderId: order.id  },
            }}
            
          >
            Save
          </Link>
        </button>
      </div>
    </>
  );
}

export default withRouter (OrderPage)
