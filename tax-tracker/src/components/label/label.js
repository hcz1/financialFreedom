import React from 'react';
import classnames from 'classnames';
import style from './label.module.scss';

export const Label = ({
  className,
  style: componentStyle,
  htmlFor,
  hidden,
  ...otherProps
}) => {
  return (
    <label
      style={componentStyle}
      htmlFor={htmlFor}
      {...otherProps}
      className={classnames(
        style.label,
        hidden && style.screenReaderOnly,
        className
      )}
    />
  );
};

export default Label;
