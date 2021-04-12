import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import { formatNumber } from '../../../helpers/helpers';
import s from './style.module.scss';
const MortgageChart = ({
  className,
  monthly,
  totalInterest,
  totalPayed,
  yearly,
  term,
  rate,
  debt,
}) => {
  const labels = useMemo(
    () => Array.from({ length: term + 1 }).map((_, i) => i),
    [term]
  );
  return (
    <div className={classnames(s.mortgageChart, className)}>
      {yearly && yearly[0] && rate && (
        <>
          <div className={s.row}>
            <div>
              <h2>Per month:</h2>
              <p>
                Assuming interest rate stays at <b>{rate}%</b>
              </p>
            </div>
            <span>
              <b>£{monthly}</b>
            </span>
          </div>
          <div className={s.row}>
            <div>
              <h2>Total Paid:</h2>
              <p>
                Mortgage Debt: <b>£{debt}</b> + Total Interest:{' '}
                <b>£{totalInterest}</b>
              </p>
            </div>
            <span>
              <b>£{totalPayed}</b>
            </span>
          </div>
        </>
      )}

      <Line
        className={s.chart}
        data={{
          labels,
          xAxisID: 'Year',
          datasets: [
            {
              label: 'Mortgage Debt',
              data: yearly,
              fill: false,
              borderColor: 'rgba(96, 219, 146, 0.150459)',
              backgroundColor: 'rgba(96, 219, 146, 1)',
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: (item, data) => '£' + formatNumber(item.value),
              title: ([{ label }], data) => 'Year ' + label,
            },
          },
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
