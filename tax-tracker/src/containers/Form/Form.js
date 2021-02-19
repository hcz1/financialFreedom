import React from 'react';
import { useFormik } from 'formik';

import Label from '../../components/label/label';
import InputGroup from '../../components/input-group';
import InputGroupAddon from '../../components/input-group-add-on';
import Input from '../../components/input';
import s from './style.module.scss';
const Form = ({ grossSalary, pension, studentLoan, onSubmit }) => {
  const formik = useFormik({
    initialValues: { grossSalary, pension, studentLoan },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <Label htmlFor='grossSalary'>
        <b>I earn</b> (pre tax)
      </Label>
      <InputGroup>
        <InputGroupAddon addonType='Prepend'>£</InputGroupAddon>
        <Input
          style={{ width: '270px' }}
          error={formik.errors.grossSalary}
          touched={formik.touched.grossSalary}
          value={formik.values.grossSalary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id='grossSalary'
          name='grossSalary'
        />
      </InputGroup>
      <Label htmlFor='pension'>
        <b>My Pension Contribution</b>
      </Label>
      <InputGroup>
        <Input
          style={{ width: '270px' }}
          error={formik.errors.pension}
          touched={formik.touched.pension}
          value={formik.values.pension}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id='pension'
          name='pension'
        />
        <InputGroupAddon addonType='Append'>%</InputGroupAddon>
      </InputGroup>
      <Label htmlFor='studentLoan'>
        <b>Student Loan?</b>
      </Label>
      <InputGroup className={s.radioContainer}>
        <div className={s.radio}>
          <div className={s.radioContents}>
            <input
              id='plan_1'
              value='plan_1'
              type='radio'
              name='studentLoan'
              touched={formik.touched.studentLoan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.studentLoan === 'plan_1'}
            />{' '}
            Plan 1
          </div>
        </div>
        <div className={s.radio}>
          <div className={s.radioContents}>
            <input
              id='plan_2'
              value='plan_2'
              type='radio'
              name='studentLoan'
              touched={formik.touched.studentLoan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.studentLoan === 'plan_2'}
            />{' '}
            Plan 2
          </div>
        </div>
      </InputGroup>
      <button className={s.btn} type='submit'>
        Calculate my taxes
      </button>
    </form>
  );
};

export default Form;
