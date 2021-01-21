import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';
import TableComponent from '../../components/TableComponent/TableComponent';
import { formatNumber } from '../../helpers/helpers';
import { generateIncomeTax, nationalInsurance, studentLoan } from '../../data';
import s from './style.module.scss';

const Table = ({ className, value, isStudentLoan }) => {
  const {
    totalTaxable,
    taxBand1,
    taxBand2,
    taxBand3,
    total,
  } = generateIncomeTax({
    salary: value,
  });

  const { yearly: NIYearly, monthly: NIMonthly } = nationalInsurance({
    salary: value,
  });

  const { yearly: SLYearly, montly: SLMonthly } = studentLoan({
    salary: value,
  });
  const data = useMemo(
    () => [
      {
        col1: 'Gross Wage',
        col2: `£${formatNumber(value.toFixed(2))}`,
        col3: `£${formatNumber((value / 12).toFixed(2))}`,
      },
      {
        col1: 'Total Taxable',
        col2: `£${formatNumber(totalTaxable.yearly)}`,
        col3: `£${formatNumber(totalTaxable.monthly)}`,
      },
      {
        col1: 'Student Loan',
        col2: isStudentLoan ? `£${formatNumber(SLYearly)}` : '£0.00',
        col3: isStudentLoan ? `£${formatNumber(SLMonthly)}` : '£0.00',
      },
      {
        col1: 'National Insurance',
        col2: `£${formatNumber(NIYearly)}`,
        col3: `£${formatNumber(NIMonthly)}`,
      },
      {
        col1: 'Band 1 20%',
        col2: `£${formatNumber(taxBand1.yearly)}`,
        col3: `£${formatNumber(taxBand1.monthly)}`,
      },
      {
        col1: 'Band 2 40%',
        col2: `£${formatNumber(taxBand2.yearly)}`,
        col3: `£${formatNumber(taxBand2.monthly)}`,
      },
      {
        col1: 'Band 3 45%',
        col2: `£${formatNumber(taxBand3.yearly)}`,
        col3: `£${formatNumber(taxBand3.monthly)}`,
      },
      {
        col1: 'Take Home',
        col2: `£${formatNumber(
          value - total.yearly - NIYearly - (isStudentLoan ? SLYearly : 0)
        )}`,
        col3: `£${formatNumber(
          (
            value / 12 -
            total.monthly -
            NIMonthly -
            (isStudentLoan ? SLMonthly : 0)
          ).toFixed(2)
        )}`,
      },
    ],
    [
      NIMonthly,
      NIYearly,
      SLMonthly,
      SLYearly,
      isStudentLoan,
      taxBand1.monthly,
      taxBand1.yearly,
      taxBand2.monthly,
      taxBand2.yearly,
      taxBand3.monthly,
      taxBand3.yearly,
      total.monthly,
      total.yearly,
      totalTaxable.monthly,
      totalTaxable.yearly,
      value,
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
