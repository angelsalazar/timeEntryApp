import React from 'react';

import Cell from './Cell';
import useDays from './useDays';
import { getCurrentDate, monthsByValue } from './helpers';
import './style.css';

export default function Calendar({ selectedDate = null, onSelect }) {
  const currentDate = getCurrentDate();
  const [relativeDate, setRelativeDate] = React.useState(currentDate);
  const days = useDays(relativeDate, currentDate, selectedDate);

  function handlePrevious() {
    const newRelativeDate = { ...relativeDate };
    newRelativeDate.month -= 1;

    if (newRelativeDate.month < 0) {
      newRelativeDate.month = 11;
      newRelativeDate.year -= 1;
    }

    setRelativeDate(newRelativeDate);
  }

  function handleNext() {
    const newRelativeDate = { ...relativeDate };
    newRelativeDate.month += 1;

    if (newRelativeDate.month > 11) {
      newRelativeDate.month = 0;
      newRelativeDate.year += 1;
    }

    setRelativeDate(newRelativeDate);
  }

  function handleSelectedDay(newSelectedDay) {
    onSelect && onSelect({
      ...relativeDate,
      day: newSelectedDay
    });
  }

  return (
    <div className="Calendar">
      <div className="Calendar__Controls">
        <span className="Calendar__Title">
          {monthsByValue[relativeDate.month]} {relativeDate.year}
        </span>
        <button
          className="Calendar__Navigation Calendar__Navigation-previous"
          onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        <button
          className="Calendar__Navigation Calendar__Navigation-next"
          onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div>
      <div className="Calendar__Header">
        <Cell label="Sun" disabled/>
        <Cell label="Mon" disabled/>
        <Cell label="Tue" disabled/>
        <Cell label="Wed" disabled/>
        <Cell label="Thu" disabled/>
        <Cell label="Fri" disabled/>
        <Cell label="Sat" disabled/>
      </div>
      <div className="Calendar__Content">
        {days.map(day => (
          <Cell
            key={day.key}
            label={day.label}
            current={day.current}
            selected={day.selected}
            disabled={day.disabled}
            onSelect={handleSelectedDay}
          />
        ))}
      </div>
    </div>
  );
}
