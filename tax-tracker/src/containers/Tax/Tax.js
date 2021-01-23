import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatNumber } from '../../helpers/helpers';
import Form from '../Form';
import Table from '../Table';
import s from './style.module.scss';

const Tax = ({ salary, studentLoan, pension }) => {
  const history = useHistory();
  const [input, setInput] = useState(salary);
  const [valueSubmit, setValueSubmit] = useState(salary);
  const [isStudentLoanValue, setIsStudentLoanValue] = useState(studentLoan);
  const [isStudentLoanValueSubmit, setIsStudentLoanValueSubmit] = useState(
    studentLoan
  );
  const [pensionInput, setPensionInput] = useState(pension);
  const [pensionValueSubmitted, setPensionValueSubmitted] = useState(pension);
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
    <div className={s.tax}>
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

export default Tax;
