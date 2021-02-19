import React from 'react';
import classnames from 'classnames';
import style from './input-group-add-on.module.scss';

export const InputGroupAddOn = ({
  className,
  style: componentStyle,
  tag: Component = 'div',
  addonType,
  children,
}) => {
  return (
    <Component
      className={classnames(
        style.inputGroupAddon,
        style[`inputGroupAddon${addonType}`],
        className
      )}
      style={componentStyle}
    >
      {children}
    </Component>
  );
};

export default InputGroupAddOn;
