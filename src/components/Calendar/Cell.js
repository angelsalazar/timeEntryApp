import React from 'react';
import clsx from 'clsx';

import './cell.css';

export default function Cell({ label, current, selected, disabled, onSelect }) {
  function handleClick() {
    if (disabled) { return; }
    onSelect && onSelect(label);
  }

  return (
    <div
      className={clsx(
        'Cell',
        current && 'Cell-current',
        selected && 'Cell-selected',
        disabled && 'Cell-disabled'
      )}
      onClick={handleClick}>
      {label}
    </div>
  );
}
