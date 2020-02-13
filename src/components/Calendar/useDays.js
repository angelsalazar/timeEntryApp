import React from 'react';
import {
  getFirstDayOfMonth,
  getDaysInPreviousMonth,
  getDaysInMonth
} from './helpers';

export default function useDays(relativeDate, currentDate, selectedDate) {
  const [cells, setCells] = React.useState([]);

  React.useEffect(() => {
    const firstOfMonth = getFirstDayOfMonth(relativeDate.year, relativeDate.month);
    const daysInPreviousMonth = getDaysInPreviousMonth(relativeDate.year, relativeDate.month);
    const daysInMonth = getDaysInMonth(relativeDate.year, relativeDate.month);
    const newCells = [];

    let relativeDay = null;
    let def = null;

    for (let i = firstOfMonth - 1; i >= 0; i--) {
      relativeDay = daysInPreviousMonth - i;
      newCells.push({
        label: relativeDay,
        key: `${relativeDay}-${relativeDate.month - 1}`,
        disabled: true
      });
    }

    for (let i = 0; i < daysInMonth; i++) {
      relativeDay = i + 1;
      def = {
          label: relativeDay,
          key: `${relativeDay}-${relativeDate.month}`
      };

      if (
        currentDate.year === relativeDate.year &&
        currentDate.month === relativeDate.month &&
        currentDate.day === relativeDay
      ) {
        def.current = true;
      }

      if (
        selectedDate !== null &&
        selectedDate.year === relativeDate.year &&
        selectedDate.month === relativeDate.month &&
        selectedDate.day === relativeDay
      ) {
        def.selected = true;
      }

      newCells.push(def);
    }

    // Define days of next month if last week is not full
    const offset = newCells.length % 7;

    if (offset !== 0) {
      for (let i = 0; i < 7 - offset; i++) {
        relativeDay = i + 1;
        newCells.push({
          label: relativeDay,
          key: `${relativeDay}-${relativeDate.month + 1}`,
          disabled: true
        });
      }
    }

    setCells(newCells);
  }, [
    relativeDate.month,
    relativeDate.year,
    currentDate.month,
    currentDate.year,
    currentDate.day,
    selectedDate
  ]);

  return cells;
}
