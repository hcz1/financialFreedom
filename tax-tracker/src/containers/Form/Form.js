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
  studentLoanType,
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
      <div className={s.studentLoan}>
        <p>Student Loan?</p>
        Plan 1
        <input
          name='plan_1'
          type='checkbox'
          onChange={onCheckbox}
          checked={studentLoanType.plan_1}
        />
        Plan 2
        <input
          name='plan_2'
          type='checkbox'
          onChange={onCheckbox}
          checked={studentLoanType.plan_2}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
