import React, { useState } from 'react';
import MortgageForm from './MortgageForm/MortgageForm';
import { formatNumber } from '../../helpers/helpers';
import { generateInterest, generateRepayment } from './helpers';
import s from './style.module.scss';
import MortgageChart from './MortgageChart';

const mortgageTypeLookup = (...props) => ({
  repayment: generateRepayment(...props),
  interest: generateInterest(...props),
});
const Mortgage = () => {
  const [mortgage, setMortgage] = useState({
    term: 0,
    yearly: [],
    monthly: 0,
    totalInterest: 0,
    principle: 0,
    totalPayed: 0,
  });
  const handleSubmit = (values) => {
    const { rate, mortgageDebt: principle, deposit, term, type } = values;
    const debt = principle * (1 - deposit / 100);
    const { monthly, totalInterest, totalPayed, yearly } = mortgageTypeLookup({
      principle,
      deposit,
      rate,
      term,
      debt,
    })[type];

    setMortgage({
      monthly: formatNumber(monthly.toFixed(2)),
      totalInterest: formatNumber(totalInterest.toFixed(2)),
      totalPayed: formatNumber(totalPayed.toFixed(2)),
      yearly,
      term,
    });
  };
  return (
    <div className={s.mortgage}>
      <MortgageForm onSubmit={handleSubmit} />
      <MortgageChart className={s.chartContainer} {...mortgage} />
    </div>
  );
};

export default Mortgage;
