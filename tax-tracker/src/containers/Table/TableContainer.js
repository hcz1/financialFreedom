import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';
import TableComponent from '../../components/TableComponent/TableComponent';
import { formatNumber } from '../../helpers/helpers';
import { nationalInsurance, studentLoan } from '../../data';
import { generateIncomeTax } from '../../data/incomeTax';
import s from './style.module.scss';

const Table = ({
  className,
  value,
  studentLoanType,
  pensionValue,
  multiplier = 1,
}) => {
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
    year: '20/21',
  });

  const { yearly: NIYearly, monthly: NIMonthly } = nationalInsurance({
    salary: adjustedSalary,
  });

  const studentLoanYearly = studentLoan({
    salary: yearlySalary,
    type: studentLoanType,
  });

  console.log(studentLoanYearly);

  const data = useMemo(
    () =>
      [
        createColumns("Gross Wage", yearlySalary),
        createColumns("Adjusted Wage", adjustedSalary),
        createColumns("Total Taxable", totalTaxable),        
        createColumns("Pension Contribution", pensionPercentage * yearlySalary),
        createColumns("Student Loan", studentLoanYearly),
        createColumns("National Insurance", NIYearly),
        createColumns("Band 1 20%", taxBand1),
        createColumns("Band 2 40%", taxBand2),
        createColumns("Band 3 45%", taxBand3),
        createColumns("Take Home", total - studentLoanYearly - NIYearly)
      ].filter(Boolean),
    [
      yearlySalary,
      adjustedSalary,
      totalTaxable.yearly,
      totalTaxable.monthly,
      pensionPercentage,
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
      studentLoanYearly
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
      },{

        Header: 'Week',
        accessor: 'col4',
      },
      {
        Header: 'Day',
        accessor: 'col5',
      }
    ],

    []
  );
  const tableInstance = useTable({ columns, data });
  return (
    <div className={classnames(s.table, className)}>
      <TableComponent
        icons={[
          {
            col: 'Adjusted Wage',
            PopperContent: () => (
              <div>
                <p style={{ marginBottom: '12px' }}>
                  <b>Adjusted wage</b> is your salary minus the amount you pay
                  into your pension
                </p>
                <p>The adjusted wage is what your tax is based on</p>
              </div>
            ),
          },
        ]}
        {...tableInstance}
      />
    </div>
  );
};

export default Table;

function createColumns(columnName, yearlyAmount){
  return {
    col1: columnName,
    col2: `£${formatNumber(yearlyAmount.toFixed(2))}`,
    col3: `£${formatNumber((yearlyAmount / 12).toFixed(2))}`,
    col4: `£${formatNumber((yearlyAmount / 52).toFixed(2))}`,
    col5: `£${formatNumber((yearlyAmount / 260).toFixed(2))}`,
  }
}