/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

import { SERVER_PATH } from '../../utils/externalPaths';


import './leftmenu.css'

function LeftMenu({items}) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const overlayHandler = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };
  const menuOverHandler = () =>{
    setIsMenuExpanded(true)
    console.log('mouse over')
    overlayHandler()
  }
  const menuLeaveHandler = () =>{
    setIsMenuExpanded(false)
    overlayHandler()
  }
  
  

  
  
  return (
    <div
      className={`left-menu-wrapper ${isMenuExpanded && 'expanded'}`}
      onMouseEnter={menuOverHandler}
      onMouseLeave={menuLeaveHandler}
    >
      <div className="left-menu-content">
        <div className="left-menu-control">
          {isMenuExpanded ? (
            <i
              className={`icon-circle-left2 icon-1_5x`}
              onClick={overlayHandler}
            ></i>
          ) : (
            <i
              className={`icon-circle-right2 icon-1_5x`}
              onClick={overlayHandler}
            ></i>
          )}
        </div>
        {items.map((menuItem) => (
          <div className="left-menu-item" key={menuItem.id}>
            <div
              className={`${isMenuExpanded} ? left-menu-thumb : left-menu-image`}
            >
              <img src={`${menuItem.image}`} alt="" />
            </div>

            {isMenuExpanded && (
              <div className="left-menu-item-info">
                <div>{menuItem.name}</div>
                <div>Total: {menuItem.totalItemsAddon}</div>
                <div>Limit: {menuItem.limit}</div>
                <div>Remains: {menuItem.limit-menuItem.totalItemsAddon}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftMenu
