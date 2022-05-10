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
import Filters from './components/Filters';
import Header from './components/Header';
import Badges from './components/Badges';
import LeftMenu from './components/LeftMenu/LeftMenu';
import { SERVER_PATH } from './utils/externalPaths';
import { GET_NEW_ITEMS } from './utils/endpoints';
import axios from 'axios';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

function App() {
  const [leftMenuItems, setLeftMenuItems] = useState([]);
  const [filterItems, setFilterItems]= useState([]);

  const [isSearchBlockShown, setIsSearchBlockShown] = useState(false);

  const toggleSearchBlock = () =>{
    setIsSearchBlockShown(!isSearchBlockShown);
  }

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
        console.log("data for left menu", data);
        setLeftMenuItems(data);
        setFilterItems([...data.map(item => item = {name: item.name, id: item.id})])
      });
  };

  useEffect(() => {
    loadLeftMenu();
  }, []);

  return (
    <>
      <LeftMenu items={leftMenuItems} />
      <Header
        showSearchBlock={isSearchBlockShown}
        toggleSearchBlock={toggleSearchBlock}
      />
      <div className="page-content pt-0 movedtoright7">
        <div className="content-wrapper">
          <div className="content mb-5">
            <Badges />

            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    items={filterItems}
                    showSearchBlock={isSearchBlockShown}
                    toggleSearchBlock={setIsSearchBlockShown}
                  />
                }
              />
              <Route path="orders/:id" element={<OrderPage />} />
              <Route path="search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
