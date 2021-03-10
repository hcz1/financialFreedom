import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';
import { CSVLink } from 'react-csv';
import TableComponent from '../../components/TableComponent/TableComponent';
import { formatNumber } from '../../helpers/helpers';
import { nationalInsurance, studentLoan } from '../../data';
import yearlyRates from '../../data/staticData/yearlyRates.json';
import { generateIncomeTax } from '../../data/incomeTax';
import s from './style.module.scss';
import Button from '../../components/Button';

const icons = ({ taxYear }) => [
  {
    col: 'Adjusted Wage',
    PopperContent: () => (
      <div>
        <p style={{ marginBottom: '12px' }}>
          <b>Adjusted wage</b> is your salary minus the amount you pay into your
          pension
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
            The tax year of <b>{taxYear}</b> basic rate tax is taxed from{' '}
            <b>£{formatNumber(taxData.personalAllowance + 1)}</b> to{' '}
            <b>
              £{formatNumber(taxData.basicRate + taxData.personalAllowance)}{' '}
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
            The tax year of <b>{taxYear}</b> higher rate tax is taxed from{' '}
            <b>
              £{formatNumber(taxData.basicRate + taxData.personalAllowance + 1)}
            </b>{' '}
            to <b>£{formatNumber(taxData.higherRate)}</b> at a rate of
            <b> 40%</b>
          </p>
          <p>
            Personal allowance drops <b>£1</b> for every <b>£2</b> above{' '}
            <b>£100,000</b> of gross salary
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
];

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
    year: taxYear,
  });

  const studentLoanYearly = studentLoan({
    salary: yearlySalary,
    type: studentLoanType,
    year: taxYear,
  });

  // const previousYearSalary = generateIncomeTax({
  //   salary: adjustedSalary,
  //   year: '18/19',
  // });

  const data = useMemo(
    () =>
      [
        createColumns('Gross Wage', yearlySalary, yearlySalary),
        createColumns('Adjusted Wage', yearlySalary, adjustedSalary),
        createColumns('Total Taxable', yearlySalary, totalTaxable),
        createColumns(
          'Pension Contribution',
          yearlySalary,
          pensionPercentage * yearlySalary
        ),
        createColumns('Student Loan', yearlySalary, studentLoanYearly),
        createColumns(
          'National Insurance',
          yearlySalary,
          nationalInsuranceYearly
        ),
        createColumns('Basic Rate', yearlySalary, taxBand1),
        createColumns('Additional Rate', yearlySalary, taxBand2),
        createColumns('Higher Rate', yearlySalary, taxBand3),
        createColumns(
          'Total Tax',
          yearlySalary,
          taxBand1 + taxBand2 + taxBand3
        ),
        createColumns(
          'Take Home',
          yearlySalary,
          total - studentLoanYearly - nationalInsuranceYearly
        ),
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
        Header: '%',
        accessor: 'col2',
      },
      {
        Header: 'Year',
        accessor: 'col3',
      },
      {
        Header: 'Month',
        accessor: 'col4',
      },
      {
        Header: 'Week',
        accessor: 'col5',
      },
      {
        Header: 'Day',
        accessor: 'col6',
      },
      {
        Header: 'Hour',
        accessor: 'col7',
      },
      {
        Header: 'Minute',
        accessor: 'col8',
      },
    ],

    []
  );
  const tableInstance = useTable({ columns, data });
  const csvData = [
    columns.map(({ Header }, i) => (i === 0 ? 'SimpleSalary' : Header)),
    ...data.map((row) => Object.values(row)),
    ['www.SimpleSalary.co.uk'],
  ];
  return (
    <div className={classnames(s.tableBtnContainer, className)}>
      <div className={s.tableContainer}>
        <TableComponent
          className={s.table}
          icons={icons({ taxYear })}
          {...tableInstance}
        />
      </div>
      <CSVLink data={csvData}>
        <Button>Download CSV file</Button>
      </CSVLink>
    </div>
  );
};

export default Table;
const roundAccurately = (number, decimalPlaces) =>
  Number(
    Math.round(Number(number + 'e' + decimalPlaces)) + 'e' + decimalPlaces * -1
  );

const generatePercentage = (yearlySalary, yearlyAmount) =>
  !!yearlySalary && !!yearlyAmount
    ? roundAccurately((yearlyAmount / yearlySalary) * 100, 2)
    : 0;
function createColumns(columnName, yearlySalary, yearlyAmount) {
  return {
    col1: columnName,
    col2: `${generatePercentage(yearlySalary, yearlyAmount)}%`,
    col3: `£${formatNumber(yearlyAmount.toFixed(2))}`,
    col4: `£${formatNumber((yearlyAmount / 12).toFixed(2))}`,
    col5: `£${formatNumber((yearlyAmount / 52).toFixed(2))}`,
    col6: `£${formatNumber((yearlyAmount / 260).toFixed(2))}`,
    col7: `£${formatNumber((yearlyAmount / 260 / 8).toFixed(2))}`, // based on 8 hour working day
    col8: `£${formatNumber((yearlyAmount / 260 / 8 / 60).toFixed(2))}`, // based on 8 hour working day
  };
}
