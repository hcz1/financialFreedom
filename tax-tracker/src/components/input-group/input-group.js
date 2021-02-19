import React from 'react';
import classnames from 'classnames';
import style from './input-group.module.scss';
export const InputGroup = ({
  className,
  style: componentStyle,
  tag: Component = 'div',
  children,
}) => (
  <Component
    className={classnames(style.inputGroup, className)}
    style={componentStyle}
  >
    {children}
  </Component>
);

export default InputGroup;
