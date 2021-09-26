import { Box, Button, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ExploreIcon from "@material-ui/icons/Explore";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../firebaseapp";
import trans from "../../shared/util/trans";
import BasicReservation from "./components/BasicReservation";
import FullReservation from "./components/FullReservation";
import reservationCompleteImage from '../../images/reservation-complete.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid white`,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid whiite",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "50%"
  },
  paymentBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 0px"
  },
  paymentBtn: {
    background: "#178CF9",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    paddingTop: ".65rem",
    paddingBottom: ".65rem",
    textTransform: "capitalize",
    color: "white",
  },
  viewReservationBtn: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    marginRight: "1rem",
    paddingTop: ".65rem",
    paddingBottom: ".65rem",
    textTransform: "capitalize",
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Reservation = ({ lang, onLanguageChange }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  const [advertisementData, setAdvertisementData] = React.useState({});

  useEffect(() => {
    async function getPackageSnapshot() {
      if (params.packageName) {
        const allAdvertisementsSnapshot = await firebase.database().ref(`protected/onlinePackage`).once('value');
        const allAdvertisments = allAdvertisementsSnapshot.val();
        const allAdvertismentsKeys = Object.keys(allAdvertisments);
        for (const advertisementKey of allAdvertismentsKeys) {
          if (allAdvertisments[advertisementKey].name === params.packageName) {
            setAdvertisementData(allAdvertisments[advertisementKey])
            return;
          }
        }
      }
    };
    getPackageSnapshot();
  }, [params.packageName]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container style={{ backgroundColor: "#ccc", minHeight: "100vh" }}>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            variant="fullWidth"
            textColor="primary"
          >
            <Tab
              style={{ width: "100%" }}
              label={
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  justify="center"
                >
                  <Grid item>
                    <ExploreIcon fontSize="small" />
                  </Grid>
                  <Grid item>{trans("reservation.quick-reservation")}</Grid>
                </Grid>
              }
              {...a11yProps(0)}
            />
            <Tab
              style={{ width: "100%" }}
              label={
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  justify="center"
                >
                  <Grid item>
                    <FlightTakeoffIcon fontSize="small" />
                  </Grid>
                  <Grid item>{trans("reservation.full-reservation")}</Grid>
                </Grid>
              }
              {...a11yProps(1)}
            />
          </Tabs>
          <Box p={4} style={{ display: "flex", justifyContent: "center" }}>
            <Select
              value={lang}
              onChange={(e) => onLanguageChange(e.target.value)}
              variant="standard"
            >
              <MenuItem value="en">
                <Typography variant="body1">English</Typography>
              </MenuItem>
              <MenuItem value="fr">
                <Typography variant="body1">Française</Typography>
              </MenuItem>
              <MenuItem value="ar">
                <Typography variant="body1">اللغه العربيه</Typography>
              </MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={9}>
          {value === 0 ? <BasicReservation openSuccessModal={handleOpen} isModalOpen={open} /> : <FullReservation openSuccessModal={handleOpen} isModalOpen={open} />}
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 style={{ textAlign: "center" }} >A Reservation has been booked for you</h2>
            <div style={{ width: "25%", height: 150, margin: "1rem auto" }}>
              <img src={reservationCompleteImage} alt="success-icon" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className={classes.paymentBtnContainer}>
              <Button color="default" variant="contained" className={classes.viewReservationBtn} onClick={handleClose} >{t('view-reservation-number')}</Button>
              {advertisementData.paymentLink && <Button color="primary" variant="contained" className={classes.paymentBtn} href={advertisementData.paymentLink} >{t('continue-to-payment')}</Button>}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Reservation;
