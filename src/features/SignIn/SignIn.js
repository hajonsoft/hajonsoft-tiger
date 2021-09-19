import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button, Grid, MenuItem, Paper, Select, Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import logo from "../../images/logo.jpg";
import DoveHeader from "../Header/DoveHeader";
import Footer from "../Home/components/Footer";
import { loginWithGoogle } from "./redux/authSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: '2rem',
    background: "rgb(63 113 136 / 9%)",
  },
}));

const SignIn = ({ onLanguageChange, lang }) => {
  const mediaMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const classes = useStyles();
  const [language, setLanguage] = useState(lang);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    onLanguageChange(e.target.value);
  };

  const auth = useSelector(state => state?.auth?.data);

  const handleGoogleSignin = () => {
    dispatch(loginWithGoogle())
  };
  if (auth?.user?.uid) {
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
