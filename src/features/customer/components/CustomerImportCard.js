import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Folder from "@material-ui/icons/Folder";
import Alert from "@material-ui/lab/Alert";

const CustomerImportCard = ({ importData }) => {
  return importData.status === "not imported yet" ? (
    <Card width="100%">
      <Grid container spacing={2}>
        <Grid item>
          <CircularProgress></CircularProgress>
        </Grid>
        <Grid item>
          <Folder></Folder>
        </Grid>
        <Grid item xs>
          {importData.id}
        </Grid>
      </Grid>
    </Card>
  ) : importData.status === "imported" ? (
    <Alert
      color={"info"}
      severity={"success"}
    >{`Customer of "${importData.id}" files group was successfully imported`}</Alert>
  ) : (
    <Alert
      color={"error"}
      severity={"error"}
    >{`Customer ${importData.id} ${importData.name} ${importData.passportNumber} failed to import`}</Alert>
  );
};

export default CustomerImportCard;
