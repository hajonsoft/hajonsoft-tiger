import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import React from "react";

const Register = () => {
  return (
    <div style={{ padding: "10rem" }}>
      <Card raised style={{ height: "40vh" }}>
        <CardContent>
          <Grid
            container
            alignItems="center"
            alignContent="center"
            spacing={5}
            style={{ height: "100%" }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <WhatsAppIcon color="inherit" fontSize="large" />
            </Grid>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h5" align="center">
                +1(949) 522-1879
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary" align="center">
                Please contact us on whatsapp to signup.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary" align="center">
                Data migration from hajonsoft.com to a new fast, private, and
                free server is available!
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
