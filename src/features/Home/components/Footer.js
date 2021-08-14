import { Grid, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "../../../firebaseapp";

const Footer = () => {
  const [record,setRecord] = useState({});

  useEffect(() => {
    firebase.database().ref(`protected/profile`).once('value', snapshot=> {
      if (snapshot.toJSON()) {
        setRecord(snapshot.toJSON())
      }
    })
  }, [])

  console.log(record, "hello record")

  if(!record || !record.about ) return null;

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="space-around"
      alignItems="center"
      style={{
        marginTop: "2rem",
        padding: "2rem 3rem",
        background: "#4CAF4F",
        color: "white",
        fontSize: "18px",
        textAlign: "center",
      }}
    >
      <Box style={{width: "50%", lineHeight: 1.5, paddingBottom: "1rem"}}>
        { record.about}
      </Box>
      <Box
        style={{
          padding: "1rem 0px",
        }}
      >
        &copy; {new Date().getFullYear()} Copyright: {window.location.origin}
      </Box>
    </Grid>
  );
};

export default Footer;
