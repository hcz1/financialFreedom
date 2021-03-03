import classnames from 'classnames';
import s from './style.module.scss';
const TextBlock = ({ className, children }) => (
  <div className={classnames(s.textBlock, className)}>{children}</div>
);
export default TextBlock;
