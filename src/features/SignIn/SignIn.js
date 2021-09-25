import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import logo from "../../images/logo.jpg";
import t from '../../shared/util/trans';
import DoveHeader from "../Header/DoveHeader";
import Footer from "../Home/components/Footer";
import { loginWithGoogle } from "./redux/authSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "60vh",
    paddingTop: "2rem",
    background: "rgb(63 113 136 / 9%)",
  },
}));

const SignIn = ({ onLanguageChange, lang }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const authData = useSelector((state) => state?.auth?.data);

  const handleGoogleSignin = () => {
    dispatch(loginWithGoogle());
  };
  if (authData?.name) {
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
            width: "50%",
            margin: "auto",
            maxWidth: "500px",
            height: "25rem",
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

            <Typography align="center" variant="h6">{t("humming-bird")}</Typography>
          </Grid>
          <Grid item>
            <img src={hummingBird} alt="Humming bird" width="64px"/>
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
      </div>
      <Footer onLanguageChange={(l) => onLanguageChange(l)} lang={lang} />
    </div>
  );
};

export default SignIn;
