import React from 'react';
import classnames from 'classnames';
import { Pie } from 'react-chartjs-2';
import { formatNumber } from '../../../helpers/helpers';
import style from './pie-chart.module.scss';

export const PieChart = ({
  className,
  takeHome,
  totalTax,
  nationalInsuranceYearly,
  studentLoanType,
  studentLoanYearly,
  pensionValue,
  pensionAmount,
}) => (
  <div className={classnames(style.pieChart, className)}>
    <Pie
      options={{
        tooltips: {
          callbacks: {
            label: ({ index }, { datasets: [{ data }], labels }) => {
              return `${labels[index]}: £${formatNumber(
                data[index].toFixed(2)
              )}`;
            },
          },
        },
      }}
      data={{
        datasets: [
          {
            data: [
              takeHome,
              totalTax,
              nationalInsuranceYearly,
              studentLoanType !== 'none' ? studentLoanYearly : undefined,
              pensionValue ? pensionAmount : undefined,
            ].filter(Boolean),
            borderColor: ['rgba(96, 219, 146, 0.150459)'],
            backgroundColor: [
              'rgb(96, 219, 146)',
              '#7960db',
              '#dbaa60',
              '#db6c60',
              '#DBCF60',
            ],
          },
        ],
        labels: [
          'Take Home',
          'Yearly Tax',
          'National Insurance',
          studentLoanType !== 'none' ? 'Student Loan' : undefined,
          pensionValue ? 'Pension' : undefined,
        ].filter(Boolean),
      }}
    />
    )
  </div>
);

export default PieChart;
