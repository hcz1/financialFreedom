import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Header from './components/Header';
import Description from './components/Description';
import { STUDENT_LOAN_TYPES } from './helpers/constants';
import Tax from './containers/Tax/Tax';
import s from './App.module.scss';
import 'react-popper-tooltip/dist/styles.css';

const App = () => {
  const { search } = useLocation();
  const queryStrings = queryString.parse(search);
  const initalState = {
    salary: parseInt(queryStrings.salary) ? parseInt(queryStrings.salary) : 0,
    studentLoan: STUDENT_LOAN_TYPES.includes(queryStrings.studentLoan)
      ? queryStrings.studentLoan
      : undefined,
    pension: parseInt(queryStrings.pension) || 0,
    multiplier: queryStrings.multiplier,
  };
  return (
    <div className={s.app}>
      <div className={s.container}>
        <Header />
        <Tax className={s.tax} {...initalState} />
      </div>
      <div>
        <Description />
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
