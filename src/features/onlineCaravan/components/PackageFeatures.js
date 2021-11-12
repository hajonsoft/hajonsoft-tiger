import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
const PackageFeatures = ({ detail }) => {
  const history = useHistory();

  return (
    <Paper
      elevation={3}
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "#e8f5e9",
      }}
    >
      <Typography variant="h6" align="center">
        {detail.name}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        gutterBottom
      >{`${detail.headline}`}</Typography>
      <Box p={2}>
        <Typography>{detail.description}</Typography>
      </Box>
      <Box p={2}>
        <Typography variant="h6">Features</Typography>
        <div>
          <ul>
            <li>
              {detail.departureAirport &&
                `Departure from: ${detail.departureAirport}`}
            </li>
            <li>
              {detail.departureDate &&
                `Departure date: ${moment(detail.departureDate).format(
                  "dddd DD-MMM-YYYY"
                )} ${moment(detail.departureDate).fromNow()}`}
            </li>
            <li>
              {detail.departureFlight &&
                `Departure Flight: ${detail.departureFlight}`}
            </li>
            <li>
              {detail.arrivalAirport && `Arrival To: ${detail.arrivalAirport}`}
            </li>
            <li>
              {detail.returnAirport && `Rebound from: ${detail.returnAirport}`}
            </li>
            <li>
              {detail.returnFlight && `Rebound flight: ${detail.returnFlight}`}
            </li>
            <li>
              {detail.returnDate &&
                `Rebound date: ${moment(detail.returnDate).format(
                  "dddd DD-MMM-YYYY"
                )} ${moment(detail.returnDate).fromNow()}`}
            </li>
            <li>
              {detail.arrivalHotel &&
                `Accommodation upon arrival: ${detail.arrivalHotel}`}
            </li>
            <li>
              {detail.departureHotel &&
                `Accommodation afterwards: ${detail.departureHotel}`}
            </li>
          </ul>
        </div>
      </Box>

      <Grid container spacing={2} justify="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => history.push("/reserve/" + detail.name)}
          >
            Book Now
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => history.push("/reserve/Enquire-" + detail.name)}
          >
            Enquire
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PackageFeatures;
