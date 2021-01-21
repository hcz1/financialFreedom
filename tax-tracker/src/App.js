import { useState } from 'react';
import { formatNumber } from './helpers/helpers';
import Form from './containers/Form';
import s from './App.module.css';
import Table from './containers/Table/TableContainer';

const App = () => {
  const [input, setInput] = useState(undefined);
  const [valueSubmit, setValueSubmit] = useState(undefined);
  const [isStudentLoanValue, setIsStudentLoanValue] = useState(false);
  const [isStudentLoanValueSubmit, setIsStudentLoanValueSubmit] = useState(
    false
  );
  const onEnter = (e) => {
    e.preventDefault();
    setValueSubmit(input);
    setIsStudentLoanValueSubmit(isStudentLoanValue);
  };
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setInput(parseInt(value));
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
      />
      {!!valueSubmit && (
        <>
          <h2>{`Salary submitted: £${formatNumber(valueSubmit)}`}</h2>
          <Table
            className={s['table-container']}
            value={valueSubmit}
            isStudentLoan={isStudentLoanValueSubmit}
          />
        </>
      )}
    </div>
  );
};

export default App;
