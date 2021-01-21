import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';
import TableComponent from '../../components/TableComponent/TableComponent';
import { generateIncomeTax } from '../../data/incomeTax';
import s from './style.module.scss';
import { formatNumber } from '../../helpers/helpers';

const Table = ({ className, value }) => {
  const { totalTaxable, taxBand1, taxBand2, taxBand3 } = generateIncomeTax({
    salary: value,
  });
  const data = useMemo(
    () => [
      {
        col1: 'Gross Wage',
        col2: `£${
          typeof value === 'string' ? formatNumber(value) : value.toFixed(2)
        }`,
        col3: `£${formatNumber((value / 12).toFixed(2))}`,
      },
      {
        col1: 'Total Taxable',
        col2: `£${formatNumber(totalTaxable.yearly)}`,
        col3: `£${formatNumber(totalTaxable.monthly)}`,
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
    ],
    [
      taxBand1.monthly,
      taxBand1.yearly,
      taxBand2.monthly,
      taxBand2.yearly,
      taxBand3.monthly,
      taxBand3.yearly,
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
