import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebaseapp";


const useStyles = makeStyles((theme) => ({
  textHead: {
    fontWeight: 500,
    fontSize: "1.2rem",
    marginBottom: ".5rem",
    textAlign: "left",
  },
  textBody: {
    textAlign: "left",
  },
}));

const Footer = () => {
  const [record, setRecord] = useState({});
  const classes = useStyles();
  const history = useHistory();

  console.log(record);
  useEffect(() => {
    firebase
      .database()
      .ref(`protected/profile`)
      .once("value", (snapshot) => {
        if (snapshot.toJSON()) {
          setRecord(snapshot.toJSON());
        }
      });
  }, []);

  return (
    <Box
      style={{
        background: "rgba(63, 113, 136, 0.2)",
        color: "#718196",
        fontSize: "18px",
      }}
    >
      <Grid
        container
        spacing={3}
        direction="row"
        justify="space-around"
        alignItems="flex-start"
        style={{
          padding: "2rem",
          paddingLeft: "8rem"
          // width: "80%",
          // margin: "0 auto"
        }}
      >
        <Grid item md={3} style={{ padding: "0px 1rem", }} >
          <Typography className={classes.textHead} >Company</Typography>
          <Typography className={classes.textBody}>About Us</Typography>
          <Typography className={classes.textBody}>Contact Us</Typography>
          <Button href="#" onClick={() => history.push("/login")} color="primary" style={{ marginLeft: 0, paddingLeft: 0, textTransform: 'none' }}>Admin Login</Button>
        </Grid>
        <Grid item md={3} style={{ padding: "0px 1rem", }}>
          <Typography className={classes.textHead}>Support</Typography>
          <Typography className={classes.textBody}>Support Center</Typography>
          <Typography className={classes.textBody}>Help Center</Typography>
          <Typography className={classes.textBody}>Safety Center</Typography>
        </Grid>
        <Grid item md={3} style={{ padding: "0px 1rem", }}>
          <Typography className={classes.textHead}>Legal</Typography>
          <Typography className={classes.textBody}>Privacy Policy</Typography>
          <Typography className={classes.textBody}>Terms of Service</Typography>
          <Button href="#" onClick={() => history.push("/reserve/interest")} color="primary" style={{ marginLeft: 0, paddingLeft: 0, textTransform: 'none' }}>Join the waitlist</Button>
        </Grid>
        <Grid item md={3} style={{ padding: "0px 1rem", }}>
          <Typography className={classes.textHead}>Social Media</Typography>
          <Typography className={classes.textBody}>Instagram</Typography>
          <Typography className={classes.textBody}>Facebook</Typography>
          <Typography className={classes.textBody}>Twitter</Typography>
        </Grid>
      </Grid>
      {/* {record.about} */}

      <Box
        style={{
          padding: "1rem",
          borderTop: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} Copyright: {window.location.origin}
      </Box>
    </Box>
  );
};

export default Footer;
