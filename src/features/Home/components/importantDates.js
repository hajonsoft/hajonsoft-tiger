import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { eventsAfter, eventsBefore } from "../../../shared/util/hijri";

const ImportantDates = () => {
  return (
    <Grid container justify="space-between" style={{ padding: "1rem" }}>
      <Grid item>
        <Typography variant="body1" align="center" style={{ color: "#4caf50" }}>
          {eventsBefore()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center" style={{ color: "#4caf50" }}>
          {eventsAfter()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ImportantDates;
