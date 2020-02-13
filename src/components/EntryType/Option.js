import React from 'react';

import './Option.css';

export default function Option({ label, value, checked, onChange }) {
  return (
    <label className="Option">
      {label}
      <input
        type="radio"
        name="entry-type"
        className="Option__Trigger"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="Option__Checkmark"></span>
    </label>
  )
}
