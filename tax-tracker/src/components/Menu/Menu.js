import React from 'react';
import classnames from 'classnames';

import style from './menu.module.scss';
import { Link } from 'react-router-dom';

export const Menu = ({ className, open, setOpen, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  return (
    <nav
      className={classnames(style.menu, className, open && style.open)}
      aria-hidden={!isHidden}
      {...props}
    >
      <Link
        to={{ pathname: '/' }}
        tabIndex={tabIndex}
        onClick={() => setOpen(false)}
      >
        <span aria-hidden='true'>💵</span>
        Income Tax
      </Link>
      <Link
        to={{ pathname: '/mortgage' }}
        tabIndex={tabIndex}
        onClick={() => setOpen(false)}
      >
        <span aria-hidden='true'>🏠</span>
        Mortgage
      </Link>
    </nav>
  );
};

export default Menu;
