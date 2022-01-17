/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */

import React from 'react'
import { getDesc } from '../../utils/getDesc';
import './orderdetails.css';


export default function OrderDetails({ items }) {
 
  return (
    <>
      {items.map((item, index) => {
        return (
          <div className="item_row" key={`${item.id}${index}`}>
            <div className='item__row-item1'>{item.name}</div>
            <div className="item__row-item2">
              <img
                className="image_order_thumb"
                src={`https://shuk.club${item.image}`}
                alt=""
              />
            </div>
            <div className='item__row-item3'>{`₪ ${item.price}`}</div>
            <div className='item__row-item4'>{item.quantity}</div>
          </div>
        );
      })}
    </>
  );
}
