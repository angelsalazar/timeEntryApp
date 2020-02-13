const formatter = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

export function formatDate(date) {
  return formatter.format(date);
}

export function noop() {}
