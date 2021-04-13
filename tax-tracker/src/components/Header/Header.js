import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import s from './style.module.scss';
import Burger from '../Burger';
import Menu from '../Menu';
import { useOnClickOutside } from '../../hooks';
const Header = ({ className }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = 'main-menu';

  useOnClickOutside(node, () => setOpen(false));
  return (
    <div className={classnames(s.header, className)}>
      <Link to={{ pathname: '/' }}>
        <h1>
          <span>
            <b>Simple</b>Salary
          </span>
        </h1>
      </Link>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu id={menuId} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Header;
