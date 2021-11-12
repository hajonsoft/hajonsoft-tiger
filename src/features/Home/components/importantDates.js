import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { eventsAfter, eventsBefore } from "../../../shared/util/hijri";

const ImportantDates = () => {
  return (
    <Grid container justify="space-between" style={{ padding: "1rem" }}>
      <Grid item md={12}>


      </Grid>
      <Grid item>
        <Typography variant="h5" align="center" color="textSecondary">
          {eventsBefore()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" align="center" color="textSecondary">
          {eventsAfter()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ImportantDates;
