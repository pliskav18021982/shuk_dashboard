/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { getDesc } from '../../utils/getDesc';
import './orderdetails.css';


export default function OrderDetails({ items }) {
 
  return (
    <>
      {items.map((item, index) => {
        return (
          <div className="item_row" key={`${item.id}${index}`}>
            <div>{item.name}</div>
            <div>{getDesc(item.desc)}</div>
            <div>
              <img
                className="image_order_thumb"
                src={`./..${item.image}`}
                alt=""
              />
            </div>
            <div>{`₪ ${item.price}`}</div>
            <div>{item.quantity}</div>
          </div>
        );
      })}
    </>
  );
}
