import {
  Box,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import EventIcon from "@material-ui/icons/Event";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { useParams } from "react-router-dom";
import ScheduleIcon from "@material-ui/icons/Schedule";
import firebase from "../../../firebaseapp";
import { packageImage } from "../../../shared/util/packageImage";
import DoveHeader from "../../Header/DoveHeader";
import Footer from "../../Home/components/Footer";
import StarIcon from "@material-ui/icons/Star";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import t from '../../../shared/util/trans';

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    width: "100%",
    backgroundColor: "rgb(76, 175, 80)",
    color: "white",
    fontSize: "14px",
    lineHeight: 2,
    fontWeight: "bold",
    padding: ".5rem",
  },
  sectionText: {
    fontSize: "14px",
    fontWeight: 400,
  },
  sectionDateText: {
    color: "rgb(76, 175, 80)",
    fontWeight: "bold",
  },
  sectionWarningText: {
    color: "#c00000",
    fontWeight: "bold",
  },
}));

const AdvertisementDetail = ({ onLanguageChange, lang }) => {
  const classes = useStyles();
  const { packageName } = useParams();
  const [detail, setDetail] = useState({});
  const history = useHistory();

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
    <div style={{ background: "rgb(63 113 136 / 9%)", minHeight: "100vh" }}>
      <DoveHeader />
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        style={{
          margin: "0px 2.5rem",
          paddingTop: "1rem",
          maxWidth: "1400px",
        }}
      >
        <Grid item md={8}>
          <Box>
            <Typography className={classes.sectionHeader}>
              {" "}
              {t('travel-dates')}{" "}
            </Typography>
            <List component="ul">
              <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText className={classes.sectionText}>
                  Tentative Checkout Date is{" "}
                  <span className={classes.sectionDateText}>
                    {" "}
                    {moment(detail.checkoutDate).format("dddd DD-MMM-YYYY")}(
                    {moment(detail.checkoutDate).fromNow()}){" "}
                  </span>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText className={classes.sectionText}>
                  Tentative Departute Date is{" "}
                  <span className={classes.sectionDateText}>
                    {" "}
                    {moment(detail.departureDate).format("dddd DD-MMM-YYYY")}(
                    {moment(detail.departureDate).fromNow()}){" "}
                  </span>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText className={classes.sectionText}>
                  {t('tentative-return-date-is')}{" "}
                  <span className={classes.sectionDateText}>
                    {" "}
                    {moment(detail.returnDate).format("dddd DD-MMM-YYYY")}(
                    {moment(detail.returnDate).fromNow()}){" "}
                  </span>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className={classes.sectionText}>
                  <span className={classes.sectionWarningText}> NOTE: </span>{" "}
                  {t('traveling-dates-are-subject-to-change-due-to-airline-scheduling-hijri-calendar-and-any-updates-from-the-ministry-of-hajj')}
                </ListItemText>
              </ListItem>
            </List>
          </Box>
          <Box>
            <Typography className={classes.sectionHeader}>
              {" "}
              {t('package-accommodation')}{" "}
            </Typography>
            <Grid container spacing={3} style={{ padding: "1rem 0px" }}>
              <Grid item md={3}>
                <Typography className={classes.sectionDateText}>
                  {detail.arrivalAirport?.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.sectionText}>
                  {detail.arrivalHotel}
                </Typography>
              </Grid>
              <Grid item md={3}>
                {detail?.arrivalHotel?.match(/\d+/)[0] &&
                  new Array(Number(detail?.arrivalHotel?.match(/\d+/)[0]))
                    .fill("hajonsoft")
                    ?.map((val) => <StarIcon style={{ fill: "#f7c76f" }} />)}
              </Grid>
              <Grid item md={3}>
                <Typography className={classes.sectionDateText}>
                  {detail.returnAirport?.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.sectionText}>
                  {detail.departureHotel}
                </Typography>
              </Grid>
              <Grid item md={3}>
                {detail?.departureHotel?.match(/\d+/)[0] &&
                  new Array(Number(detail?.departureHotel?.match(/\d+/)[0]))
                    .fill("hajonsoft")
                    ?.map((val) => <StarIcon style={{ fill: "#f7c76f" }} />)}
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography className={classes.sectionHeader}>
              {" "}
              {t('flight-details')}{" "}
            </Typography>
            <Grid container spacing={3} style={{ padding: "1rem 0px" }}>
              <Grid item md={3}>
                <Typography className={classes.sectionDateText}>
                  DEPARTURE FLIGHT:
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.sectionText}>
                  {detail.departureFlight}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <FlightTakeoffIcon />
              </Grid>
              <Grid item md={3}>
                <Typography className={classes.sectionDateText}>
                  {t('return-flight')}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.sectionText}>
                  {detail.returnFlight}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <FlightTakeoffIcon />
              </Grid>
            </Grid>
          </Box>

          <Box
            style={{
              padding: "1rem 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ color: "#4caf50", textTransform: "none", marginRight: ".5rem", borderColor: "#4caf50"   }}
              
              onClick={() => history.push("/reserve/" + detail.name)}
            >
              {t('book-now')}
            </Button>

            <Button
              title={`Enquire ${detail.name} package`}
              onClick={() => history.push("/reserve/Enquire-" + detail.name)}
              size="lg"
              style={{ background: "#4caf50", color: "white", marginLeft: ".5rem" }}
              
              variant="contained"
            >
              {t('enquire')}
            </Button>
          </Box>
        </Grid>

        <Grid item md={4}>
          <img
            src={packageImage(detail.gender, 0)}
            alt={detail.gender}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Grid>
      </Grid>
      <Footer  onLanguageChange={(l) => onLanguageChange(l)} lang={lang}/>
    </div>
  );
};

export default AdvertisementDetail;
