import React from 'react';
import './Button.css';

// Базовий компонент кнопки
// Props:
//   text - текст кнопки
//   onClick - обробник кліку
//   type - тип кнопки: 'primary' | 'secondary' | 'danger' | 'success'
//   size - розмір: 'sm' | 'md' | 'lg'
//   disabled - чи заблокована кнопка
//   fullWidth - чи займає всю ширину

function Button({
  text,
  onClick,
  type = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  children
}) {
  const classNames = [
    'btn',
    `btn-${type}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    disabled ? 'btn-disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children || text}
    </button>
  );
}

export default Button;
