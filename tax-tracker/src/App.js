import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Header from './components/Header';
import { STUDENT_LOAN_TYPES } from './helpers/constants';
import Tax from './containers/Tax/Tax';
import s from './App.module.scss';
import ExtraInfo from './components/ExtraInfo';
import 'react-popper-tooltip/dist/styles.css';

const App = () => {
  const { search } = useLocation();
  const queryStrings = queryString.parse(search);
  const initalState = {
    salary: parseFloat(queryStrings.salary)
      ? parseFloat(queryStrings.salary)
      : 0,
    studentLoan: STUDENT_LOAN_TYPES.includes(queryStrings.studentLoan)
      ? queryStrings.studentLoan
      : undefined,
    pension: parseInt(queryStrings.pension) || 0,
    multiplier: queryStrings.multiplier,
  };
  return (
    <div className={s.app}>
      <Header className={s.header} />
      <div className={s.contentContainer}>
        <Tax className={s.tax} {...initalState} />
        <ExtraInfo />
      </div>
      <footer>
        <span>&#169; SimpleSalary {new Date().getFullYear()}</span>
        <span>
          <a href='terms-and-conditions.html'>Terms & Conditions</a>
        </span>
        <span style={{ cursor: 'pointer' }} onClick={() => window.popup.open()}>
          Cookie Policy
        </span>
      </footer>
    </div>
  );
};

export default App;
