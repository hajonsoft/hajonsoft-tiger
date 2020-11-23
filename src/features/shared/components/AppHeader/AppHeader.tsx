import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import firebase from "../../../../firebaseapp";
import { IHeaderConfig } from "../interfaces";

const AppHeader = ({ config }: { config: IHeaderConfig }) => {
  const [user] = useAuthState(firebase.auth());

  let history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/logout");
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ color: "#bff3ff" }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <Typography variant="h6">HAJonSoft</Typography>
          </Grid>
          <Grid item>
            <Button style={{ color: "#bff3ff" }}>News</Button>
            <Button style={{ color: "#bff3ff" }}>Hotels</Button>
            <Button style={{ color: "#bff3ff" }}>Flights</Button>
            <Button style={{ color: "#bff3ff" }}>Sponsor</Button>
            <Button style={{ color: "#bff3ff" }}>Help</Button>
          </Grid>
          <Grid item aria-label="Sign out">
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="caption" style={{ color: "#80e8ff" }}>
                  {user.email}
                </Typography>
              </Grid>

              <Grid item>
                <Button onClick={handleLogout} style={{ color: "#bff3ff" }}>
                  Sign out
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
