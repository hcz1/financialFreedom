import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import s from './App.module.css';
import Tax from './containers/Tax/Tax';
import { STUDENT_LOAN_TYPES } from './helpers/constants';

const App = () => {
  const { search } = useLocation();
  const queryStrings = queryString.parse(search);
  const initalState = {
    salary: parseInt(queryStrings.salary) ? parseInt(queryStrings.salary) : 0,
    studentLoan: STUDENT_LOAN_TYPES.includes(queryStrings.studentLoan)
      ? queryStrings.studentLoan
      : undefined,
    pension: parseInt(queryStrings.pension) || 0,
  };
  return (
    <div className={s.app}>
      <Tax {...initalState} />
    </div>
  );
};

export default App;
