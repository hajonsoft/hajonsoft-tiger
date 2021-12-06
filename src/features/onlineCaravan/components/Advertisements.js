import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import interested from "../../../images/interested.svg";
import t from '../../../shared/util/trans';
import { getOnlineCaravans } from "../redux/onlineCaravanSlice";
import AdvertisementCard from "./AdvertisementCard";

const Advertisements = () => {
  const dispatch = useDispatch();

  const advertisements = useSelector(state => state.online?.data);
  const loading = useSelector(state => state.online?.loading);

  useEffect(() => {
    dispatch(getOnlineCaravans());
  }, [dispatch])


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
      justifyContent="space-around"
      alignItems="center"
      style={{ padding: "2rem", minHeight: '80vh' }}
    >
      {loading && <Grid container spacing={4} justifyContent="center" alignItems="center">

        <Grid item>
          <CircularProgress size={64}/>
        </Grid>
        <Grid item>
          <Typography variant="h4" color="textPrimary">{t('loading')}</Typography>
        </Grid>

      </Grid>}
      {!loading && advertisements && advertisements.length &&
        advertisements.map(
          (advertisement, index) =>
            isCurrent(advertisement) && (
              <Grid item xs={12} lg={4} sm={12} md={6} key={advertisement.name}>
                  <AdvertisementCard
                    detail={advertisement}
                    key={advertisement.name}
                    index={index}
                  />
              </Grid>
            )
        )}

      {advertisements?.length === 0 && (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <img src={interested} alt="interested" width="60%" height="60%" />
        </Box>
      )}
    </Grid>
  );
};

export default Advertisements;
