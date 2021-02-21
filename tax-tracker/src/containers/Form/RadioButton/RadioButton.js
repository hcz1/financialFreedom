import React from 'react';
import classnames from 'classnames';
import s from './style.module.scss';

const RadioButton = ({
  className,
  id,
  value,
  name,
  touched,
  onChange,
  onBlur,
  checked,
  children,
}) => (
  <div className={classnames(s.radio, className)}>
    <div className={s.radioContents}>
      <input
        id={id}
        value={value}
        type='radio'
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        checked={checked}
      />{' '}
      {children}
    </div>
  </div>
);
export default RadioButton;
