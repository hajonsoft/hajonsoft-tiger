import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router";

import logo from "../../images/logo-dark.png";
import trans from "../../shared/util/trans";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.grey[100],
    height: "100vh",
  },
  welcomeTo: {
    color: theme.palette.secondary,
  },
}));
const Home = ({ onLanguageChange, lang }) => {
  const history = useHistory();
  const classes = useStyles();

  const [language, setLanguage] = useState(lang);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    onLanguageChange(e.target.value);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-around"
          style={{ height: "100%" }}
        >
          <Grid item>
            <Typography
              align="center"
              variant="h3"
              className={classes.welcomeTo}
            >
              {trans("home.welcome-to")}
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" alignItems="center">
            <Typography variant="h1" align="center" color="textPrimary">
              {trans("home.haj")}
            </Typography>
            <Typography variant="h2" color="textSecondary">
              {trans("home.onsoft")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant="h3">
              <Box letterSpacing={4}>
                {trans("home.travel-management-software")}
              </Box>
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" alignItems="center">
            <Grid item container justifyContent="center">
              <Grid
                item
                xs={6}
                container
                direction="column"
                alignItems="center"
              >
                <Grid item style={{ margin: "20px 0px" }}>
                  <Typography color="textSecondary" variant="body1">
                    {trans("home.have-an-account")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    onClick={() => history.push("login")}
                  >
                    {trans("home.sign-in")}
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                container
                direction="column"
                alignItems="center"
              >
                <Grid item style={{ margin: "20px 0px" }}>
                  <Typography color="textSecondary" variant="body1">
                    {trans("home.need-an-account")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    disableElevation
                    onClick={() => history.push("register")}
                  >
                    {trans("home.register")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Grid item style={{ margin: "50px 0px" }}>
              <img src={logo} alt="HajOnSoft"></img>
            </Grid>
            <Grid item>
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
            <Grid item>{/* <AppFooter /> */}</Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Home;
