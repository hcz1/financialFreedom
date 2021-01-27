import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import s from './App.module.css';
import Tax from './containers/Tax/Tax';

const App = () => {
  const { search } = useLocation();
  const queryStrings = queryString.parse(search);
  const initalState = {
    salary: parseInt(queryStrings.salary) ? parseInt(queryStrings.salary) : 0,
    studentLoan:
      queryStrings.studentLoan === 'plan_1'
        ? { plan_1: true, plan_2: false }
        : queryStrings.studentLoan === 'plan_2'
        ? { plan_1: false, plan_2: true }
        : { plan_1: false, plan_2: false },
    pension: parseInt(queryStrings.pension) || 0,
  };
  return (
    <div className={s.app}>
      <Tax {...initalState} />
    </div>
  );
};

export default App;
