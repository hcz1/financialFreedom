import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatNumber } from './helpers/helpers';
import Form from './containers/Form';
import Table from './containers/Table/TableContainer';
import s from './App.module.css';

const App = () => {
  const history = useHistory();
  const [input, setInput] = useState(undefined);
  const [valueSubmit, setValueSubmit] = useState(undefined);
  const [isStudentLoanValue, setIsStudentLoanValue] = useState(false);
  const [isStudentLoanValueSubmit, setIsStudentLoanValueSubmit] = useState(
    false
  );
  const [pensionInput, setPensionInput] = useState(0);
  const [pensionValueSubmitted, setPensionValueSubmitted] = useState(0);
  const onEnter = (e) => {
    e.preventDefault();
    setValueSubmit(input);
    setIsStudentLoanValueSubmit(isStudentLoanValue);
    setPensionValueSubmitted(pensionInput);
    history.push({ search: `salary=${input}` });
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
