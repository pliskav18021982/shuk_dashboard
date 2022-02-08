/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  monthsFull,
  weekDays,
  weekdaysShortOrderRus,
} from '../../utils/getCalendar';
import formatDate from '../../utils/getFormattedDate';

import './calendar.css';

function Calendar({setOrderDate, orderDate, showCalendar, setShowCalendar}) {
  const currentDate = new Date();
  const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [dates, setDates] = useState([]);
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const createCalendarGrid = (
    date,
    endDay,
    firstMonthDay,
    lastMonthDay,
    datesArray,
  ) => {
    while (date <= endDay) {
      if (date < firstMonthDay || date > lastMonthDay) {
        datesArray.push({ date, className: 'addedDay' });
      } else if (date === selectedDay) {
        datesArray.push({ date, className: 'selectedDay' });
      } else if (date.getDate() === currentDate.getDate()) {
        datesArray.push({ date, className: 'selectedDay' });
      } else {
        datesArray.push({ date, className: 'calendarDay' });
      }
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }
    setDates(datesArray);
  };

  useEffect(() => {
    const firstMonthDay = new Date(year, monthIndex, 1);
    const lastMonthDay = new Date(year, monthIndex, daysInMonth);

    const startDay = new Date(
      firstMonthDay.getFullYear(),
      firstMonthDay.getMonth(),
      firstMonthDay.getDate() - firstMonthDay.getDay() + 1,
    );
    const endDay = new Date(
      lastMonthDay.getFullYear(),
      lastMonthDay.getMonth(),
      lastMonthDay.getDate() + (weekDays.length - lastMonthDay.getDay()),
    );
    let date = startDay;
    const datesArray = [];
    createCalendarGrid(date, endDay, firstMonthDay, lastMonthDay, datesArray);
  }, []);

  
  const decrementMonthIndex = () => {
    let prevMonthIndex = monthIndex - 1;
    let firstMonthDay, lastMonthDay
    if (prevMonthIndex < 0) {
      prevMonthIndex = monthsFull.length - 1;
      const prevYear = year - 1 
      setYear(prevYear);
      firstMonthDay = new Date(prevYear, prevMonthIndex, 1);
      lastMonthDay = new Date(prevYear, prevMonthIndex, daysInMonth);
    }
    else{
      firstMonthDay = new Date(year, prevMonthIndex, 1);
      lastMonthDay = new Date(year, prevMonthIndex, daysInMonth);
    }
    setMonthIndex(prevMonthIndex);
    
    const startDay = new Date(
      firstMonthDay.getFullYear(),
      firstMonthDay.getMonth(),
      firstMonthDay.getDate() - firstMonthDay.getDay() + 1,
    );
    const endDay = new Date(
      lastMonthDay.getFullYear(),
      lastMonthDay.getMonth(),
      lastMonthDay.getDate() + (weekDays.length - lastMonthDay.getDay()),
    );
    let date = startDay;
    const datesArray = [];
    createCalendarGrid(date, endDay, firstMonthDay, lastMonthDay, datesArray);
  };

  
  
  const incrementMonthIndex = () => {
    let nextMonthIndex = monthIndex + 1;
    if (nextMonthIndex > monthsFull.length - 1) {
      nextMonthIndex = 0;
      setYear((prev) => prev + 1);
    }
    setMonthIndex(nextMonthIndex);
    const firstMonthDay = new Date(year, nextMonthIndex, 1);
    console.log(firstMonthDay);
    const lastMonthDay = new Date(year, nextMonthIndex, daysInMonth);

    const startDay = new Date(
      firstMonthDay.getFullYear(),
      firstMonthDay.getMonth(),
      firstMonthDay.getDate() - firstMonthDay.getDay() + 1,
    );
    const endDay = new Date(
      lastMonthDay.getFullYear(),
      lastMonthDay.getMonth(),
      lastMonthDay.getDate() + (weekDays.length - lastMonthDay.getDay()),
    );
    let date = startDay;
    const datesArray = [];
    createCalendarGrid(date, endDay, firstMonthDay, lastMonthDay, datesArray);
  };

  const selectDateHandler = (newSelectedDate, newSelectedDateIndex) => {
    const firstMonthDay = new Date(year, monthIndex, 1);
    const lastMonthDay = new Date(year, monthIndex, daysInMonth);

    setSelectedDay(newSelectedDate);
    const prevSelectedDayIndex = dates.findIndex(
      (date) => date.className === 'selectedDay',
    );
    const prevSelectedDate = dates[prevSelectedDayIndex];

    let newDates = [];
    if (prevSelectedDayIndex < newSelectedDateIndex) {
      newDates = [
        ...dates.slice(0, prevSelectedDayIndex),
        {
          date: prevSelectedDate.date,
          className:
            prevSelectedDate < firstMonthDay || prevSelectedDate > lastMonthDay
              ? 'addedDay'
              : 'calendarDay',
        },
        ...dates.slice(prevSelectedDayIndex + 1, newSelectedDateIndex),
        {
          date: newSelectedDate,
          className: 'selectedDay',
        },
        ...dates.slice(newSelectedDateIndex + 1),
      ];
    } else {
      newDates = [
        ...dates.slice(0, newSelectedDateIndex),
        {
          date: newSelectedDate,
          className: 'selectedDay',
        },
        ...dates.slice(newSelectedDateIndex + 1, prevSelectedDayIndex),
        {
          date: prevSelectedDate.date,
          className:
            prevSelectedDate < firstMonthDay || prevSelectedDate > lastMonthDay
              ? 'addedDay'
              : 'calendarDay',
        },
        ...dates.slice(prevSelectedDayIndex + 1),
      ];
    }
    setDates(newDates);
    setOrderDate(formatDate(newSelectedDate))
    setShowCalendar(!showCalendar)
  };

  return (
    <div className="calendar__container">
      <div className="calendar__header">
        <div className="calendar__header-button" onClick={decrementMonthIndex}>
          <i className="icon-previous icon-1_5x" />
        </div>
        <div className="calendar__header-title">
          <div className="calendar__header-title-month">
            {monthsFull[monthIndex]}
          </div>
          <div className="calendar__header-title-info">
            {`${weekDays[new Date(year, monthIndex, currentDate.getDate()).getDay()]}, ${currentDate.getDate()} ${
              monthsFull[monthIndex]
            }, ${year}`}
          </div>
        </div>
        <div className="calendar__header-button" onClick={incrementMonthIndex}>
          <i className="icon-next icon-1_5x" />
        </div>
      </div>
      <div className="calendar__body">
        <div className="calendar__days">
          {weekdaysShortOrderRus.map((weekday) => (
            <div>{weekday}</div>
          ))}
        </div>
        <div className="calendar__dates">
          {dates.map(({ date, className }, index) => (
            <div
              className={className}
              onClick={() => selectDateHandler(date, index)}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
