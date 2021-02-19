import React from 'react';
import classnames from 'classnames';
import style from './input.module.scss';

export const Input = ({
  className,
  style: componentStyle,
  name,
  value,
  type = 'text',
  error,
  touched,
  innerRef,
  ...otherProps
}) => (
  <input
    style={componentStyle}
    className={classnames(
      style.input,
      touched && error && style.inputError,
      className
    )}
    type={type}
    ref={innerRef}
    name={name}
    value={value}
    {...otherProps}
  />
);

export default Input;
