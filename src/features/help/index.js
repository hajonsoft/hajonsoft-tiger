import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import HajonsoftHeader from "../Header/HajonsoftHeader";
import React from "react";

const Help = () => {
  return (
    <React.Fragment>
      <HajonsoftHeader />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          padding: '2rem'
        }}
      >
        <Grid container justify="center" spacing={4} alignItems="center">
          <Grid item md={6}>
            <Card raised>
              <CardHeader title="Book a meeting"></CardHeader>
              <CardContent>
                Meet online with a support engineer. Click reserve button below
                to book a meeting
              </CardContent>
              <CardActions>
                <a
                  href="https://meetings.hubspot.com/alialiayman"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve meeting
                </a>
              </CardActions>
            </Card>
          </Grid>

          <Grid item md={6}>
            <Card raised>
              <CardHeader title="Watch a course"></CardHeader>
              <CardContent>
                Watch a course to learn more about HAJonSoft
              </CardContent>
              <CardActions>
                <a
                  href="https://hajonsoft.talentlms.com/shared/start/key:LZSIDNHR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start course
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
