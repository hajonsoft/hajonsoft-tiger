import { Grid } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import firebase from "../../../firebaseapp";
import AdvertisementCard from "./AdvertisementCard";

const Advertisements = () => {
  const [advertisements, setOnlinePackages] = useState([]);
  
  useEffect(() => {
    firebase
      .database()
      .ref("/protected/onlinePackage")
      .once("value", (snapshot) => {
        if (snapshot.toJSON()) {
          setOnlinePackages(Object.values(snapshot.toJSON()));
        }
      });
  }, []);

  const isCurrent = (p) => {
    return (
      moment(p.departureDate).isAfter(moment()) &&
      moment(p.returnDate).isAfter(moment())
    );
  };

  return (
    <Grid
      container
      spacing={3}
      justify="space-around"
      alignItems="center"
      style={{ padding: "2rem" }}
    >
      {advertisements &&
        advertisements.map(
          (advertisement, index) =>
            isCurrent(advertisement) && (
              <Grid item xs={12} lg={4} sm={12} md={6} key={advertisement.name}>
                <Animated animationIn="bounceInLeft" isVisible={true}>
                  <AdvertisementCard
                    detail={advertisement}
                    key={advertisement.name}
                    index={index}
                  />
                </Animated>
              </Grid>
            )
        )}
    </Grid>
  );
};

export default Advertisements;
