import React from 'react';
import clsx from 'clsx';

import './style.css';

export default function Combobox({
  options = [{ label: '1', value: '1' }, { label: '2', value: '2'}],
  label,
  value,
  required = false,
  className,
  ...props
  }) {
  const [focused, setFocused] = React.useState(false);


  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    setFocused(false);
  }

  return (
    <div className={clsx(
        'Combobox',
        focused && 'Combobox-focused',
        className
      )}>
      <label className="Combobox__Label">
        {label}
      </label>
      <select
        className="Combobox__Input"
        required={required}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}>
        <option>Select type</option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="Combobox__Chevron">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </div>
    </div>
  );
}
