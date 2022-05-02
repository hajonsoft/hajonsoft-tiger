import {
  IconButton,
  Modal,
  makeStyles,
  Typography,
  Box,
  Select,
  MenuItem,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { AddCircle, Delete } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import React, { useState } from "react";
import FilterIcon from "@material-ui/icons/Filter";
import { useTable, usePagination } from "react-table";
import styles from "./table.module.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: 0,
    right: 0,
    top: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: "1rem",
  },
  pagination: {
    background: "#f8f8f8",
    padding: "1rem",
  },
  paginationBtn: {
    background: "rgb(227, 242, 253)",
    textTransform: "none",
    color: "#03a9f4",
  },
}));

function Table({
  columns,
  data,
  onNewColumn,
  onDeleteColumn,
  onEditColumn,
  onFilterColumn,
  onDeleteRow
}) {
  const tableInstance = useTable({ columns, data }, usePagination);
  const [moreColumnModalOpen, setMoreColumnModalOpen] = useState(false);
  const [editColumnModalOpen, setEditColumnModalOpen] = useState(false);
  const [selectedNewColumn, setSelectedNewColumn] = useState("");
  const [editColumnName, setEditColumnName] = useState({
    oldHeader: "",
    newHeader: "",
  });
  const [isFiltering, setIsFiltering] = useState(false);

  const [newColumnText, setNewColumnText] = useState("");
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    // pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const getOptions = () => {
    const totalColumns = [
      "amadeusNM",
      "amadeusSRDOC",
      "birthDate",
      "birthPlace",
      "firstName",
      "email",
      "eNumber",
      "eNumberBarcode",
      "gender",
      "idNumber",
      "idNumberExpireDate",
      "idNumberIssueDate",
      "lastName",
      "mofaNumber",
      "mofaNumberBarcode",
      "name",
      "nameArabic",
      "nationality",
      "passExpireDt",
      "passIssueDt",
      "passPlaceOfIssue",
      "passportNumber",
      "phone",
      "profession",
      "relationship",
      "saber_",
      "saberSRDOC",
      "title",
    ];

    // return totalColumns.filter(column => !columns.includes(column) )

    return totalColumns;
  };

  return (
    <>
      <Modal
        open={editColumnModalOpen}
        onClose={() => setEditColumnModalOpen(false)}
      >
        <Box className={classes.paper}>
          <Typography className={classes.title}>
            {" "}
            Edit Column Title ( {editColumnName.oldHeader} ){" "}
          </Typography>
          <Grid item xs={12}>
            <TextField
              value={editColumnName.newHeader}
              onChange={(e) => {
                const { value } = e.target;
                setEditColumnName((prev) => ({ ...prev, newHeader: value }));
              }}
              label="Column Title"
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              style={{
                background: "rgb(227, 242, 253)",
                textTransform: "none",
                color: "#03a9f4",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
              onClick={() => {
                onEditColumn(editColumnName);
                setEditColumnName({
                  newHeader: "",
                  oldHeader: "",
                });
                setEditColumnModalOpen(false);
              }}
            >
              Edit
            </Button>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={moreColumnModalOpen}
        onClose={() => setMoreColumnModalOpen(false)}
      >
        <Box className={classes.paper}>
          <Typography className={classes.title}> Add More Columns</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel> Column Type </InputLabel>
                <Select
                  value={selectedNewColumn}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSelectedNewColumn(e.target.value);
                    setNewColumnText(e.target.value);
                  }}
                >
                  {getOptions().map((option) => (
                    <MenuItem value={option}> {option} </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={newColumnText}
                onChange={(e) => setNewColumnText(e.target.value)}
                label="Column Name"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                style={{
                  background: "rgb(227, 242, 253)",
                  textTransform: "none",
                  color: "#03a9f4",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
                onClick={() => {
                  setSelectedNewColumn("");
                  setNewColumnText("");
                  setMoreColumnModalOpen(false);
                  onNewColumn({
                    Header: newColumnText,
                    accessor: selectedNewColumn,
                  });
                }}
              >
                {" "}
                Add{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

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
                  {column.render("Header") && (
                    <>
                      <IconButton
                        onClick={() => {
                          setEditColumnModalOpen(true);
                          setEditColumnName({
                            oldHeader: column.id,
                            newHeader: column.id,
                          });
                        }}
                      >
                        <Edit color="primary" fontSize="small" />
                      </IconButton>
                      {isFiltering && (
                        <IconButton
                          onClick={() => {
                            onDeleteColumn(column.id);
                          }}
                        >
                          <Delete color="secondary" fontSize="small" />
                        </IconButton>
                      )}
                    </>
                  )}
                </th>
              ))}
              <th>
                <IconButton onClick={() => setMoreColumnModalOpen(true)}>
                  <AddCircle color="primary" fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setIsFiltering((prev) => {
                      // TODO: ADD a new column with delete icons
                      onFilterColumn(!prev);
                      return !prev;
                    })
                  }
                >
                  <FilterIcon color="secondary" fontSize="large" />
                </IconButton>
              </th>
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          page.map((row) => {
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
                      {cell.column.id === "delete" && (
                        <IconButton
                          onClick={() => {
                            onDeleteRow(cell.row.original._fid)
                          }}
                        >
                          <Delete color="secondary" fontSize="small" />
                        </IconButton>
                      )}
                    </td>
                  );
                })}
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Box className={classes.pagination}>
        <Button
          className={classes.paginationBtn}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>{" "}
        <Button
          className={classes.paginationBtn}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>{" "}
        <Button
          className={classes.paginationBtn}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>{" "}
        <Button
          className={classes.paginationBtn}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <TextField
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <Select
          value={pageSize}
          style={{ marginLeft: "1rem", minWidth: "30px" }}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <MenuItem value={pageSize}> Show {pageSize} </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
}

export default Table;
