import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
} from "@material-ui/core";
import Footer from "../Home/components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, useHistory } from "react-router";
import * as yup from "yup";
import firebase from "../../firebaseapp";
import logo from "../../images/logo.jpg";
import DoveHeader from "../Header/DoveHeader";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    // background: "linear-gradient(180deg, #007EB8 0%, #00547A 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(63 113 136 / 9%)",
  },
}));
const SignIn = ({ onLanguageChange, lang }) => {
  const mediaMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const [language, setLanguage] = useState(lang);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    onLanguageChange(e.target.value);
  };

  const [user] = useAuthState(firebase.auth());
  const [errorMessage, setErrorMessage] = useState("");

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Required"),
    password: yup
      .string()
      .required("Required")
      .matches(/[a-z]/, "At least one lower case character")
      // .matches(/[A-Z]/, "At least one upper case character")
      .matches(/[0-9]/, "At least one number"),
    // .matches(
    //   /[!@#$%^&*)()]/,
    //   "At least one keyboard special character ex. !@#$%^&*()"
    // ),
  });

  const handleLogin = (values, actions) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch(function(error) {
        setErrorMessage(error.message);
      });
    actions.setSubmitting(false);
  };

  const handleGoogleSignin = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  };
  // if (user?.idToken) {
  if (user) {
    return <Redirect to="/caravans" />;
  }
  return (
    <div style={{ background: "rgb(63 113 136 / 9%)" }}>
      <DoveHeader />
      <div className={classes.container}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}
          alignContent="center"
          component={Paper}
          elevation={2}
          style={{
            height: mediaMobile ? "100%" : "auto",
            width: "50%",
            margin: "auto",
            maxWidth: "500px",
          }}
        >
          <Grid item>
            <Box p={4} style={{ display: "flex", justifyContent: "center" }}>
              <img src={logo} alt="HajOnSoft"></img>
            </Box>

            <Typography
              style={{ color: "#14618e" }}
              variant="h6"
              gutterBottom
              align="center"
            >
              <Box p={2}>WELCOME</Box>
            </Typography>

            <Typography align="center">
              Login to continue to HAJonSoft
            </Typography>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{
                email: "",
                password: "",
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
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
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
                        // color="#14618e"
                        style={{
                          textTransform: "none",
                          color: "white",
                          background: "#14618e",
                          borderColor: "#14618e",
                        }}
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
              style={{
                textTransform: "none",
                color: "#14618e",
                borderColor: "#14618e",
              }}
              onClick={handleGoogleSignin}
              startIcon={<FontAwesomeIcon icon={faGoogle} />}
            >
              Continue with Google
            </Button>
          </Grid>

          <Grid item>
            <Box style={{ color: "#14618e" }} >
              <Link href="#" style={{ color: "#14618e" }} onClick={() => history.push("#")}>
                Need to Register?
              </Link>
            </Box>
          </Grid>

          <Grid item mb={4}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              variant="standard"
            >
              <MenuItem value="en">
                <Typography variant="body1">English</Typography>
              </MenuItem>
              <MenuItem value="ar">
                <Typography variant="body1">اللغه العربيه</Typography>
              </MenuItem>
              <MenuItem value="fr">
                <Typography variant="body1">Française</Typography>
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
