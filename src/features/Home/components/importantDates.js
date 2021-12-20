import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { eventsAfter, eventsBefore, eventsNow } from "../../../shared/util/hijri";

const ImportantDates = () => {
  return (
    <Box p={2} width="100%">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle1" align="left" color="textSecondary">
            {eventsBefore()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {eventsNow()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" align="right" color="textSecondary">
            {eventsAfter()}
          </Typography>
        </Grid>
      </Grid>
    </Box>

  );
};

export default ImportantDates;
