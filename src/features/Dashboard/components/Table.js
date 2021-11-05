import { IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import React from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import styles from "./table.module.css";

function Table({ columns, data }) {
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // TODO: edit column

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {// Loop over the header rows
        headerGroups.map((headerGroup) => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
            headerGroup.headers.map((column) => (
              // Apply the header cell props
              <th {...column.getHeaderProps()}>
                {// Render the header
                column.render("Header")}{" "}
                <Edit color="primary" fontSize="small" />
              </th>
            ))}
            <th>
              <IconButton>
                <AddCircle color="primary" fontSize="large" />
              </IconButton>
            </th>
          </tr>
        ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
        rows.map((row) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {// Loop over the rows cells
              row.cells.map((cell) => {
                // Apply the cell props
                return (
                  <td {...cell.getCellProps()}>
                    {// Render the cell contents
                    cell.render("Cell")}
                  </td>
                );
              })}
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
