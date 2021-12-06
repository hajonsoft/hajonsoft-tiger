import { Box, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import firebase from "../../../firebaseapp";
import DoveHeader from "../../Header/DoveHeader";
import AdvertisementCard from "./AdvertisementCard";

const ToursAdvertisements = () => {
  const [onlinePackages, setOnlinePackages] = useState([]);
  useEffect(() => {
    firebase
      .database()
      .ref("protected/onlinePackage")
      .once("value", (snapshot) => {
        setOnlinePackages(
          Object.values(snapshot.toJSON()).filter((x) => x.gender === "Tour")
        );
      });
  }, []);

  const isCurrent = (p) => {
    return (
      moment(p.departureDate).isAfter(moment()) &&
      moment(p.returnDate).isAfter(moment())
    );
  };

  return (
    <div>
      <DoveHeader />
      <Box m={2}>
        <Typography variant="h6" align="center">
          Tours
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="space-around" alignItems="center">
        {onlinePackages &&
          onlinePackages.map(
            (p, i) =>
              isCurrent(p) && (
                <Grid item xs={12} lg={4} sm={12} md={6}>
                    <AdvertisementCard detail={p} key={p.name} index={i} />
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};

export default ToursAdvertisements;
