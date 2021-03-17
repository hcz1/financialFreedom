import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import s from './style.module.scss';
const MortgageChart = ({
  className,
  monthly,
  totalInterest,
  totalPayed,
  yearly,
  term,
}) => {
  const labels = useMemo(
    () => Array.from({ length: term + 1 }).map((_, i) => i),
    [term]
  );
  return (
    <div className={classnames(s.mortgageChart, className)}>
      <h2>Per month: £{monthly}</h2>
      <h2>Total interest: £{totalInterest}</h2>
      <h2>Total Paid: £{totalPayed}</h2>
      <Line
        className={s.chart}
        data={{
          labels,
          xAxisID: 'Year',
          datasets: [
            {
              label: 'Year Owing',
              data: yearly,
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
  );
};

export default MortgageChart;
