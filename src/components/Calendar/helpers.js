export function formatDate(customDate) {
  return new Date(
    customDate.year,
    customDate.month,
    customDate.day
  ).toISOString()
  .split('T')[0];
}

export const monthsByValue = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

export function getCurrentDate() {
    const currentDate = new Date();
    return {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        day: currentDate.getDate()
    }
}

export function getFirstDayOfMonth(year, month) {
    let firstOfMonth = new Date(year, month, 1).getDay();

    return firstOfMonth < 0 ? 7 + (firstOfMonth - 0) : firstOfMonth - 0;
}

export function getDaysInPreviousMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
