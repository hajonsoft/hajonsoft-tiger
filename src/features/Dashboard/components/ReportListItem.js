import React, { useRef } from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import PrintableTable from "./PrintableTable";
import ReactToPrint from "react-to-print";
import { deleteReport } from "../../Dashboard/redux/reportSlice";
import { useDispatch } from "react-redux";


const ReportListItem = ({ name, caravanName, printingData }) => {
  const { columns, data } = printingData;
  const printTableRef = useRef();
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ display: "none" }}>
        <PrintableTable
          ref={printTableRef}
          columns={columns}
          data={data}
        />
      </div>
      <Grid
        container
        spacing={3}
        style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}
      >
        <Grid item md={1}>
          <AssessmentIcon color="primary" fontSize="large" />
        </Grid>
        <Grid item md={9}>
          <Typography style={{ fontWeight: "bold" }}> {name} </Typography>
          <Typography style={{ fontStyle: "italic", fontWeight: 100 }}>
            {" "}
            generated from {caravanName}{" "}
          </Typography>
        </Grid>
        <Grid item md={2}>
          <ReactToPrint
            trigger={() => (
              <IconButton>
                <PrintRoundedIcon color="action" fontSize="default" />
              </IconButton>
            )}
            content={() => printTableRef.current}
          />

          <IconButton onClick={() => {
            dispatch(deleteReport({ reportName: name, caravanName }))
          }} >
            <DeleteRoundedIcon color="secondary" fontSize="default" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportListItem;
