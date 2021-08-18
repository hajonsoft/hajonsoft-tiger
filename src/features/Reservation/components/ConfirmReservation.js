import { Box, Grid, Typography } from '@material-ui/core';
import confirmedImage from "../../../images/confirmed.svg";
import trans from "../../../util/trans";

import React from 'react'


const ConfirmReservation = ({reservationNumber})=> {

    return (
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100vh",
            paddingTop: "4rem",
          }}
        >
          <Grid
            container
            direction="column"
            spacing={4}
            justify="center"
            alignItems="center"
          >
            <Grid item style={{ backgroundColor: "#e8f5e9" }}>
              <Typography variant="h5">{reservationNumber}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {trans("reservation.completed")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {trans("reservation.completed-subheader")}
              </Typography>
            </Grid>
            <Grid item>
              <Box
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={confirmedImage} alt="confirmed" width="75%" height="75%"/>
              </Box>
            </Grid>
          </Grid>
        </div>
    )

}

export default ConfirmReservation;