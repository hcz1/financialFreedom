import React from 'react';
import { useLocation, Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import Header from './components/Header';
import { STUDENT_LOAN_TYPES } from './helpers/constants';
import Footer from './components/Footer';
import IncomeTax from './containers/IncomeTax';
import s from './App.module.scss';
import ExtraInfo from './components/ExtraInfo';
import 'react-popper-tooltip/dist/styles.css';
const Mortgage = React.lazy(() => import('./containers/Mortgage'));

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
    pension: parseFloat(queryStrings.pension) || 0,
    multiplier: queryStrings.multiplier,
    scottish: queryStrings.scottish || false,
  };
  return (
    <div className={s.app}>
      <Header className={s.header} />
      <div className={s.contentContainer}>
        <Switch>
          <Route path='/mortgage' render={() => <Mortgage />} />
          {/* <Mortgage className={s.mortgage} /> */}
          {/* </Route> */}
          <Route path='/'>
            <IncomeTax className={s.tax} {...initalState} />
            <ExtraInfo />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
