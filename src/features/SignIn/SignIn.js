import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button, Grid, MenuItem, Paper, Select, Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router";
import firebase from "../../firebaseapp";
import logo from "../../images/logo.jpg";
import DoveHeader from "../Header/DoveHeader";
import Footer from "../Home/components/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: '2rem',
    background: "rgb(63 113 136 / 9%)",
  },
}));
const SignIn = ({ onLanguageChange, lang }) => {
  const mediaMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();
  const [language, setLanguage] = useState(lang);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    onLanguageChange(e.target.value);
  };

  const [user] = useAuthState(firebase.auth()); //TODO:RTK 2 not needed

  const handleGoogleSignin = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  }; // TODO:RTK 1 use think in slice and get a hook? probably a hook ican't be realized since this is a code with the toolkit directly and not a restful call
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
              style={{ color: "#4caf50" }}
              variant="h6"
              gutterBottom
              align="center"
            >
              <Box p={2}>WELCOME TO</Box>
            </Typography>

            <Typography align="center">
              Humming Bird
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              style={{
                textTransform: "none",
                color: "#4caf50",
                borderColor: "#4caf50",
              }}
              onClick={handleGoogleSignin}
              startIcon={<FontAwesomeIcon icon={faGoogle} />}
            >
              Login with Google
            </Button>
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
