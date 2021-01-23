import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import s from './App.module.css';
import Tax from './containers/Tax/Tax';

const App = () => {
  const { search } = useLocation();
  const queryStrings = queryString.parse(search);
  const initalState = {
    salary: queryStrings.salary || 0,
    studentLoan: queryStrings.studentLoan || false,
    pension: queryStrings.pension || 0,
  };
  return (
    <div className={s.app}>
      <Tax {...initalState} />
    </div>
  );
};

export default App;
