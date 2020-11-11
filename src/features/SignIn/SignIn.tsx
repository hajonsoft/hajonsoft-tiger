import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Popover,
  TextField,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, useHistory } from "react-router";
import * as yup from "yup";
import firebase from "../../firebaseapp";
import firebase_img from "../../images/firebase_28dp.png";
import logo from "../../images/logo.jpg";

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
const localFirebaseConfig = ()=> {
  const config = localStorage.getItem('firebaseConfig');
  if (config) {
    return JSON.parse(config)
  } else {
    return {apiKey: '', projectId: ''}
  }
} 
const SignIn = () => {
  const mediaMobile = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);



  const [firebaseConfig, setFirebaseConfig] = useState(localFirebaseConfig);

  const [user] = useAuthState(firebase.auth());
  const [errorMessage, setErrorMessage] = useState('')

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
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
        setErrorMessage(error.message);

      });
    actions.setSubmitting(false);

  };

  const handleFirebaseClick = (event) => {
    setAnchorEl(event.currentTarget);
    setdrawerOpen(true);
  };

  const handleFirebaseClose = () => {
    setAnchorEl(null);
    localStorage.setItem("firebaseConfig", JSON.stringify({apiKey: firebaseConfig.apiKey, projectId: firebaseConfig.projectId}));
    setdrawerOpen(false);
  };

  const handleGoogleSignin = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  };
  // if (user?.idToken) {
  if (user) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={classes.container}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={2}
        alignContent="center"
        component={Paper}
        elevation={4}
        style={{ height: mediaMobile ? "100%" : "auto" }}
        md={3}
        xs={12}
      >
        <Grid item style={{ width: "100%" }}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton onClick={(e) => handleFirebaseClick(e)}>
                Connect your database
                <img src={firebase_img} alt="firebase" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box p={4} style={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="HajOnSoft"></img>
          </Box>

          <Typography color="primary" variant="h6" gutterBottom align="center">
            <Box p={2}>WELCOME</Box>
          </Typography>

          <Typography align="center">Login to continue to HAJonSoft</Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              email: "alialiayman@gmail.com",
              password: "(Paris123)",
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit, isSubmitting }) => (
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
                    {errorMessage && (
                      <Grid item>
                        <Alert severity="error">{`${errorMessage}`}</Alert>
                      </Grid>
                    )}
                  </Grid>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={
                        isSubmitting && (
                          <CircularProgress size={20} color="inherit" />
                        )
                      }
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
        <Grid item container justify="center" alignItems="center" spacing={2}>
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item>OR</Grid>
          <Grid item xs>
            <Divider></Divider>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleGoogleSignin}
            style={{ textTransform: "none" }}
            startIcon={<FontAwesomeIcon icon={faGoogle} />}
          >
            Continue with Google
          </Button>
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

      <Popover
        open={drawerOpen}
        onClose={handleFirebaseClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Card>
          <CardHeader
            title="Connect your firebase"
            subheader="Enter information from your firebase account"
          ></CardHeader>
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                container
                justify="space-between"
                spacing={2}
                alignItems="center"
              >
                <Grid item xs={12}>
                  <TextField
                    name="projectId"
                    label="Project Id"
                    fullWidth
                    value={firebaseConfig.projectId}
                    onChange={(e) =>
                      setFirebaseConfig((sett) => ({
                        ...sett,
                        projectId: e.currentTarget.value,
                      }))
                    }
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="apiKey"
                    label="WebApi Key"
                    variant="outlined"
                    fullWidth
                    value={firebaseConfig.apiKey}
                    onChange={(e) =>
                      setFirebaseConfig((sett) => ({
                        ...sett,
                        apiKey: e.currentTarget.value,
                      }))
                    }
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={handleFirebaseClose}
              >
                Done
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
};

export default SignIn;
