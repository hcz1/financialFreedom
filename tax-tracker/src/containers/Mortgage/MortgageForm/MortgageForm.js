import React from 'react';
import classnames from 'classnames';
import { useFormik } from 'formik';
import s from './style.module.scss';
import InputGroup from '../../../components/input-group';
import Label from '../../../components/label/label';
import InputGroupAddon from '../../../components/input-group-add-on';
import Input from '../../../components/input';
import Button from '../../../components/Button';
import RadioButton from '../../../components/RadioButton';
const typeArr = [
  { id: 'Repayment', value: 'repayment', name: 'type' },
  { id: 'Interest Only', value: 'interest', name: 'type' },
];
const MortgageForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      mortgageDebt: 0,
      term: 0,
      deposit: 0,
      type: 'repayment',
      rate: 0,
    },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Label htmlFor='mortgageDebt'>
        <b>Mortgage Debt *</b>
      </Label>
      <InputGroup>
        <InputGroupAddon addonType='Prepend'>£</InputGroupAddon>
        <Input
          type='number'
          style={{ width: '270px' }}
          error={formik.errors.mortgageDebt}
          touched={formik.touched.mortgageDebt}
          value={formik.values.mortgageDebt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id='mortgageDebt'
          name='mortgageDebt'
        />
      </InputGroup>
      <Label htmlFor='deposit'>
        <b>Deposit *</b>
      </Label>
      <InputGroup>
        <Input
          min={0}
          max={100}
          type='number'
          step='.01'
          error={formik.errors.deposit}
          touched={formik.touched.deposit}
          value={formik.values.deposit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id='deposit'
          name='deposit'
        />
        <InputGroupAddon addonType='Append'>%</InputGroupAddon>
      </InputGroup>
      <Label htmlFor='type'>
        <b>Type *</b>
      </Label>
      <InputGroup className={classnames(s.radioContainer, s.horitonzal)}>
        {typeArr.map((item, idx) => (
          <RadioButton
            className={s.radio}
            key={idx}
            id={item.id}
            value={item.value}
            type='radio'
            name={item.name}
            touched={formik.touched.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.type === item.value}
            onClick={() => {
              formik.setFieldValue(item.name, item.value);
            }}
          >
            {item.id}
          </RadioButton>
        ))}
      </InputGroup>
      <Label htmlFor='rate'>
        <b>Rate *</b>
      </Label>
      <InputGroup>
        <Input
          type='number'
          step='.01'
          error={formik.errors.rate}
          touched={formik.touched.rate}
          value={formik.values.rate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id='rate'
          name='rate'
        />
        <InputGroupAddon addonType='Append'>%</InputGroupAddon>
      </InputGroup>
      <Label htmlFor='term'>
        <b>Term *</b>
      </Label>
      <InputGroup>
        <Input
          type='number'
          step='1'
          error={formik.errors.term}
          touched={formik.touched.term}
          value={formik.values.term}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id='term'
          name='term'
        />
        <InputGroupAddon addonType='Append'>Years</InputGroupAddon>
      </InputGroup>
      <Button type='submit' className={s.btn}>
        Calculate
      </Button>
    </form>
  );
};

export default MortgageForm;
