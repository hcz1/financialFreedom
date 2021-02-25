import React from 'react';
import classnames from 'classnames';
import s from './style.module.scss';
import Popper from '../Popper/Popper';

const TableComponent = ({
  className,
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
  icons,
}) => {
  return (
    <table className={classnames(s.table, className)} {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell, i) => {
                    // Apply the cell props
                    const generateCell = cell.render('Cell');
                    const icon = icons.find(
                      (item) => item.col === cell.render('Cell').props.value
                    );
                    return (
                      <td {...cell.getCellProps()}>
                        <span>{generateCell}</span>
                        {!!icon && (
                          <Popper iconClassName={s.icon}>
                            <icon.PopperContent />
                          </Popper>
                        )}
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default TableComponent;
