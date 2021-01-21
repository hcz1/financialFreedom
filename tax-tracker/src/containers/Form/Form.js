import React from 'react';
import s from './style.module.scss';
const Form = ({
  onEnter,
  onChange,
  handleChange,
  onCheckbox,
  value,
  isStudentLoan,
}) => {
  return (
    <form className={s.form} onSubmit={onEnter}>
      <span>
        £<input type='number' onChange={handleChange} value={value} />
      </span>
      <div>
        Student Loan?
        <input type='checkbox' onChange={onCheckbox} checked={isStudentLoan} />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
