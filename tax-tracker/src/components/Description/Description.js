import React from 'react';
import classnames from 'classnames';
import { formatNumber, generateTaxYear } from '../../helpers/helpers';
import studentLoanThresholds from '../../data/staticData/studentLoanRates.json';
import TextBlock from '../TextBlock';
import s from './style.module.scss';
const Description = ({ className }) => {
  const currentTaxYear = generateTaxYear();
  const { plan_1, plan_2 } = studentLoanThresholds[currentTaxYear];
  return (
    <TextBlock className={classnames(s.description, className)}>
      <h2>How to use Simple Salary Tax Calcuator</h2>
      <p>
        Using Simple Salary is easier then ever, input your salary, choose how
        often you get paid your salary and hit Enter! <br />
        There are also a selection of additional options you can choose to
        calculate your take home pay. <br />
        See how much you earn per minute!
      </p>
      <p>
        You have the option of choosing if you want to enter your salary per{' '}
        <b>Year, Month, Week or Day.</b> <br />
        Please note that when selecting <b>Per Day</b> and the table <b>Day</b>{' '}
        column, we are calculating under the assumption that there are{' '}
        <b>260 working days</b> in the year.
      </p>
      <br />
      <h2>Pension Contributions</h2>
      <p>
        If your Pension Contributions are automatically deducted form your
        payslip, you can enter the percentage rate that it is being deducted at.
        Percentage deductions are taken from the gross salary{' '}
        <b>(Before any tax is is deducted)</b>.
      </p>
      <br />
      <h2>Student Loan Calculation</h2>
      <p>
        If you are repaying your Student Loan, then you have the option to
        select which plan you are on.
        <br />
        <b>Plan 1</b> is if you began your studies before{' '}
        <b>1st September 2012</b>.
        <br />
        <b>Plan 2</b> is if you started after <b>1st September 2012</b>.
        <br />
        Simply select which plan you are on and the deductions will be
        calculated. <br />
        For both <b>Plan 1</b> and <b>Plan 2</b>, <b>9%</b> of the amount your
        gross pay is above the threshold is how much is taken from your pay. If
        your gross pay below the threshold then no amount is deducted. <br />
        The threshold for current year are{' '}
        <b>Plan 1: £{formatNumber(plan_1)}</b> and{' '}
        <b>Plan 2: £{formatNumber(plan_2)}</b>. These deductions are based on
        gross pay{' '}
        <b>(Before any tax and/or pension contributions are deducted)</b>
      </p>
      <br />
    </TextBlock>
  );
};

export default Description;
