import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';
import TableComponent from '../../components/TableComponent/TableComponent';
import { formatNumber } from '../../helpers/helpers';
import { nationalInsurance, studentLoan } from '../../data';
import yearlyRates from '../../data/staticData/yearlyRates.json';
import { generateIncomeTax } from '../../data/incomeTax';
import s from './style.module.scss';

const Table = ({
  className,
  value,
  studentLoanType,
  pensionValue,
  multiplier = 1,
  taxYear,
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
    // allowance,
  } = generateIncomeTax({
    salary: adjustedSalary,
    year: taxYear,
  });
  const nationalInsuranceYearly = nationalInsurance({
    salary: adjustedSalary,
    year: taxYear
  });

  const studentLoanYearly = studentLoan({
    salary: yearlySalary,
    type: studentLoanType,
    year: taxYear
  });

  const previousYearSalary = generateIncomeTax({
    salary: adjustedSalary,
    year: "18/19",
  })

  const data = useMemo(
    () =>
      [
        createColumns('Gross Wage', yearlySalary),
        createColumns('Adjusted Wage', adjustedSalary),
        createColumns('Total Taxable', totalTaxable),
        createColumns('Pension Contribution', pensionPercentage * yearlySalary),
        createColumns('Student Loan', studentLoanYearly),
        createColumns('National Insurance', nationalInsuranceYearly),
        createColumns('Basic Rate', taxBand1),
        createColumns('Additional Rate', taxBand2),
        createColumns('Higher Rate', taxBand3),
        createColumns('Take Home', total - studentLoanYearly - nationalInsuranceYearly),
        //createColumns('Previous Year', (total - studentLoanYearly - nationalInsuranceYearly) - (previousYearSalary.total - studentLoanYearly - nationalInsuranceYearly))
      ].filter(Boolean),
    [
      yearlySalary,
      adjustedSalary,
      totalTaxable,
      pensionPercentage,
      studentLoanYearly,
      nationalInsuranceYearly,
      taxBand1,
      taxBand2,
      taxBand3,
      total,
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
      {
        Header: 'Week',
        accessor: 'col4',
      },
      {
        Header: 'Day',
        accessor: 'col5',
      },
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
          {
            col: 'Basic Rate',
            PopperContent: () => {
              const taxData = yearlyRates[taxYear];
              return (
                <div>
                  <p>
                    The tax year of <b>{taxYear}</b> basic rate tax is taxed
                    from <b>£{formatNumber(taxData.personalAllowance + 1)}</b>{' '}
                    to{' '}
                    <b>
                      £
                      {formatNumber(
                        taxData.basicRate + taxData.personalAllowance
                      )}{' '}
                    </b>{' '}
                    at a rate of
                    <b> 20%</b>
                    <br />
                  </p>
                </div>
              );
            },
          },
          {
            col: 'Additional Rate',
            PopperContent: () => {
              const taxData = yearlyRates[taxYear];
              return (
                <div>
                  <p style={{ marginBottom: '12px' }}>
                    The tax year of <b>{taxYear}</b> higher rate tax is taxed
                    from{' '}
                    <b>
                      £
                      {formatNumber(
                        taxData.basicRate + taxData.personalAllowance + 1
                      )}
                    </b>{' '}
                    to <b>£{formatNumber(taxData.higherRate)}</b> at a rate of
                    <b> 40%</b>
                  </p>
                  <p>
                    Personal allowance drops <b>£2</b> for every <b>£1</b> above{' '}
                    <b>£100,000</b>
                    {/* <br />
                    Your personal allowance is down{' '}
                    <b>£{formatNumber(allowance)}</b> from{' '}
                    <b>£{formatNumber(taxData.personalAllowance)} </b>to{' '}
                    <b>
                      £{formatNumber(taxData.personalAllowance - allowance)}
                    </b> */}
                  </p>
                </div>
              );
            },
          },
          {
            col: 'Higher Rate',
            PopperContent: () => {
              const taxData = yearlyRates[taxYear];
              return (
                <div>
                  <p>
                    The tax year of <b>{taxYear}</b> higher rate tax is taxed at{' '}
                    <b>£{formatNumber(taxData.higherRate)}+</b> at a rate of
                    <b> 45%</b>
                  </p>
                </div>
              );
            },
          },
        ]}
        {...tableInstance}
      />
    </div>
  );
};

export default Table;

function createColumns(columnName, yearlyAmount) {
  return {
    col1: columnName,
    col2: `£${formatNumber(yearlyAmount.toFixed(2))}`,
    col3: `£${formatNumber((yearlyAmount / 12).toFixed(2))}`,
    col4: `£${formatNumber((yearlyAmount / 52).toFixed(2))}`,
    col5: `£${formatNumber((yearlyAmount / 260).toFixed(2))}`,
  };
}
