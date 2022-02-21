import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import hummingBird from "../../images/humming-bird.svg";
import logo from "../../images/icon_logo_png.png";
import t from "../../shared/util/trans";
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
    analytics.logEvent("nest_login", { user: authData?.name });
    return <Redirect to="/caravans" />;
  }
  return (
    <Grid
      container
      direction="column"
      spacing={1}
    >
      <Grid item>
        <DoveHeader />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        spacing={2}
        component={Card}
        elevation={2}
        style={{
          width: "30%",
          margin: "auto",
          marginBottom: "5rem",
          borderRadius: '16px'
        }}
      >
        <Grid item>
          <Box p={4} style={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="HajOnSoft" width={64}></img>
          </Box>
          <Typography
            color="textPrimary"
            variant="h6"
            gutterBottom
            align="center"
          >
            <Box p={2}>{t("welcome-to")}</Box>
          </Typography>

          <Typography align="center" variant="h6" color="textSecondary">
            {t("humming-bird")}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            style={{
              textTransform: "none",
            }}
            color="primary"
            onClick={handleGoogleSignin}
            startIcon={<FontAwesomeIcon icon={faGoogle} />}
          >
            {t("login-with-google")}
          </Button>
        </Grid>
        <Grid item>
          <img src={hummingBird} alt="Humming bird" width="80px" />
        </Grid>
        <Grid item>{`Language: ${lang}`}</Grid>
      </Grid>
      <Footer onLanguageChange={(l) => onLanguageChange(l)} lang={lang} />
    </Grid>
  );
};

export default SignIn;
