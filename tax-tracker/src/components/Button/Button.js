import React from 'react';
import classnames from 'classnames';
import s from './style.module.scss';
const Button = ({ children, type }) => (
  <button className={classnames(s.btn)} type={type}>
    {children}
  </button>
);

export default Button;
