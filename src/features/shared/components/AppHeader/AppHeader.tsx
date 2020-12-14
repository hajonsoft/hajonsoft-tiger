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
      <Toolbar style={{ color: "#fff" }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <Typography variant="h6">HAJonSoft</Typography>
          </Grid>
          <Grid item xs={7}>
            <Button style={{ color: "#fff", textTransform: 'none' }} onClick={()=> history.push('/groups')}>Groups</Button>
            <Button style={{ color: "#fff", textTransform: 'none' }} onClick={()=> history.push('/online')}>Online</Button>
            <Button style={{ color: "#fff", textTransform: 'none' }} onClick={()=> history.push('/news')}>News</Button>
            <Button style={{ color: "#fff", textTransform: 'none' }} onClick={()=> history.push('/hotels')}>Hotels</Button>
            <Button style={{ color: "#fff", textTransform: 'none' }} onClick={()=> history.push('/flights')}>Flights</Button>
            <Button style={{ color: "#fff", textTransform: 'none' }} onClick={()=> history.push('/sponsor')}>Sponsor</Button>
            <Button style={{ color: "#fff", textTransform: 'none' }} onClick={()=> history.push('/help')}>Help</Button>
          </Grid>
          <Grid item xs={3} container spacing={2} alignItems="center" justify="flex-end" aria-label="Sign out" >
              <Grid item>
                <Typography variant="body2" style={{ color: "#fff" }}>
                  {user.email}
                </Typography>
              </Grid>

              <Grid item>
                <Button onClick={handleLogout} style={{ color: "#fff" }}>
                  Sign out
                </Button>
              </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
