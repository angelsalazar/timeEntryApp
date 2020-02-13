import React from 'react';
import clsx from 'clsx';

import './style.css';

export default function Field({ type = 'text', label, required = false, className = '', ...props }) {
  const [focused, setFocused] = React.useState(false);

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    setFocused(false);
  }

  return (
    <div className={clsx(
        'Field',
        focused && 'Field-focused',
        className
      )}>
      <label className="Field__Label">
        {label}
      </label>
      <input
        className="Field__Input"
        type={type}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
}
