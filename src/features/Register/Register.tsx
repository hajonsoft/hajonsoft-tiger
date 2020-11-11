import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import HajonsoftHeader from "../Header/HajonsoftHeader";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    margin: "0 auto",
    paddingTop: "1rem",
    background: "linear-gradient(#DEE7EB, white)",
  },
}));

const Register = () => {
  // const mobileMedia = useMediaQuery((theme: any) =>
  //   theme.breakpoints.down("sm")
  // );

  const [activeStep] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <HajonsoftHeader />
      <div className={classes.container}>
        <Box pl={6}>
          <Grid container spacing={8} md={10} xs={12}>
            <Grid item xs>
              <RegistrationSteps activeStep={activeStep} />

              <Grid container justify="center" alignItems="center">
                {activeStep === 0 && (
                  <div
                    style={{
                      width: "90%",
                      margin: "0 auto",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Typography gutterBottom variant="h6">
                      <Box mb={2}>Firebase Signup</Box>
                    </Typography>
                  </div>
                )}

                {activeStep === 1 && (
                  <div
                    style={{
                      width: "90%",
                      margin: "0 auto",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Typography gutterBottom variant="h6">
                      <Box mb={2}>Migrate data</Box>
                    </Typography>
                  </div>
                )}

                {activeStep === 2 && (
                  <Grid container spacing={4} direction="column">
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        Registration Complete
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "8px" }}
                        onClick={() => history.push("/login")}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </React.Fragment>
  );
};

const RegistrationSteps = (props: any) => {
  // const mobileMedia = useMediaQuery((theme: any) =>
  //   theme.breakpoints.down("sm")
  // );
  const steps = ["Firebase Signup", "Migrate data", "Registration complete"];

  return (
    <Stepper
      activeStep={props.activeStep}
      style={{ backgroundColor: "transparent" }}
    >
      {steps.map((step: string, index: number) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
export default Register;
