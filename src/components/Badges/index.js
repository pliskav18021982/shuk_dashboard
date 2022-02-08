import React from 'react'
import Badge from '../Badge';

export default function Badges() {
  const content = [
    {
      id: 1,
      number: 1,
      type: 'Stores',
    },
    {
      id:2,
      number: 0,
      type: 'Orders Processed',
    },
    {
      id:3,
      number: 0,
      type: 'Items Sold',
    },
    {
      id:4,
      number: '₪ 0',
      type: 'Earning',
    },
  ];
  return (
    
    <>
      <div className="row mt-2">
        {content.map((item, index) => <Badge key={item.id+index} content={item}/>)}
      </div>
    </>
  );
}
