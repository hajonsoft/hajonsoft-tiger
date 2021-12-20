import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { eventsAfter, eventsBefore, eventsNow } from "../../../shared/util/hijri";

const ImportantDates = () => {
  return (
    <Box p={2} width="100%">
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item md={3}>
          <Typography variant="subtitle1" align="left" color="textSecondary">
            {eventsBefore()}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2">
            {eventsNow()}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="subtitle1" align="right" color="textSecondary">
            {eventsAfter()}
          </Typography>
        </Grid>
      </Grid>
    </Box>

  );
};

export default ImportantDates;
