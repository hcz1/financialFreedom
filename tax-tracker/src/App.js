import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { formatNumber } from './helpers/helpers';
import Form from './containers/Form';
import Table from './containers/Table/TableContainer';
import s from './App.module.css';

const App = () => {
  const history = useHistory();
  const { search } = useLocation();
  const queryStrings = queryString.parse(search);
  const initalState = {
    salary: queryStrings.salary || 0,
    studentLoan: queryStrings.studentLoan || false,
    pension: queryStrings.pension || 0,
  };
  const [input, setInput] = useState(initalState.salary);
  const [valueSubmit, setValueSubmit] = useState(initalState.salary);
  const [isStudentLoanValue, setIsStudentLoanValue] = useState(
    initalState.studentLoan
  );
  const [isStudentLoanValueSubmit, setIsStudentLoanValueSubmit] = useState(
    initalState.studentLoan
  );
  const [pensionInput, setPensionInput] = useState(initalState.pension);
  const [pensionValueSubmitted, setPensionValueSubmitted] = useState(
    initalState.pension
  );
  const onEnter = (e) => {
    e.preventDefault();
    setValueSubmit(input);
    setIsStudentLoanValueSubmit(isStudentLoanValue);
    setPensionValueSubmitted(pensionInput);
    history.push({
      search: `salary=${input}&studentLoan=${isStudentLoanValue}&pension=${pensionInput}`,
    });
  };
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setInput(parseInt(value));
  };
  const handlePensionChange = (e) => {
    const {
      target: { value },
    } = e;
    setPensionInput(parseInt(value));
  };
  const onCheckbox = (e) => {
    setIsStudentLoanValue((prevStudentLoan) => !prevStudentLoan);
  };
  return (
    <div className={s.app}>
      <h1>Fill in your yearly salary</h1>
      <Form
        onEnter={onEnter}
        handleChange={handleChange}
        onCheckbox={onCheckbox}
        value={input}
        isStudentLoan={isStudentLoanValue}
        handlePensionChange={handlePensionChange}
        pensionValue={pensionInput}
      />
      {!!valueSubmit && (
        <>
          <h2>{`Salary submitted: £${formatNumber(valueSubmit)}`}</h2>
          <Table
            className={s['table-container']}
            value={valueSubmit}
            isStudentLoan={isStudentLoanValueSubmit}
            pensionValue={pensionValueSubmitted}
          />
        </>
      )}
    </div>
  );
};

export default App;
