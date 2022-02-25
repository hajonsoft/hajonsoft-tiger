import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import imoment from 'moment-hijri';
import moment from 'moment';
import WordOfDay from "./wordOfDay";

const ImportantDates = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Grid
      container
      direction={`${isMobile ? 'column' : 'row'}`}
      justifyContent="space-between"
      alignItems="center"
      style={{ width: '100%', padding: '16px 32px' }}
    >
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h4" color="textSecondary">
              {moment().format("YYYY")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              {moment().format("MMMM")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary">
              {moment().format("DD")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={8}>
        <WordOfDay />
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Typography color="textSecondary">
              {imoment().format("iDD")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              {imoment().format("iMMMM")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="textSecondary">
              {imoment().format("iYYYY")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImportantDates;
