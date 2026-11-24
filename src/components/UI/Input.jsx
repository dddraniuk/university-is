import React from 'react';
import './Input.css';

// Базовий компонент поля введення
// Props:
//   label - підпис поля
//   type - тип input
//   value - поточне значення
//   onChange - обробник зміни
//   placeholder - підказка
//   error - текст помилки
//   required - обов'язкове поле

function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  name
}) {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        className={`input-field ${error ? 'input-error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        name={name}
      />
      {error && (
        <span className="input-error-message">{error}</span>
      )}
    </div>
  );
}

export default Input;
