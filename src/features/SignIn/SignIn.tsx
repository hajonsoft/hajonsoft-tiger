import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";
import logo from "../../images/logo.jpg";
import useUserState from "./redux/useUserState";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    background: "linear-gradient(180deg, #007EB8 0%, #00547A 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const SignIn = () => {
  const mediaMobile = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  // TODO: test error and returned data 
  const { fetchUser, error , user} = useUserState("firebase");

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Required"),
    password: yup
      .string()
      .required("Required")
      .matches(/[a-z]/, "At least one lower case character")
      .matches(/[A-Z]/, "At least one upper case character")
      .matches(/[0-9]/, "At least one number")
      .matches(
        /[!@#$%^&*)()]/,
        "At least one keyboard special character ex. !@#$%^&*()"
      ),
  });

  const handleLogin = (values: any, actions: any) => {
    fetchUser(values);
    actions.setSubmitting(false);
  };
  
  if (user) {
    history.push('/home')
  }
  return (
    <div className={classes.container}>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="center"
        spacing={4}
        alignContent="center"
        component={Paper}
        elevation={4}
        style={{ height: mediaMobile ? "100%" : "auto" }}
        md={3}
        xs={12}
      >
        <Grid item>
          <Box p={4} style={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="HajOnSoft logo"></img>
          </Box>

          <Typography color="primary" variant="h6" gutterBottom align="center">
            <Box p={2}>WELCOME</Box>
          </Typography>

          <Typography align="center">Login to continue to HajOnSoft</Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={user}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit }) => (
              <Form>
                <Box p={2}>
                  <Grid container direction="column" spacing={2}>
                    <Grid
                      item
                      container
                      justify="space-between"
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item xs={12}>
                        <Field
                          name="email"
                          label="Username or email address"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                        ></Field>

                        <Box style={{ color: "#C13636" }}>
                          <ErrorMessage name="email" />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="password"
                          label="Password"
                          as={TextField}
                          fullWidth
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Box style={{ color: "#C13636" }} mb={1}>
                          <ErrorMessage name="password" />
                        </Box>
                      </Grid>
                      <Grid item>
                        <Link onClick={() => history.push("forgot-password")}>
                          <Typography variant="subtitle1" color="textSecondary">
                            <Box mt={-2}>Forgot password?</Box>
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                    {error && (
                      <Grid item>
                        <Alert severity="error">{`${error}`}</Alert>
                      </Grid>
                    )}
                  </Grid>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Continue
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography align="center">
            <Box mb={4}>
              <Link href="#" onClick={() => history.push("register")}>
                Need to Register?
              </Link>
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
