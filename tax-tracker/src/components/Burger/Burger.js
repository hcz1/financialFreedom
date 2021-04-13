import React from 'react';
import classnames from 'classnames';

import style from './burger.module.scss';

export const Burger = ({ className, open, setOpen }) => {
  const isExpanded = open ? true : false;
  return (
    <button
      className={classnames(style.burger, className, open && style.open)}
      aria-expanded={isExpanded}
      onClick={() => setOpen(!open)}
      aria-label='Toggle menu'
    >
      <div className={classnames(open && style.open)} />
      <div className={classnames(open && style.open)} />
      <div className={classnames(open && style.open)} />
    </button>
  );
};

export default Burger;
