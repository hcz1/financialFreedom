import React, { useMemo, useState } from 'react';
import s from './style.module.scss';
import { Line } from 'react-chartjs-2';
import MortgageForm from './MortgageForm/MortgageForm';
import { formatNumber } from '../../helpers/helpers';
import MortgageCalc from 'tiny-mortgage';

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
    const { rate, mortgageDebt: principle, deposit, term } = values;
    const m = new MortgageCalc(principle, deposit, rate, term);
    const debt = principle * (1 - m.downpayment);
    const yearly = [debt];
    for (let i = 12; i <= term * 12; i += 12) {
      yearly.push(m.getSpecificMonth(i).newLoanAmount);
    }
    setMortgage({
      monthly: formatNumber(m.monthlyPayment.toFixed(2)),
      totalInterest: formatNumber((m.getTotal() - debt).toFixed(2)),
      totalPayed: formatNumber(m.getTotal().toFixed(2)),
      yearly,
      term,
    });
  };
  const labels = useMemo(
    () => Array.from({ length: mortgage.term + 1 }).map((_, i) => i),
    [mortgage.term]
  );
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
            labels,
            xAxisID: 'Year',
            datasets: [
              {
                label: 'Year Owing',
                data: mortgage.yearly,
                fill: false,
                borderColor: 'rgba(96, 219, 146, 0.150459)',
                backgroundColor: 'rgba(96, 219, 146, 1)',
              },
            ],
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function (label, index, labels) {
                      return (
                        '£' +
                        label.toLocaleString(navigator.language, {
                          minimumFractionDigits: 0,
                        })
                      );
                    },
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Year',
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Mortgage;
