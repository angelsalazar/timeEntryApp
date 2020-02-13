import React from 'react';
import clsx from 'clsx';

import './style.css';

export default function Textarea({ label, value, required = false, className = '', ...props }) {
  const [focused, setFocused] = React.useState(false);

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    setFocused(false);
  }

  return (
    <div className={clsx(
      'Textarea',
      focused && 'Textarea-focused',
      className
    )}>
      <label className="Textarea__Label">
        {label}
      </label>
      <textarea
        className="Textarea__Input"
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}>
      </textarea>
    </div>
  )
}
