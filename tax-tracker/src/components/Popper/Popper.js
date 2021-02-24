import React from 'react';
import classnames from 'classnames';
import { usePopperTooltip } from 'react-popper-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import s from './style.module.scss';

const Popper = ({ className, iconClassName, children }) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();
  return (
    <div className={classnames(s.popper, className)}>
      <FontAwesomeIcon
        className={classnames(s.icon, iconClassName)}
        forwardedRef={setTriggerRef}
        icon={faInfoCircle}
      />
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: classnames('tooltip-container', s.tooltip),
          })}
        >
          {children}
          <div
            {...getArrowProps({
              className: 'tooltip-arrow',
            })}
          />
        </div>
      )}
    </div>
  );
};

export default Popper;
