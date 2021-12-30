import {
  Box,
  Button, Checkbox,
  CircularProgress, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl, FormControlLabel, Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Backdrop from "@material-ui/core/Backdrop";
import DialogContentText from "@material-ui/core/DialogContentText";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { AlternateEmail, CloudDownloadOutlined } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import Person from "@material-ui/icons/Person";
import CheckCircle from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import emailjs from "emailjs-com";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebaseConfig from "../../../firebaseConfig";
import hawkImg from '../../../images/hawk.svg';
import reservationCompleteImage from "../../../images/reservation-complete.svg";
import t from '../../../shared/util/trans';
import { getPassengersJSON, getStorageUrl, zipWithPhotos } from "../helpers/common";
import { createVisaSystem, deleteVisaSystem, getVisaSystems } from "../redux/visaSystemSlice";

const Cryptr = require("cryptr");

const cryptr = new Cryptr(firebaseConfig.projectId);

const sanitizeCaravanName = (gn) => gn.replace(/[^A-Za-z0-9]/gi, "");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  mailBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 0px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "50%",
    margin: "auto",
    marginTop: "5rem",
  },
  mailBtn: {
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
  sendCard: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const serviceProviders = [
  { value: "bau", name: "UMRAH | Bab al umrah (Recommended)" },
  { value: "wtu", name: "UMRAH | Way to umrah (legacy)" },
  { value: "gma", name: "UMRAH | Gabul ya hajj (difficult)" },
  { value: "twf", name: "UMRAH | Tawaf (slow)" },
  { value: "enj", name: "ALL TYPES | Enjaz" },
  { value: "ehr", name: "HAJ | Ehaj (Reservation)" },
  { value: "ehj", name: "HAJ | Ehaj (Submit)" },
  { value: "vst", name: "VISIT | Visit Saudi " },
  { value: "mot", name: "LOCAL | Egypt Tourism" },
];

const ApplyForVisa = ({ open, onClose, passengers, caravan }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [expandedPanel, setExpandedPanel] = React.useState("");
  const [selectedPassengers, setSelectedPassengers] = React.useState(
    passengers
  );
  const [serviceProviderAddMode, setServiceProviderAddMode] = React.useState(
    false
  );
  const [selectedServiceProvider, setSelectedServiceProvider] = React.useState(
    ""
  );
  const [
    serviceProviderUsername,
    setServiceProviderProfileUsername,
  ] = React.useState("");
  const [
    serviceProviderPassword,
    setServiceProviderProfilePassword,
  ] = React.useState("");
  const [
    serviceProviderEmbassy,
    setServiceProviderProfileEmbassy,
  ] = React.useState("");

  const [downloadFileName, setDownloadFileName] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [selectedVisaSystem, setSelectedVisaSystem] = React.useState("");
  const [sendingMail, setSendingMail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState();

  async function sendEmail() {
    setSendingMail(true);
    const travellersData = getPassengersJSON(selectedPassengers);

    for (let index = 0; index < travellersData.length; index++) {

      const traveller = travellersData[index]

      // verify name 
      if (!traveller.name.full.trim()) {
        alert("Can't send visa by proxy. Some of your passengers does not seems to have a full name")
        return
      }

      // verify nationality 
      if (!traveller.nationality.name.trim()) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a nationality. Please fill the nationality field to contine`)
        return
      }

      // verify gender
      if (!traveller.gender.trim()) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a gender. Please fill the gender field to continue`)
        return
      }

      // verify passportNumber
      if (!traveller.passportNumber.trim()) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a passport number. Please fill the passport number field to continue`)
        return
      }

      // verify place of issue
      if (!traveller.placeOfIssue.trim()) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a place of issue. Please fill the place of issue field to continue`)
        return
      }

      // verify birth date
      if (!traveller.dob.dmy.trim()) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a date of birth. Please fill the date of birth field to continue`)
        return
      }

      // verify birth place
      if (!traveller.birthPlace.trim()) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a birth place. Please fill the birth place field to continue`)
        return
      }

      // verify photo 
      try {
        const photoUrl = await getStorageUrl(
          `${traveller.nationality.name}/${traveller.passportNumber}.jpg`
        );
        if (!photoUrl) {
          alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a photo. Please upload the passenger photo to continue`)
          return
        }
      } catch (err) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a photo. Please upload the passenger photo to continue`)
        return
      }

      // verify passport
      try {
        const passportUrl = await getStorageUrl(
          `${traveller.nationality.name}/${traveller.passportNumber}_passport.jpg`
        );
        if (!passportUrl) {
          alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a passport. Please upload the passenger passport to continue`)
          return
        }
      } catch (err) {
        alert(`Can't send visa by proxy. The passenger with the name ( ${traveller.name.full} ) does not seems to have a passport. Please upload the passenger passport to continue`)
        return
      }
    }

    const exportVisaSystem = visaSystems[selectedVisaSystem];
    const zipData = {
      system: {
        username: cryptr.encrypt(exportVisaSystem.username),
        password: cryptr.encrypt(exportVisaSystem.password),
        embassy: exportVisaSystem.embassy,
        name: exportVisaSystem.usap,
      },
      info: {
        pax: travellersData.length,
        caravan: sanitizeCaravanName(caravan),
        caravanUrl: `https://${firebaseConfig.projectId}.web.app/${caravan}/customers`,
        munazim: firebaseConfig.projectId,
      },
      travellers: travellersData,
    };
    const zip = await zipWithPhotos(zipData, null);

    const bundleFile = await zip.generateAsync({
      type: "base64",
      mimeType: "application/zip"
    });

    const data = {
      summary: `${firebaseConfig.projectId}: ${travellersData.length} PAX (${exportVisaSystem.usap})\n   node . file=bundle.zip`,
      description: `${JSON.stringify(travellersData.map(traveller => `${traveller.name?.full}-${traveller.nationality?.name}`), null, 2)}`,
      variable_7e6p61s: bundleFile,
      embassy: 'embassy: ' + exportVisaSystem.embassy,
    };

    emailjs
      .send(
        "service_kn4unr3",
        "template_38lq7dh",
        data,
        "user_ZvrCHg40AuHimkNbZAhtA"
      )
      .then(
        (result) => {
          setEmailSuccess(true);
        },
        (error) => {
          setEmailSuccess(false);
        }
      );

  }

  React.useEffect(() => {
    setSelectedPassengers(passengers);
    dispatch(getVisaSystems());
  }, [dispatch, passengers]);

  const visaSystems = useSelector(state => state.visaSystem?.data);

  const handleServiceProviderProfileChange = (systemIndex) => {
    if (visaSystems.length > systemIndex) {
      setSelectedVisaSystem(systemIndex);
    }
  };

  const handleServiceProviderChange = (usap) => {
    setSelectedServiceProvider(usap);
  };
  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : "");
  };

  const handleDoneAddServiceProviderProfile = () => {
    dispatch(createVisaSystem({
      usap: selectedServiceProvider,
      username: serviceProviderUsername,
      password: serviceProviderPassword,
      embassy: serviceProviderEmbassy,
    }))
    setServiceProviderAddMode(false);
  };
  const handleOnDeleteServiceProviderProfile = (visaSystemIndex) => {
    dispatch(deleteVisaSystem(visaSystems[visaSystemIndex]._fid))
  };

  const handleDownloadZipFileClick = async () => {
    setDownloading(true);
    setDownloadFileName("");
    const travellersData = getPassengersJSON(selectedPassengers);
    const exportVisaSystem = visaSystems[selectedVisaSystem];
    const data = {
      system: {
        username: exportVisaSystem?.username && cryptr.encrypt(exportVisaSystem?.username),
        password: exportVisaSystem?.password && cryptr.encrypt(exportVisaSystem?.password),
        name: exportVisaSystem?.usap,
      },
      info: {
        pax: travellersData.length,
        caravan: sanitizeCaravanName(caravan),
        caravanUrl: `https://${firebaseConfig.projectId}/${caravan}/customers`,
        munazim: firebaseConfig.projectId,
      },
      travellers: travellersData,
    };
    const zip = await zipWithPhotos(data, null);

    zip.generateAsync({ type: "blob" }).then(function (content) {
      const newFile = new Blob([content], { type: "application/zip" });
      var csvURL = window.URL.createObjectURL(newFile);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      const fileName = `${sanitizeCaravanName(caravan) +
        "_" +
        parseInt(moment().format("X")).toString(36)}.zip`;
      tempLink.setAttribute("download", fileName);
      setDownloadFileName(fileName);
      tempLink.click();
      // var elabsed = (
      //   moment.duration(moment().diff(startTime)).asSeconds() /
      //   selectedPassengers.length
      // ).toFixed(1);
      setDownloading(false);
    });
  };

  const getServiceProviderProfileName = (u) => {
    return serviceProviders.find(
      (serviceProvider) => serviceProvider.value === u
    )?.name;
  };

  const getSelectedServiceProviderProfile = () => {
    if (visaSystems && visaSystems?.length > 0) {
      const defaultSystem = visaSystems[selectedVisaSystem];
      return `${getServiceProviderProfileName(
        defaultSystem?.usap
      )} - Username: ${defaultSystem?.username}`;
    } else {
      return "No system selected";
    }
  };

  const handleSendDownloadedFile = () => {
    const tempLink = document.createElement("a");
    tempLink.href = new URL(
      "hawk://mode=send,fileName=" +
      downloadFileName +
      ",host=" +
      firebaseConfig.projectId
    );
    tempLink.click();
  };

  const handleOpenHawk = () => {
    const tempLink = document.createElement("a");
    tempLink.href = new URL(
      "hawk://mode=open,host=" + firebaseConfig.projectId
    );
    tempLink.click();
  };

  const handleCheckPassenger = (checkStatus, passenger) => {
    if (checkStatus) {
      setSelectedPassengers(
        (prevState) => (prevState = [...prevState, passenger])
      );
    } else {
      setSelectedPassengers((prevState) =>
        prevState.filter((t) => t._fid !== passenger._fid)
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        maxWidth="lg"
        keepMounted
      >
        <DialogTitle>{t('apply-for-visa')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('hajonsoft-uses-hawk-application-to-connect-to-travel-service-providers-if-you-are-new-or-using-macos-you-can-select-visa-by-proxy-use-eagle-or')}{" "}
            <a href="https://hajonsoft.talentlms.com/catalog/info/id:125">
              {t('take-a-course')}
            </a>
          </DialogContentText>

          <div className={classes.root}>
            <Accordion
              expanded={expandedPanel === "passengersPanel"}
              onChange={handlePanelChange("passengersPanel")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {t('step-1-choose-passengers')}
                </Typography>
                <Typography
                  className={classes.secondaryHeading}
                >{`${selectedPassengers?.length}/${passengers?.length} [${caravan}]`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container justifyContent="space-between">
                  <Grid item md={6}>
                    <Button onClick={() => setSelectedPassengers(passengers)}>
                      {t('select-all')}
                    </Button>
                  </Grid>
                  <Grid item md={6} container justifyContent="flex-end">
                    <Button onClick={() => setSelectedPassengers([])}>
                      {t('deselect-all')}
                    </Button>
                  </Grid>
                  {passengers && passengers.length > 0 &&
                    passengers?.map((passenger) => (
                      <Grid item key={passenger._fid}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                selectedPassengers?.filter(
                                  (t) => t._fid === passenger._fid
                                ).length > 0
                              }
                              onChange={(e) =>
                                handleCheckPassenger(
                                  e.target.checked,
                                  passenger
                                )
                              }
                            />
                          }
                          label={passenger.name}
                        />
                      </Grid>
                    ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expandedPanel === "serviceProviderPanel"}
              onChange={handlePanelChange("serviceProviderPanel")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {t('step-2-choose-service-provider-profile')}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {getSelectedServiceProviderProfile()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box style={{ width: "100%" }}>
                  {!serviceProviderAddMode && (
                    <Grid container alignItems="center">
                      <Grid item md={11}>
                        <FormControl fullWidth variant="filled">
                          <InputLabel>{t('service-provider-profile')}</InputLabel>
                          <Select
                            value={selectedVisaSystem}
                            onChange={(e) =>
                              handleServiceProviderProfileChange(e.target.value)
                            }
                          >
                            <MenuItem value={""} key="defaultvalue_serviceproviderprofile">
                              <Typography color="textSecondary">Please select service provider profile</Typography>
                            </MenuItem>
                            {visaSystems &&
                              visaSystems?.length > 0 &&
                              visaSystems.map((x, i) => (
                                <MenuItem value={i} key={x.username}>
                                  <Grid
                                    container
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <Grid item>
                                      {`${getServiceProviderProfileName(
                                        x.usap
                                      )} ${x.username}`}
                                    </Grid>
                                    {i !== selectedVisaSystem && (
                                      <Grid item>
                                        <IconButton
                                          onClick={() =>
                                            handleOnDeleteServiceProviderProfile(
                                              i
                                            )
                                          }
                                        >
                                          <DeleteIcon
                                            fontSize="small"
                                            color="error"
                                          />
                                        </IconButton>
                                      </Grid>
                                    )}
                                  </Grid>
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={1}>
                        <IconButton aria-label="add">
                          <AddIcon
                            onClick={() => setServiceProviderAddMode(true)}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  )}
                  {serviceProviderAddMode && (
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item md={12}>
                        {t('enter-service-provider-profile-details-then-press-done')}
                      </Grid>
                      <Grid item md={7}>
                        <Select
                          fullWidth
                          value={selectedServiceProvider}
                          onChange={(e) =>
                            handleServiceProviderChange(e.target.value)
                          }
                        >
                          {serviceProviders.map((ausap) => (
                            <MenuItem value={ausap.value}>
                              {ausap.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item md={1}>
                        <TextField
                          fullWidth
                          value={serviceProviderUsername}
                          label="User name"
                          onChange={(e) =>
                            setServiceProviderProfileUsername(e.target.value)
                          }
                          margin="normal"
                        />
                      </Grid>
                      <Grid item md={1}>
                        <TextField
                          fullWidth
                          value={serviceProviderPassword}
                          label="Password"
                          onChange={(e) =>
                            setServiceProviderProfilePassword(e.target.value)
                          }
                          margin="normal"
                        />
                      </Grid>
                      <Grid item md={1}>
                        <TextField
                          fullWidth
                          value={serviceProviderEmbassy}
                          label="Embassy"
                          onChange={(e) =>
                            setServiceProviderProfileEmbassy(e.target.value)
                          }
                          margin="normal"
                        />
                      </Grid>
                      <Grid item md={1}>
                        <Button
                          onClick={() => setServiceProviderAddMode(false)}
                        >
                          {t('cancel')}
                        </Button>
                      </Grid>
                      <Grid item md={1}>
                        <Button
                          onClick={handleDoneAddServiceProviderProfile}
                          color="primary"
                        >
                          {t('done')}
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expandedPanel === "sendPanel"}
              onChange={handlePanelChange("sendPanel")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {t('step-3-bundle-and-process')}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {t('create-a-bundle-for-hawk-processing-or-create-visa-by-proxy-ticket')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Grid item md={12}>
                    <Typography variant="body1">
                      {t('bundle-file-is-required-for-hawk-or-visa-by-proxy-to-install-hawk')}{" "}
                      <a href="https://meetings.hubspot.com/haj-onsoft">
                        {" "}
                        {t('schedule-a-meeting')}
                      </a>
                      ` - OR - `
                      <a href="https://hajonsoft.talentlms.com/unit/view/id:2124">
                        {t('or-watch-install-video')}
                      </a>
                    </Typography>
                    <Box style={{ textAlign: "right", width: "100%" }}>
                      <Typography variant="body2" align="right">
                        {t('useful-links')}
                        <a
                          style={{ marginLeft: "2rem" }}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://nodejs.org/"
                        >
                          NodeJs
                        </a>
                        <a
                          style={{ marginLeft: "1rem" }}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://git-scm.com/downloads"
                        >
                          git
                        </a>
                        <a
                          style={{ marginLeft: "1rem" }}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/hajonsoft/hajonsoft-hawk/raw/main/hawk/bin/Release/hawk.exe"
                        >
                          Hawk
                        </a>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container justifyContent="space-around" spacing={1}>
                      <Grid item md={3}>
                        <Typography variant="h5">{t('step-1-bundle')}</Typography>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>{downloadFileName ? downloadFileName : t('required')}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {t('bundle-file-may-include-passwords-and-or-personal-identifying-information-average-bundle-creation-time-depends-on-your-speed-2-seconds-per-traveller')}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                          {!downloading && (
                            <Button
                              disabled={selectedVisaSystem === ""}
                              onClick={handleDownloadZipFileClick}
                              startIcon={<CloudDownloadOutlined />}
                              style={{ textTransform: 'none' }}>
                              {t('download-now')}
                            </Button>
                          )}
                          {downloading && (
                            <CircularProgress
                              color="secondary"
                              size={30}
                              thickness={3}
                              variant="indeterminate"
                            />
                          )}
                        </div>
                      </Grid>
                      <Grid item>
                        <Divider orientation="vertical" />
                      </Grid>
                      <Grid item md={3}>
                        <Typography variant="h5">{t('step-2-hawk')}</Typography>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>{downloadFileName ? `node . file=${downloadFileName}` : t('optional')}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {t('hawk-uploads-a-bundle-file-immediately-to-the-service-provider-for-macos-we-recommend-using-eagle-directly-to-setup-eagle-please-schedule-a-meeting')}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                          <Button
                            disabled={!downloadFileName}
                            onClick={handleSendDownloadedFile}
                            style={{ textTransform: 'none' }}
                            startIcon={<CloudUploadOutlined />}
                          >
                            {t('hawk-bundle')}
                          </Button>
                          <Button onClick={handleOpenHawk}>
                            <img src={hawkImg} alt="hawk" width="32" height="32" />
                          </Button>
                        </div>
                      </Grid>
                      <Grid item>
                        <Divider orientation="vertical" />
                      </Grid>
                      <Grid item md={4}>
                        <Typography variant="h5">{t('or-visa-by-proxy')} <CheckCircle color="action" /> </Typography>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>{t('premium-support-service')}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {t('we-use-spicework-to-manage-visa-by-proxy-tickets-email-to')}
                        </Typography>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', alignItems: 'center' }}>
                          <Button onClick={sendEmail}
                            style={{ textTransform: 'none' }}
                            startIcon={<Person />}
                            target="_blank">
                            {t('create-visa-by-proxy-ticket')}
                          </Button>
                          <div>
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&su=visa-by-proxy&body=${selectedPassengers?.length}Pax&to=help@hajonsoft.on.spiceworks.com`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AlternateEmail style={{ width: '16px', height: '16px', color: '#009688', marginLeft: '0.5rem' }} />
                            </a>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>{t('close')}</Button>
        </DialogActions>
      </Dialog>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={sendingMail}
        // onClick={() => {
        //   setSendingMail(false);
        //   setEmailSuccess(false);
        // }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={sendingMail}>
          <div className={classes.paper}>
            {sendingMail && !emailSuccess && (
              <>
                {" "}
                <h2 style={{ textAlign: "center" }}>{`Creating visa by proxy request for ${selectedPassengers.length} passengers. Embassy: ${visaSystems[selectedVisaSystem].embassy}`}</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    color="secondary"
                    size={30}
                    thickness={3}
                    variant="indeterminate"
                  />
                  <Typography
                    style={{ textAlign: "center", paddingTop: "1rem" }}
                  >
                    {" "}
                    {t('this-might-take-some-time-please-do-not-refresh-page')}{" "}
                  </Typography>
                </div>{" "}
              </>
            )}
            {emailSuccess === false && sendingMail && (
              <p style={{ textAlign: "center" }}>
                {" "}
                {t('couldnt-create-ticket-please-try-again')}{" "}
              </p>
            )}
            {emailSuccess === true && sendingMail && (
              <>
                <div style={{ width: "25%", height: 150, margin: "1rem auto" }}>
                  <img
                    src={reservationCompleteImage}
                    alt="success-icon"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <Typography style={{ textAlign: "center" }}>
                  {t('your-visa-by-proxy-request-has-been-created-please-check-your-email')}
                </Typography>
                <div className={classes.mailBtnContainer}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.mailBtn}
                    onClick={() => {
                      setSendingMail(false);
                      setEmailSuccess(false);
                    }}
                  >
                    {t('continue-to-app')}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ApplyForVisa;
