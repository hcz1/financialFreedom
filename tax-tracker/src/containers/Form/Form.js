import React from 'react';
import { useFormik } from 'formik';
import classnames from 'classnames';
import Label from '../../components/label/label';
import InputGroup from '../../components/input-group';
import InputGroupAddon from '../../components/input-group-add-on';
import Input from '../../components/input';
import RadioButton from './RadioButton';
import s from './style.module.scss';
import Popper from '../../components/Popper';

const multiplierArr = [
  { id: 'Year', value: '1', name: 'multiplier' },
  { id: 'Month', value: '12', name: 'multiplier' },
  { id: 'Week', value: '52', name: 'multiplier' },
  { id: 'Day', value: '260', name: 'multiplier' },
];

const studentLoanArr = [
  {
    id: 'none',
    value: 'none',
    type: 'radio',
    name: 'studentLoan',
    display: 'None',
  },
  {
    id: 'plan_1',
    value: 'plan_1',
    type: 'radio',
    name: 'studentLoan',
    display: 'Plan 1',
  },
  {
    id: 'plan_2',
    value: 'plan_2',
    type: 'radio',
    name: 'studentLoan',
    display: 'Plan 2',
  },
];

const Form = ({
  className,
  grossSalary,
  pension,
  studentLoan,
  onSubmit,
  multiplier,
}) => {
  const formik = useFormik({
    initialValues: { grossSalary, pension, studentLoan, multiplier },
    onSubmit,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classnames(s.form, className)}
    >
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
      <Label htmlFor='multiplier'>
        <b>Per</b>
      </Label>
      <InputGroup className={classnames(s.radioContainer, s.horitonzal)}>
        {multiplierArr.map((item, idx) => (
          <RadioButton
            className={s.radio}
            key={idx}
            id={item.id}
            value={item.value}
            type='radio'
            name={item.name}
            touched={formik.touched.multiplier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.multiplier === item.value}
          >
            {item.id}
          </RadioButton>
        ))}
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
        <Popper className={s.popper}>
          <p>Plan 1: Your course started pre 2012</p>
          <p>Plan 2: Your course started post 2012</p>
        </Popper>
      </Label>
      <InputGroup className={s.radioContainer}>
        {studentLoanArr.map((item, key) => (
          <RadioButton
            className={classnames(s.radio, s.third)}
            key={key}
            id={item.id}
            value={item.value}
            name={item.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.studentLoan === item.value}
          >
            {item.display}
          </RadioButton>
        ))}
      </InputGroup>
      <button className={s.btn} type='submit'>
        Calculate my taxes
      </button>
    </form>
  );
};

export default Form;
