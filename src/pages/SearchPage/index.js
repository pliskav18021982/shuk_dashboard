/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrdersList from '../../components/OrdersListPage';
import { GET_ORDERS, SEARCH_ORDERS } from '../../utils/endpoints';
import { SERVER_PATH } from '../../utils/externalPaths';

function SearchPage() {
  const location = useLocation();

  const { fromPage, searchParams } = location.state;
    
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [searchResults, setSearchResults] = useState(
    fromPage !== '/' ? JSON.parse(sessionStorage.getItem('searchResults')) : [],
  );

  const [searchOrderItems, setSearchResultsOrderItems] = useState(
    fromPage !== '/' ? JSON.parse(sessionStorage.getItem('searchOrderItems')) : [],
  );

  const [searchPage, setSearchPage] = useState(
    fromPage !== '/' ? parseInt(sessionStorage.getItem('nextSearchPage')) : 0,
  );

  const [showEndMessage, setShowEndMessage] = useState(false);

  const [totalSearchResults, setTotalSearchResults] = useState(0);

  const urlGetOrders = `${SERVER_PATH}/${SEARCH_ORDERS}`;

  const orderClickHandler = (orderId) => {
    console.log('oops');
    console.log(orderId);
    let orderClicked = searchResults.find((o) => o.order.id === orderId);
    const orderIndex = searchResults.findIndex((o) => o.order.id === orderId);
    const click = orderClicked.clicked;
    orderClicked = { ...orderClicked, clicked: !click };
    const newOrdersList = [
      ...searchResults.slice(0, orderIndex),
      orderClicked,
      ...searchResults.slice(orderIndex + 1),
    ];
    setSearchResults(newOrdersList);
  };

  // const searchOrderClickHandler = (orderId) => {
  //   let orderClicked = searchResults.find((o) => o.order.id === orderId);
  //   const orderIndex = searchResults.findIndex((o) => o.order.id === orderId);
  //   const click = orderClicked.clicked;
  //   orderClicked = { ...orderClicked, clicked: !click };
  //   const newOrdersList = [
  //     ...searchResults.slice(0, orderIndex),
  //     orderClicked,
  //     ...searchResults.slice(orderIndex + 1),
  //   ];
  //   setSearchResults(newOrdersList);
  // };

  const statusClickHandler = (orderId, status) => {
    console.log('status', status);
    let orderClicked = searchResults.find((o) => o.order.id === orderId);
    const orderIndex = searchResults.findIndex((o) => o.order.id === orderId);
    let { order } = orderClicked;
    order = { ...order, orderstatus_id: status };
    orderClicked = { ...orderClicked, order };
    setSearchResults([
      ...searchResults.slice(0, orderIndex),
      orderClicked,
      ...searchResults.slice(orderIndex + 1),
    ]);
  };

  const findItems = (itemList) => {
    const items = [];
    itemList.forEach((item) => {
      let orderItem = searchOrderItems.find((i) => i.id === item.id);
      orderItem = { ...orderItem, quantity: item.quantity, limit: item.limit };
      items.push(orderItem);
    });
    return items;
  };

  const fetch = (currentPage) => {
    let orderData;
    if (
      searchResults.length === 0 ||
      totalSearchResults === 0 ||
      searchResults.length < totalSearchResults
    ) {
      const request = axios.request({
        method: 'get',
        url: urlGetOrders,
        params: { ...searchParams, current_page: searchPage},
        data: {},
      });

      request
        .then((response) => response.data)
        .then((data) => {
          setTotalSearchResults(data.total_count);
          const newOrderItems = [];
          data.orderPage.items.forEach((item) => {
            if (searchOrderItems.indexOf(item) === -1) {
              newOrderItems.push(item);
            }
          });
          const newData = [
            ...data.orderPage.orders.map(
              (order) => (order = { ...order, clicked: false }),
            ),
          ];
          // if (location !== null && location.state !== null) {
          //   orderData = location.state.itemsString;
          //   console.log('orderdata', orderData);
          //   const orderId = location.state.orderId;
          //   const total = location.state.total;

          //   let orderEdited = searchResults.find(
          //     (obj) => obj.order.id === orderId,
          //   );
          //   let { order } = orderEdited;
          //   order = { ...order, total };
          //   orderEdited = { ...orderEdited, order, orderItemsDtos: orderData };
          //   console.log(orderEdited);

          //   const updatedIndex = searchResults.findIndex(
          //     (o) => o.order.id === orderId,
          //   );
          //   setSearchResultsOrderItems([...searchOrderItems, ...newOrderItems]);
          //   setSearchResults([
          //     ...searchResults.slice(0, updatedIndex),
          //     orderEdited,
          //     ...searchResults.slice(updatedIndex + 1),
          //     ...data.orderPage.orders.map(
          //       (order) => (order = { ...order, clicked: false }),
          //     ),
          //   ]);
          //   sessionStorage.setItem(
          //     'searchOrderItems',
          //     JSON.stringify([...searchOrderItems, ...newOrderItems]),
          //   );
          //   sessionStorage.setItem(
          //     'searchResults',
          //     JSON.stringify([
          //       ...searchResults.slice(0, updatedIndex),
          //       orderEdited,
          //       ...searchResults.slice(updatedIndex + 1),
          //       ...data.orderPage.orders.map(
          //         (order) => (order = { ...order, clicked: false }),
          //       ),
          //     ]),
          //   );
          // } else {
            setSearchResultsOrderItems([...searchOrderItems, ...newOrderItems]);
            setSearchResults([
              ...searchResults,
              ...data.orderPage.orders.map(
                (order) => (order = { ...order, clicked: false }),
              ),
            ]);
            sessionStorage.setItem(
              'searchOrderItems',
              JSON.stringify([...searchOrderItems, ...newOrderItems]),
            );
            sessionStorage.setItem(
              'searchResults',
              JSON.stringify([...searchResults, ...newData]),
            );
          // }

          sessionStorage.setItem('nextSearchPage', searchPage + 1);
          setLoading(true);
        })
        .finally(() => {});
    } else {
      setShowEndMessage(true);
    }
  };
  const fetchMore = () => {
    console.log('Fetching more')
    console.log(searchParams)
    setSearchPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchMore();
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  useEffect(() => {
    fetch(searchPage);
  }, [searchPage]);

  
  const pageEnd = useRef();
  return (
    <>
      <h3 className="mb-4 mt-4">{`We found ${totalSearchResults} results on your request`}</h3>
      {totalSearchResults > 0 && (
        <OrdersList
          orders={searchResults}
          orderItems={searchOrderItems}
          clickHandler={orderClickHandler}
          statusClickHandler={statusClickHandler}
          findItems={findItems}
        />
      )}
      <div className="load-controls">
        {showEndMessage ? (
          <div>No more items to load</div>
        ) : (
          <div>
            <div ref={pageEnd}>Loading ...</div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
