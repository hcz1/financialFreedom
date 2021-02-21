import React from 'react';
import classnames from 'classnames';
import { usePopperTooltip } from 'react-popper-tooltip';
import s from './style.module.scss';

const TableComponent = ({
  className,
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
  icons,
}) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();
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
                        {!!icon && icon.icon(setTriggerRef)}
                        {visible && !!icon && (
                          <div
                            ref={setTooltipRef}
                            {...getTooltipProps({
                              className: classnames(
                                'tooltip-container',
                                s.tooltip
                              ),
                            })}
                          >
                            {<icon.PopperContent />}
                            <div
                              {...getArrowProps({
                                className: 'tooltip-arrow',
                              })}
                            />
                          </div>
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
