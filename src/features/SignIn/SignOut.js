import { Paper, Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Typography } from '@material-ui/core';

const SignOut = () => {
  const history = useHistory();
  setTimeout(() => {
    history.push("/login");
  }, 3000);

  return (
    <div style={{ height: "60vh", padding: "3rem" }}>
      <Paper elevation={4} style={{height: '100%', padding: '3rem'}}>
          <Grid container justify="center" alignItems="center">
            <Typography variant="h6" color="textPrimary">You are now signed out. Redirecting to login page ...</Typography>
          </Grid>
      </Paper>
    </div>
  );
};

export default SignOut;
