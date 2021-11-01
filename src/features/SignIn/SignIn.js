import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import hummingBird from '../../images/humming-bird.svg';
import logo from "../../images/logo.jpg";
import t from '../../shared/util/trans';
import { analytics } from "../analytics/firebaseAnalytics";
import DoveHeader from "../Header/DoveHeader";
import Footer from "../Home/components/Footer";
import { loginWithGoogle } from "./redux/authSlice";

const SignIn = ({ onLanguageChange, lang }) => {
  const dispatch = useDispatch();

  const authData = useSelector((state) => state?.auth?.data);

  const handleGoogleSignin = () => {
    dispatch(loginWithGoogle());
  };
  if (authData?.name) {
    analytics.logEvent('nest_login', {user: authData?.name});
    return <Redirect to="/caravans" />;
  }
  return (
    <div style={{ background: "rgb(63 113 136 / 9%)", minHeight: '100vh'}}>

    <Grid
      continer
      justify="space-between"
      style={{ background: "rgb(63 113 136 / 9%)", minHeight: "100vh" }}
    >
      <Grid item>
        <DoveHeader />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={2}
        alignContent="center"
        component={Paper}
        elevation={2}
        style={{
          width: "50%",
          margin: "auto",
          maxWidth: "500px",
          marginTop: '5rem',
          marginBottom: '5rem',
          minHeight: "60vh",
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
            <Box p={2}>{t("welcome-to")}</Box>
          </Typography>

          <Typography align="center" variant="h6">
            {t("humming-bird")}
          </Typography>
        </Grid>
        <Grid item>
          <img src={hummingBird} alt="Humming bird" width="64px" />
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
            {t("login-with-google")}
          </Button>
        </Grid>
      </Grid>
      <Footer onLanguageChange={(l) => onLanguageChange(l)} lang={lang} />
    </Grid>
    </div>
  
  );
};

export default SignIn;
