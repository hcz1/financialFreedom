import React from 'react';
import s from './style.module.scss';
const Form = ({
  onEnter,
  onChange,
  handleChange,
  handlePensionChange,
  pensionValue,
  onCheckbox,
  value,
  isStudentLoan,
}) => {
  return (
    <form className={s.form} onSubmit={onEnter}>
      <span>
        £ <input type='number' onChange={handleChange} value={value} />
      </span>
      <span>
        Pension{' '}
        <input
          type='number'
          min='0'
          max='100'
          onChange={handlePensionChange}
          value={pensionValue}
        />{' '}
        %
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
