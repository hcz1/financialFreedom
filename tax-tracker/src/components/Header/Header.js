import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import s from './style.module.scss';
const Header = ({ className }) => (
  <div className={classnames(s.header, className)}>
    <Link to={{ pathname: '/' }}>
      <h1>
        <span>
          <b>Simple</b>Salary
        </span>
      </h1>
    </Link>
    <Link to={{ pathname: '/mortgage' }}>
      <h1>
        <span>Mortgage</span>
      </h1>
    </Link>
  </div>
);

export default Header;
