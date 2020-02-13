import React from 'react';

import Option from './Option';

import { timeEntryTypes } from '../../metadata';

import './style.css';

export default function EntryType({ value = 'all' }) {
  const [selectedValue, setSelectedValue] = React.useState(value);

  function handleChange(ev) {
    setSelectedValue(ev.target.value);
  }

  return (
    <fieldset className="EntryType">
      {timeEntryTypes.map(type => (
        <Option
          key={type.value}
          label={type.label}
          value={type.value}
          checked={selectedValue === type.value}
          onChange={handleChange}
        />
      ))}
      <Option
        label="All"
        value="all"
        checked={selectedValue === 'all'}
        onChange={handleChange}
      />
    </fieldset>
  );
}
