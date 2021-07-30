import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid
} from "@material-ui/core";
import React from "react";
import AppHeader from "../shared/components/AppHeader/AppHeader";

const Help = () => {
  return (
    <React.Fragment>
      <AppHeader />

      <div
        style={{
          display: "flex",
          padding: "2rem",
        }}
      >
        <Grid container justify="center" spacing={4} alignItems="center">
          <Grid item md={4}>
            <Card style={{minHeight: 250}} variant="outlined" raised>
              <CardHeader
                title="HAJonSoft Support"
                subheader="Technical Support"
              ></CardHeader>
              <CardContent style={{minHeight: 80}}> 
                Book a meeting time that works for you to talk to a HAJonSoft
                technician.
              </CardContent>
              <CardActions>
                <a
                  href="https://meetings.hubspot.com/alialiayman"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{textDecoration: "none"}}
                >
                  <Button color="primary">Schedule</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card style={{minHeight: 250}} variant="outlined" raised>
              <CardHeader
                title="Community Support"
                subheader="Expand your network worldwide"
              ></CardHeader>
              <CardContent style={{minHeight: 80}}>
                Connect with Munazims around the world to network, discuss a
                business, a technical issue or a challenge. If you wish to be
                added here please contact technical support.
              </CardContent>
              <CardActions>
                <a
                  href="https://meetings.hubspot.com/alialiayman"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{textDecoration: "none"}}
                >
                  <Button color="primary" >Schedule</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card style={{minHeight: 250}} variant="outlined" raised>
              <CardHeader
                title="Training"
                subheader="Watch online course"
              ></CardHeader>
              <CardContent style={{minHeight: 80}}>
                Watch a course to learn the basics of HAJonSoft
              </CardContent>
              <CardActions>
                <a
                  href="https://hajonsoft.talentlms.com/shared/start/key:LZSIDNHR"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{textDecoration: "none"}}
                >
                  <Button color="primary" >Play</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Help;
