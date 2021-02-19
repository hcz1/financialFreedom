import React from 'react';
import classnames from 'classnames';
import s from './style.module.scss';
const Header = ({ className }) => (
  <div className={classnames(s.header, className)}>
    <h1>
      <span>
        <b>Simple</b>Salary
      </span>
    </h1>
  </div>
);

export default Header;
