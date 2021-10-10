import { Box, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import firebase from "../../../firebaseapp";
import DoveHeader from "../../Header/DoveHeader";
import AdvertisementCard from "./AdvertisementCard";
import t from '../../../shared/util/trans';

const HajjAdvertisements = () => {
  const [onlinePackages, setOnlinePackages] = useState([]);
  useEffect(() => {
    firebase
      .database()
      .ref("protected/onlinePackage")
      .once("value", (snapshot) => {
        setOnlinePackages(
          Object.values(snapshot.toJSON()).filter((x) => x.gender === "Hajj")
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
          {t('hajj-packages')}
        </Typography>
      </Box>
      <Grid container spacing={3} justify="space-around" alignItems="center">
        {onlinePackages &&
          onlinePackages.map(
            (p, i) =>
              isCurrent(p) && (
                <Grid item xs={12} lg={4} sm={12} md={6}>
                  <Animated animationIn="bounceInLeft" isVisible={true}>
                    <AdvertisementCard detail={p} key={p.name} index={i} />
                  </Animated>
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};

export default HajjAdvertisements;
