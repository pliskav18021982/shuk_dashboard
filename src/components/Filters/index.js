import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import formatDate from '../../utils/getFormattedDate';
import Calendar from '../Calendar';

import './filters.css'

function Filters({  params, searchClickHandler, items }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [orderItem, setOrderItem] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderDateFrom, setOrderDateFrom] = useState('');
  const [orderDateTo, setOrderDateTo] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRangeCalendar, setShowRangeCalendar] = useState(false);
  const inputChangeHandler = (e) => {
    if (e.target.name === 'userEmail') {
      setUserEmail(e.target.value);
    }
    if (e.target.name === 'userName') {
      setUserName(e.target.value);
    }
    if (e.target.name === 'userPhone') {
      setUserPhone(e.target.value);
    }
  };
  const selectChangeHandler = (e) => {
    if (e.target.name === 'orderItem') {
      setOrderItem(e.target.options[e.target.selectedIndex].value);
    }
  };
  const dateChangeHandler = (e) => {
    console.log(e);
  };
  const dateClickHandler = (e) => {
    console.log(e)
  }
  return (
    <div className="panel-heading pb-1 pt-1">
      <div className="filters-wrapper">
        <div className="text__input__filters__row">
          <div className="filter__item__container">
            <input
              type="text"
              name="userEmail"
              className="filter__input-text"
              placeholder="Email"
              onChange={inputChangeHandler}
            />
            <label className="filter__input-label" htmlFor="userEmail">
              Email
            </label>
            <span className="focus-border"></span>
          </div>
          <div className="filter__item__container">
            <input
              type="text"
              name="userName"
              placeholder="Name"
              className="filter__input-text"
              onChange={inputChangeHandler}
            />
            <label className="filter__input-label" htmlFor="userName">
              Name
            </label>
            <span className="focus-border"></span>
          </div>
          <div className="filter__item__container">
            <input
              type="text"
              name="userPhone"
              placeholder="Phone"
              className="filter__input-text"
              onChange={inputChangeHandler}
            />
            <label className="filter__input-label" htmlFor="userPhone">
              Phone
            </label>
            <span className="focus-border"></span>
          </div>
        </div>
        <div className="selectable__filters_row">
          <div className="selectable__filter__item__container">
            <select
              name="orderItem"
              className="filter__input-down"
              onChange={selectChangeHandler}
            >
              {items.map((obj) => (
                <option
                  key={obj.id}
                  value={obj.name}
                  className="filter__down__styled-option"
                >
                  {obj.name}
                </option>
              ))}
            </select>
            <label
              className="selectable__filter__input-label"
              htmlFor="orderItem"
            >
              By Product
            </label>
          </div>
          <div className="filter__item__container">
            <span
              className="filter__input-icon-calendar"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <i className="icon-calendar"></i>
            </span>
            {showCalendar && (
              <Calendar
                setShowCalendar={setShowCalendar}
                setOrderDate={setOrderDate}
                orderDate={orderDate}
                showCalendar={showCalendar}
              />
            )}
            <input
              type="text"
              name="orderDate"
              className="filter__input-icon"
              placeholder="yyyy-mm-dd"
              onChange={dateChangeHandler}
              value={orderDate}
            />
            <label className="filter__input-label" htmlFor="orderDate">
              By Date
            </label>
          </div>
          

          <div>
            <button
              onClick={() => {
                const searchParams = {
                  ...params,
                  current_page: 0,
                  userName,
                  userEmail,
                  userPhone,
                  orderDate,
                  orderDateFrom,
                  orderDateTo,
                  orderItem,
                };
                searchClickHandler({
                  ...searchParams,
                });
                navigate('search', {
                  state: { searchParams, fromPage: location.pathname },
                });
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
