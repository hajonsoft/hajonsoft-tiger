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
          width: "100%",
          padding: "2rem",
        }}
      >
        <Grid container justify="center" spacing={4} alignItems="center">
          <Grid item md={4}>
            <Card raised>
              <CardHeader
                title="HAJonSoft Support"
                subheader="Technical Support"
              ></CardHeader>
              <CardContent>
                Book a meeting time that works for you to talk to a HAJonSoft
                technician.
              </CardContent>
              <CardActions>
                <a
                  href="https://meetings.hubspot.com/alialiayman"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained">Schedule</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card raised>
              <CardHeader
                title="Community Support"
                subheader="Expand your network worldwide"
              ></CardHeader>
              <CardContent>
                Connect with Munazims around the world to network, discuss a
                business, a technical issue or a challenge. If you wish to be
                added here please contact technical support.
              </CardContent>
              <CardActions>
                <a
                  href="https://meetings.hubspot.com/alialiayman"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained">Schedule</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card raised>
              <CardHeader
                title="Training"
                subheader="Watch online course"
              ></CardHeader>
              <CardContent>
                Watch a course to learn the basics of HAJonSoft
              </CardContent>
              <CardActions>
                <a
                  href="https://hajonsoft.talentlms.com/shared/start/key:LZSIDNHR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained">Play</Button>
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
