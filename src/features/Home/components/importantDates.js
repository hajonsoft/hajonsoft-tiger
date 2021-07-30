import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { eventsAfter, eventsBefore } from "../../../util/hijri";

const ImportantDates = () => {
  return (
    <Grid container justify="space-between" style={{ padding: "1rem" }}>
      <Grid item>
        <Typography variant="body1" align="center" style={{ color: "#0055ba" }}>
          {eventsBefore()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center" style={{ color: "#003b82" }}>
          {eventsAfter()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ImportantDates;
