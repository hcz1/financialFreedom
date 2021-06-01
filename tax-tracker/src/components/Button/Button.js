import React from 'react';
import classnames from 'classnames';
import s from './style.module.scss';
const Button = ({ className, children, type, onClick }) => (
  <button
    className={classnames(s.btn, className)}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
