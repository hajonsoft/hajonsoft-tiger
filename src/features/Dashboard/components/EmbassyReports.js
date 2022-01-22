import {
  Box,
  IconButton,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  Modal,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import Table from "./Table";
import ReactToPrint from "react-to-print";
import Edit from "@material-ui/icons/Edit";
import PrintableTable from "./PrintableTable";
import { createReport } from "../../Dashboard/redux/reportSlice";
import { useDispatch } from "react-redux";
import { PrintOutlined, SaveOutlined } from "@material-ui/icons";
import moment from "moment";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
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
}));

const EmbassyReports = ({ passengers }) => {
  const [data, setData] = useState(formatPassengers(passengers));

  function formatPassengers(data) {
    const formattedPassengers = [];
    for (let i = 0; i < data.length; i++) {
      const nameParts = data[i].name.split(" ");
      formattedPassengers.push({
        seq: i + 1,
        ...data[i],
        birthDate: moment(data[i].birthDate).format("D-MMM-YYYY"),
        idNumberIssueDate: moment(data[i].idNumberIssueDate).format(
          "D-MMM-YYYY"
        ),
        idNumberExpireDate: moment(data[i].idNumberExpireDate).format(
          "D-MMM-YYYY"
        ),
        passExpireDt: moment(data[i].passExpireDt).format("D-MMM-YYYY"),
        passIssueDt: moment(data[i].passIssueDt).format("D-MMM-YYYY"),
        amadeusNM: `NM1${_.head(nameParts)}/${_.last(nameParts)} ${gTitle(
          data[i]
        )}`,
        saber_: `-${_.head(nameParts)}/${_.last(nameParts)} ${gTitle(
          data[i]
        )}`,
        amadeusSRDOC: `3DOCS/DB/${moment(data[i]).format(
          "DDMMMYYYY"
        )}/${_.head(nameParts)}/${_.last(nameParts)}/H`,
        saberSRDOC: `3DOCS/DB/${moment(data[i]).format(
          "DDMMMYYYY"
        )}/${_.head(nameParts)}/${_.last(nameParts)}/H`,
      });
    }

    function gTitle(passenger, g = "amadeus") {
      if (!passenger.birthDate) return "XX";
      if (!passenger.gender) return "XX";
      const age = moment().diff(passenger.birthDate, "years");
      if (age <= 2) return "INF";
      if (age <= 12) return "CHD";
      if (passenger.gender === "Male") return "MR";
      if (passenger.gender === "Female") return "MRS";
      return "XXX";
    }

    return formattedPassengers;
  }
  const [title, setTitle] = useState("Customers");
  const [showInput, setShowInput] = useState(false);
  const classes = useStyles();
  const [columns, setColumns] = useState([
    {
      Header: "Seq",
      accessor: "seq",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Passport Number",
      accessor: "passportNumber",
    },
    {
      Header: "Birth Date",
      accessor: "birthDate",
    },
  ]);
  const [openSaveModal, setOpenSaveModal] = useState("");
  const [saveReportName, setSaveReportName] = useState("");
  const inputRef = useRef(null);
  const printTableRef = useRef();
  const dispatch = useDispatch();

  return (
    <Box>
      <Modal
        open={openSaveModal}
        onClose={() => {
          setSaveReportName("");
          setOpenSaveModal(false);
        }}
      >
        <Box className={classes.paper}>
          <Typography className={classes.title}>New Report Name</Typography>
          <Grid item xs={12}>
            <TextField
              value={saveReportName}
              onChange={(e) => {
                const { value } = e.target;
                setSaveReportName(value);
              }}
              label="Report Name"
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
                dispatch(
                  createReport({
                    reportName: saveReportName,
                    reportData: { columns },
                  })
                );
                setSaveReportName("");
                setOpenSaveModal(false);
              }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Grid
        container
        className={classes.root}
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={6} md={6}>
          {showInput ? (
            <TextField
              inputRef={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <Typography style={{ display: "inline" }}> {title} </Typography>
          )}
          <IconButton
            onClick={() => {
              setShowInput(true);
              console.log(inputRef.current);
              //   inputRef.current.focus()
            }}
            // onBlur={() => setShowInput(false)}
            color="primary"
            aria-label="edit"
          >
            <Edit />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ReactToPrint
            trigger={() => (
              <IconButton>
                <PrintOutlined />
              </IconButton>
            )}
            content={() => printTableRef.current}
          />
          <IconButton onClick={() => setOpenSaveModal(true)}>
            <SaveOutlined />
          </IconButton>
        </Grid>
      </Grid>

      <div style={{ display: "none" }}>
        <PrintableTable ref={printTableRef} columns={columns} data={formatPassengers(data)} />
      </div>

      <Table
        columns={columns}
        data={formatPassengers(data)}
        onFilterColumn={(isFiltering) => {
          if (isFiltering) {
            setColumns((prev) => [{ Header: "", accessor: "delete" }, ...prev]);
            setData((prev) => prev.map((d) => ({ ...d, delete: "" })));
          } else {
            setColumns((prev) =>
              prev.filter((val) => val.accessor !== "delete")
            );
            setData((prev) => {
              delete prev.delete;
              return prev;
            });
          }
        }}
        onDeleteColumn={(columnAccessor) => {
          setColumns((prev) =>
            prev.filter((column) => column.accessor !== columnAccessor)
          );
        }}
        onNewColumn={(newColumn) => {
          setColumns((prev) => [...prev, newColumn]);
        }}
        onDeleteRow={(rowId) => {
          setData((prev) => prev.filter((d) => d._fid !== rowId));
        }}
        onEditColumn={(editColumnData) => {
          setColumns((prev) => {
            return prev.map((column) => {
              if (column.accessor === editColumnData.oldHeader) {
                return {
                  ...column,
                  Header: editColumnData.newHeader,
                };
              }

              return column;
            });
          });
        }}
      />
    </Box>
  );
};

export default EmbassyReports;
