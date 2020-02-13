import React from 'react';
import clsx from 'clsx';

import './style.css';

export default function Button({
  variant = 'base',
  type = 'button',
  className = '',
  children,
  ...props
  }) {
  return (
    <button
      type={type}
      className={clsx('Button', `Button-${variant}`, className)}
      {...props}>
      {children}
    </button>
  );
}
