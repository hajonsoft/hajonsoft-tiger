import {
  Box,
  IconButton,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import Table from "./Table";
import ReactToPrint from "react-to-print";
import Edit from "@material-ui/icons/Edit";

// birthDate: "2012-02-06 00:00:00"
// birthPlace: "UNITED STATES"
// comments: "P,USAIBRAHIM,,ZUBAIDAH,JANNAH,,,,,,,,,,,,,,,\r\n5399269045USA1202063F2102078612848510,305764"
// createDt: "2018-11-26 09:05:14.247000"
// email: ""
// gender: "Female"
// idNumber: "539926904"
// idNumberExpireDate: "1900-01-01 00:00:00"
// idNumberIssueDate: "1900-01-01 00:00:00"
// name: "ZUBAIDAH JANNAH IBRAHIM"
// nameArabic: "ZUBAIDAH JANNAH IBRAHIM"
// nationality: "United States"
// onSoftId: 1
// passExpireDt: "2021-02-07 00:00:00"
// passIssueDate: "2016-02-08 00:00:00"
// passPlaceOfIssue: "USDS"
// passportNumber: "539926904"
// phone: "732-479-2711"
// profession: "Infant"
// relationship: "Father"
// _fid: "416187"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const EmbassyReports = ({ passengers }) => {
  const [data] = useState(passengers);
  const [title, setTitle] = useState("Customers");
  const [showInput, setShowInput] = useState(false);
  const classes = useStyles();
  const [columns,] = useState([
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
      Header: "Profession",
      accessor: "profession",
    },
  ]);
  const inputRef = useRef(null);


  return (
    <Box>
      <Grid
        container
        className={classes.root}
        justify="space-between"
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
              <Button
                style={{
                  background: "rgb(227, 242, 253)",
                  textTransform: "none",
                  color: "#03a9f4",
                  paddingLeft: "2rem",
                  paddingRight: "2rem"
                }}
                variant="contained"
                color="primary"
              >
                Print
              </Button>
            )}
            // content={() => componentRef.current}
          />
        </Grid>
      </Grid>

      <Table columns={columns} data={data} />
    </Box>
  );
};

export default EmbassyReports;
