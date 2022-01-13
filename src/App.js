/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './assets/styles/css.css';
import './assets/styles/styles.css';
import './assets/styles/bootstrap.css';
import './assets/styles/combined.css';
import './assets/styles/components.css';
import './assets/styles/layout.css';
import './assets/styles/colors.css';
import './assets/styles/animate.css';
import './assets/styles/backend-custom.css';
import './assets/styles/bootstrap-material-datetimepicker.css';
import OrderPage from './pages/OrderPage';
import OrdersListPage from './components/OrdersListPage';
import Header from './components/Header';
import Badges from './components/Badges';
import LeftMenu from './components/LeftMenu/LeftMenu';
import { SERVER_PATH } from './utils/externalPaths';
import { GET_NEW_ITEMS } from './utils/endpoints';
import axios from 'axios';
import HomePage from './pages/HomePage';

function App() {
  const [leftMenuItems, setLeftMenuItems] = useState([]);
  const loadLeftMenu = () => {
    const getUrl = `${SERVER_PATH}${GET_NEW_ITEMS}`;
    const request = axios.request({
      method: 'get',
      url: getUrl,
      params: {},
      data: {},
    });
    request
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setLeftMenuItems(data);
      });
  };

  useEffect(() => {
    loadLeftMenu();
  }, []);

  return (
    <>
      <LeftMenu items={leftMenuItems} />
      <Header />
      <div className="page-content pt-0 movedtoright7">
        <div className="content-wrapper">
          <div className="content mb-5">
            <Badges />
            <Routes>
              <div className="row pt-4 p-0">
                <div className="col-xl-12">
                  <div className="panel panel-flat dashboard-main-col mt-4 mb-4"></div>
                </div>
              </div>
              <Route path="/" element={<HomePage />} />
              <Route path="orders/:id" element={<OrderPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
