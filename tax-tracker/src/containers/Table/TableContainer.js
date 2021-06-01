import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';
import { CSVLink } from 'react-csv';
import { Pie } from 'react-chartjs-2';
import TableComponent from '../../components/TableComponent/TableComponent';
import Button from '../../components/Button';
import { formatNumber } from '../../helpers/helpers';
import { nationalInsurance, studentLoan, calculateIncomeTax } from '../../data';
import { icons } from './Icons/Icons';
import s from './style.module.scss';

const Table = React.forwardRef(
  (
    {
      className,
      value,
      studentLoanType,
      pensionValue,
      multiplier = 1,
      taxYear,
      scottish,
    },
    ref
  ) => {
    const [isPieChart, setIsPieChart] = useState(false);
    const pensionPercentage = pensionValue / 100;
    const adjustedSalary = (1 - pensionPercentage) * (value * multiplier);
    const yearlySalary = value * multiplier;
    const country = scottish ? 'scotland' : 'england';
    const { rates, totalIncomeTaxable } = calculateIncomeTax({
      salary: adjustedSalary,
      year: taxYear,
      country,
    });

    const totalTax = Object.values(rates).reduce((a, b) => (a += b));
    const takeHome = adjustedSalary - totalTax;
    const nationalInsuranceYearly = nationalInsurance({
      salary: yearlySalary,
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
          pensionValue
            ? createColumns('Adjusted Wage', yearlySalary, adjustedSalary)
            : undefined,
          createColumns('Total Taxable', yearlySalary, totalIncomeTaxable),
          pensionValue
            ? createColumns(
                'Pension Contribution',
                yearlySalary,
                pensionPercentage * yearlySalary
              )
            : undefined,
          studentLoanType !== 'none'
            ? createColumns('Student Loan', yearlySalary, studentLoanYearly)
            : undefined,
          createColumns(
            'National Insurance',
            yearlySalary,
            nationalInsuranceYearly
          ),
          ...Object.keys(rates).map((key) =>
            createColumns(key, yearlySalary, rates[key])
          ),
          createColumns('Total Tax', yearlySalary, totalTax),
          createColumns(
            'Take Home',
            yearlySalary,
            takeHome - studentLoanYearly - nationalInsuranceYearly
          ),
          //createColumns('Previous Year', (total - studentLoanYearly - nationalInsuranceYearly) - (previousYearSalary.total - studentLoanYearly - nationalInsuranceYearly))
        ].filter(Boolean),
      [
        yearlySalary,
        pensionValue,
        studentLoanType,
        adjustedSalary,
        totalIncomeTaxable,
        pensionPercentage,
        studentLoanYearly,
        nationalInsuranceYearly,
        rates,
        totalTax,
        takeHome,
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
      <div ref={ref} className={classnames(s.tableBtnContainer, className)}>
        <Button
          className={s.switchBtn}
          onClick={() => {
            setIsPieChart((prev) => !prev);
          }}
        >
          Show {isPieChart ? 'Table' : 'Pie Chart'}
        </Button>
        {isPieChart ? (
          <Pie
            options={{
              tooltips: {
                callbacks: {
                  label: ({ index }, { datasets: [{ data }] }) =>
                    `£${formatNumber(data[index].toFixed(2))}`,
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
                  ].filter(Boolean),
                  borderColor: ['rgba(96, 219, 146, 0.150459)'],
                  backgroundColor: [
                    'rgb(96, 219, 146)',
                    '#7960db',
                    '#dbaa60',
                    '#db6c60',
                  ],
                },
              ],
              labels: [
                'Take Home',
                'Yearly Tax',
                'National Insurance',
                studentLoanType !== 'none' ? 'Student Loan' : undefined,
              ].filter(Boolean),
            }}
          />
        ) : (
          <div className={s.tableContainer}>
            <TableComponent
              className={s.table}
              icons={icons({ taxYear, country })}
              {...tableInstance}
            />
          </div>
        )}
        <CSVLink data={csvData}>
          <Button className={s.csvBtn}>Download CSV file</Button>
        </CSVLink>
      </div>
    );
  }
);

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
