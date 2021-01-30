import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { STUDNET_LOAN_TYPES } from '../../helpers/constants';
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
    const studentLoan = STUDNET_LOAN_TYPES.includes(isStudentLoanValue)
      ? `&studentLoan=${isStudentLoanValue}`
      : '';
    history.push({
      search: `salary=${input}${studentLoan}&pension=${pensionInput}`,
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
    const {
      target: { name },
    } = e;
    setIsStudentLoanValue((prevName) => (prevName !== name ? name : undefined));
  };
  return (
    <div className={s.tax}>
      <h1>Fill in your yearly salary</h1>
      <Form
        onEnter={onEnter}
        handleChange={handleChange}
        onCheckbox={onCheckbox}
        value={input}
        studentLoanType={isStudentLoanValue}
        handlePensionChange={handlePensionChange}
        pensionValue={pensionInput}
      />
      {!!valueSubmit && (
        <Table
          className={s.tableContainer}
          value={valueSubmit}
          studentLoanType={isStudentLoanValueSubmit}
          pensionValue={pensionValueSubmitted}
        />
      )}
    </div>
  );
};

export default Tax;
