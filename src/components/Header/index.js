/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import {NavLink} from 'react-router-dom'

export default function Header() {
  // <a
  //                 href="#"
  //                 className="navbar-nav-link dropdown-toggle "
  //                 data-toggle="dropdown"
  //               >
  //                 <i className="icon-stack-star mr-2"></i>
  //                 Items &amp; Menu
  //               </a>
               
  const links = [
    {
      link: '/home',
      text: 'Dashboard',
      icon: 'icon-meter-fast',
      className: 'navbar-nav-link',
    },
    {
      link: '/public/store-owner/stores',
      text: 'Stores',
      icon: 'icon-store2',
      className: 'navbar-nav-link',
    },
    {
      link: '/',
      text: 'Orders',
      icon: 'icon-basket',
      className: 'navbar-nav-link',
    },
    {
      link: '/public/store-owner/earnings',
      text: 'Earnings',
      icon: 'icon-coin-dollar',
      className: 'navbar-nav-link',
    },
    
  ];
  return (
    <>
      <div className="navbar navbar-expand-md navbar-dark">
        <div className="navbar-brand wmin-0 mr-5">
          <a
            href="https://54.216.45.40/public/store-owner/dashboard"
            className="d-inline-block"
          >
            <img src="Dashboard_files/dashboard-logo.png" alt="Dashboard" />
          </a>
        </div>
        <div className="d-md-none">
          <button
            className="navbar-toggler dropdown-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-mobile"
          >
            <span>store1</span>
          </button>
          <div className="dropdown-menu dropdown-menu-right" id="navbar-mobile">
            <a
              href="#"
              className="dropdown-item dropdown-toggle"
              data-toggle="dropdown"
            >
              <span>
                <i className="icon-earth"></i>
              </span>
            </a>
            <div className="dropdown-menu">
              <a
                href="https://54.216.45.40/public/locale/en"
                className="dropdown-item  active "
                style={{ textTransform: 'uppercase' }}
              >
                {' '}
                en
              </a>
            </div>
            <a
              href="https://54.216.45.40/public/store-owner/zen-mode/true"
              className="dropdown-item"
            >
              <i className="icon-power3"></i>Zen Mode [Beta]
            </a>
            <a
              href="https://54.216.45.40/public/auth/logout"
              className="dropdown-item"
            >
              <i className="icon-switch2"></i>
              Logout
            </a>
          </div>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown dropdown-user">
              <a
                href="#"
                className="navbar-nav-link d-flex align-items-center dropdown-toggle"
                data-toggle="dropdown"
              >
                <span>
                  <i className="icon-earth mx-2"></i>
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a
                  href="https://54.216.45.40/public/locale/en"
                  className="dropdown-item  active "
                  style={{ textTransform: 'uppercase' }}
                >
                  {' '}
                  en
                </a>
              </div>
            </li>

            <li className="nav-item dropdown dropdown-user">
              <a
                href="#"
                className="navbar-nav-link d-flex align-items-center dropdown-toggle"
                data-toggle="dropdown"
              >
                <span>store1</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a
                  href="https://54.216.45.40/public/store-owner/zen-mode/true"
                  className="dropdown-item"
                >
                  <i className="icon-power3"></i>Zen Mode [Beta]
                </a>
                <a
                  href="https://54.216.45.40/public/auth/logout"
                  className="dropdown-item"
                >
                  <i className="icon-switch2"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar navbar-expand-md navbar-light navbar-sticky">
        <div className="container">
          <div className="text-center d-md-none w-100">
            <button
              type="button"
              className="navbar-toggler dropdown-toggle"
              data-toggle="collapse"
              data-target="#navbar-navigation"
            >
              <i className="icon-unfold mr-2"></i>
              Navigation
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar-navigation">
            <ul className="navbar-nav">
              { links.map(link => 
                <li className="nav-item" key={link.text}>
                  <NavLink to={link.link} className={link.className}><i className={`${link.icon} mr-2`}></i>{link.text}</NavLink>
                </li>
              )}
                
              
              {/* // <li className="nav-item">
              //   <a
              //     href="https://54.216.45.40/public/store-owner/stores"
              //     className="navbar-nav-link "
              //   >
              //     <i className="icon-store2 mr-2"></i>
              //     Stores
              //   </a>
              // </li> */}
              {/* <li className="nav-item dropdown">
                <div className="dropdown-menu">
                  <a
                    href="https://54.216.45.40/public/store-owner/addoncategories"
                    className="dropdown-item "
                  >
                    <i className="icon-tree6 mr-2"></i>
                    Addon Categories
                  </a>
                  <a
                    href="https://54.216.45.40/public/store-owner/addons"
                    className="dropdown-item "
                  >
                    <i className="icon-list2 mr-2"></i>
                    Addons
                  </a>
                  <a
                    href="https://54.216.45.40/public/store-owner/itemcategories"
                    className="dropdown-item "
                  >
                    <i className="icon-grid52 mr-2"></i>
                    Menu Categories
                  </a>
                  <a
                    href="https://54.216.45.40/public/store-owner/items"
                    className="dropdown-item "
                  >
                    <i className="icon-grid mr-2"></i>
                    Items
                  </a>
                </div> */}

              
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
