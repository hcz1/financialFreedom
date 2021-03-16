import React, { useState } from 'react';
import s from './style.module.scss';
import { Line } from 'react-chartjs-2';
import MortgageForm from './MortgageForm/MortgageForm';
import { formatNumber } from '../../helpers/helpers';

function calculate_balance(PMT, IR, NP) {
  return (PMT * (1 - Math.pow(1 + IR, -NP))) / IR;
}

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
    const { rate: rateStr, mortgageDebt, term: termStr } = values;
    const term = parseInt(termStr);
    const principle = parseFloat(mortgageDebt);
    const rate = parseFloat(rateStr);
    const interest = rate / 100 / 12;
    const payments = term * 12;
    const x = Math.pow(1 + interest, payments);
    const monthly = (principle * x * interest) / (x - 1);
    const yearly = [];
    console.log({ principle, rate, monthly });
    for (let i = term; i >= 0; i--) {
      yearly.push({
        year: i,
        debt: calculate_balance(monthly, interest, i * 12),
      });
    }
    const totalPayments = monthly * payments;
    const totalInterest = totalPayments - principle;
    const totalPayed = totalInterest + principle;
    console.log(yearly);
    setMortgage({
      totalInterest: formatNumber(totalInterest.toFixed(2)),
      term,
      yearly,
      principle,
      monthly: formatNumber(monthly.toFixed(2)),
      totalPayed: formatNumber(totalPayed.toFixed(2)),
    });
  };
  return (
    <div className={s.mortgage}>
      <MortgageForm onSubmit={handleSubmit} />
      <div className={s.chartContainer}>
        <h1>Per month: £{mortgage.monthly}</h1>
        <h1>Total interest: £{mortgage.totalInterest}</h1>
        <h1>Total Paid: £{mortgage.totalPayed}</h1>
        <Line
          className={s.chart}
          data={{
            labels: Array(mortgage.term)
              .fill(0)
              .map((_, i) => i + 1),
            datasets: [
              {
                label: 'payments',
                data: mortgage.yearly.map((item) => item.debt),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Mortgage;
