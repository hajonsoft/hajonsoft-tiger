import { Box, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../../firebaseapp";
import { packageImage } from "../../../util/packageImage";
import DoveHeader from "../../Header/DoveHeader";
import PackageFeatures from "./PackageFeatures";

const AdvertisementDetail = () => {
  const { packageName } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("protected/onlinePackage")
      .once("value", (snapshot) => {
        setDetail(
          Object.values(snapshot.toJSON()).find((x) => x.name === packageName)
        );
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DoveHeader />
      <Box mx={2} mt={2}>
        <Grid container spacing={2} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} lg={4} sm={12} md={4}>
            <img
              src={packageImage(detail.gender, 0)}
              alt={detail.gender}
              style={{
                width: "100%",
                height: "auto",
                border: "5px solid #ffffff",
              }}
            />
            <Box ml={2}>
              {detail.quadPrice && (
                <Typography variant="h5">{`4 person/room: ${detail.quadPrice}`}</Typography>
              )}
              {detail.triplePrice && (
                <Typography variant="h5">{`3 person/room: ${detail.triplePrice}`}</Typography>
              )}
              {detail.doublePrice && (
                <Typography variant="h5">{`2 person/room: ${detail.doublePrice}`}</Typography>
              )}
              {detail.fees && (
                <Typography variant="caption">{`All prices exclude ${detail.fees} government fees`}</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} lg={8} sm={12} md={8}>
            <PackageFeatures detail={detail} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdvertisementDetail;
