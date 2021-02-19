import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';
import TableComponent from '../../components/TableComponent/TableComponent';
import { formatNumber } from '../../helpers/helpers';
import { generateIncomeTax, nationalInsurance, studentLoan } from '../../data';
import s from './style.module.scss';

const Table = ({ className, value, studentLoanType, pensionValue, multiplier }) => {  
  multiplier = (multiplier === undefined) ? 1 : multiplier;
  const pensionPercentage = pensionValue / 100;
  const adjustedSalary = (1 - pensionPercentage) * (value * multiplier);
  const yearlySalary = value * multiplier;
  const {
    totalTaxable,
    taxBand1,
    taxBand2,
    taxBand3,
    total,
  } = generateIncomeTax({
    salary: adjustedSalary,
  });

  const { yearly: NIYearly, monthly: NIMonthly } = nationalInsurance({
    salary: adjustedSalary,
  });

  const { yearly: SLYearly = 0, montly: SLMonthly = 0 } = studentLoan({
    salary: (value),
    type: studentLoanType,
  });
  const isStudentLoan = useMemo(
    () => ['plan_1', 'plan_2'].includes(studentLoanType),
    [studentLoanType]
  );
  const data = useMemo(
    () =>
      [
        {
          col1: 'Gross Wage',
          col2: `£${formatNumber((yearlySalary).toFixed(2))}`,
          col3: `£${formatNumber((yearlySalary / 12).toFixed(2))}`,
        },

        {
          col1: 'Adjusted Wage',
          col2: `£${formatNumber(adjustedSalary.toFixed(2))}`,
          col3: `£${formatNumber((adjustedSalary / 12).toFixed(2))}`,
        },

        {
          col1: 'Total Taxable',
          col2: `£${formatNumber(totalTaxable.yearly.toFixed(2))}`,
          col3: `£${formatNumber(totalTaxable.monthly.toFixed(2))}`,
        },
        {
          col1: 'Pension Contribution',
          col2: `£${formatNumber((pensionPercentage * yearlySalary).toFixed(2))}`,
          col3: `£${formatNumber(
            ((pensionPercentage * yearlySalary) / 12).toFixed(2)
          )}`,
        },
        {
          col1: 'Student Loan',
          col2:
            isStudentLoan && SLYearly
              ? `£${formatNumber(SLYearly.toFixed(2))}`
              : '£0.00',
          col3:
            isStudentLoan && SLMonthly
              ? `£${formatNumber(SLMonthly.toFixed(2))}`
              : '£0.00',
        },
        {
          col1: 'National Insurance',
          col2: `£${formatNumber(NIYearly.toFixed(2))}`,
          col3: `£${formatNumber(NIMonthly.toFixed(2))}`,
        },
        {
          col1: 'Band 1 20%',
          col2: `£${formatNumber(taxBand1.yearly.toFixed(2))}`,
          col3: `£${formatNumber(taxBand1.monthly.toFixed(2))}`,
        },
        {
          col1: 'Band 2 40%',
          col2: `£${formatNumber(taxBand2.yearly.toFixed(2))}`,
          col3: `£${formatNumber(taxBand2.monthly.toFixed(2))}`,
        },
        {
          col1: 'Band 3 45%',
          col2: `£${formatNumber(taxBand3.yearly.toFixed(2))}`,
          col3: `£${formatNumber(taxBand3.monthly.toFixed(2))}`,
        },
        {
          col1: 'Take Home',
          col2: `£${formatNumber(
            (adjustedSalary - total.yearly - NIYearly - SLYearly).toFixed(2)
          )}`,
          col3: `£${formatNumber(
            (
              adjustedSalary / 12 -
              total.monthly -
              NIMonthly -
              SLMonthly
            ).toFixed(2)
          )}`,
        },
      ].filter(Boolean),
    [
      yearlySalary,
      adjustedSalary,
      totalTaxable.yearly,
      totalTaxable.monthly,
      pensionPercentage,
      isStudentLoan,
      SLYearly,
      SLMonthly,
      NIYearly,
      NIMonthly,
      taxBand1.yearly,
      taxBand1.monthly,
      taxBand2.yearly,
      taxBand2.monthly,
      taxBand3.yearly,
      taxBand3.monthly,
      total.yearly,
      total.monthly,
    ]
  );
  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Year',
        accessor: 'col2',
      },
      {
        Header: 'Month',
        accessor: 'col3',
      },
    ],

    []
  );
  const tableInstance = useTable({ columns, data });
  return (
    <div className={classnames(s.table, className)}>
      <TableComponent {...tableInstance} />
    </div>
  );
};

export default Table;
