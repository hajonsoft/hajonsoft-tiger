import { Paper, Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Typography } from "@material-ui/core";
import logo from "../../images/logo.jpg";

const useStyles = makeStyles({
  container: {
    maxWidth: 450,
    margin: "0 auto",
    width: "65%",
    height: "auto",
    background: "white",
    boxShadow: "2px 0px 21px -8px rgba(120,89,120,1)"
  },
  containerHeader: {
    fontSize: 26,
    color: "#4caf50",
    fontWeight: "bold",
    padding: "1rem"
  },
  subHeaderText: {
    color: "#88af4c",
  },
  text: {
    fontSize: "18px",
    margin: ".5rem auto",
    padding: "1rem",
    fontWeight: 300
  },
  topBottom: {
    padding: ".25rem",
    background: "#4caf50"
  }
});

const SignOut = () => {
  const classes = useStyles();
  const history = useHistory();

  setTimeout(() => {
    history.push("/login");
  }, 3000);

  return (
    <div style={{ height: "60vh", padding: "3rem" }}>
      <Paper
        elevation={4}
        style={{
          height: "100%",
          padding: "3rem",
          maxWidth: "650px",
          margin: "auto",
        }}
      >
        <Box p={4} style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="HajOnSoft"></img>
        </Box>
        <Box className={classes.container}>
        <Box className={classes.topBottom} />
          <Typography className={classes.containerHeader}>
            {" "}
            We will be here{" "}
            <span className={classes.subHeaderText}>
              {" "}
              when you come back{" "}
            </span>{" "}
          </Typography>
          <Box>
            <Typography className={classes.text}>
              {" "}
              You've successfully signed out of your account, you can login back anytime.
            </Typography>
            <Typography className={classes.text}>
              When you are ready to login, just login back into your account
            </Typography>
            <Box className={classes.topBottom} />
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default SignOut;
