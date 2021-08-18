import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import React, { useState } from "react";
import firebaseConfig from "../../../firebaseConfig";
import { getPassengersJSON, zipWithPhotos } from "../helpers/common";
import useVisaSystemState from "../redux/useVisaSystemState";

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
  { value: "ehr", name: "HAJ | Ehaj (Reservation)" },
  { value: "ehj", name: "HAJ | Ehaj (Submit)" },

  { value: "vst", name: "VISIT | Visit Saudi " },

  { value: "mot", name: "LOCAL | Egypt Tourism" },
];

const ApplyForVisa = ({ open, onClose, travellers, caravan }) => {
  const classes = useStyles();
  const [expandedPanel, setExpandedPanel] = React.useState("");
  const [pace, setPace] = React.useState(1.5);
  const [selectedTravellers, setSelectedTravellers] = React.useState(
    travellers
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
  const [downloadFileName, setDownloadFileName] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [selectedVisaSystem, setSelectedVisaSystem] = React.useState(0);

  React.useEffect(() => {
    setSelectedTravellers(travellers);
  }, [travellers]);

  const {
    data: visaSystems,
    createData: createVisaSystem,
    deleteData: deleteVisaSystem,
  } = useVisaSystemState();

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
    createVisaSystem({
      path: "visaSystem",
      data: {
        usap: selectedServiceProvider,
        username: serviceProviderUsername,
        password: serviceProviderPassword,
      },
    });
    setServiceProviderAddMode(false);
  };
  const handleOnDeleteServiceProviderProfile = (visaSystemIndex) => {
    deleteVisaSystem({
      path: "visaSystem/" + visaSystems[visaSystemIndex]._fid,
      fid: visaSystems[visaSystemIndex]._fid,
    });
  };
  const handleDownloadZipFileClick = async () => {
    setDownloading(true);
    setDownloadFileName('');
    const startTime = moment();
    const travellersData = getPassengersJSON(selectedTravellers);
    const exportVisaSystem = visaSystems[selectedVisaSystem];
    const data = {
      system: {
        username: exportVisaSystem.username,
        password: exportVisaSystem.password,
        name: exportVisaSystem.usap,
      },
      travellers: travellersData,
    };
    const zip = await zipWithPhotos(data, null);

    zip.generateAsync({ type: "blob" }).then(function(content) {
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
      var elabsed = (moment.duration(moment().diff(startTime)).asSeconds() / selectedTravellers.length).toFixed(1);
      setPace(elabsed);
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
      const defaultSystem = visaSystems[selectedVisaSystem] || visaSystems[0];
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

  const handleCheckTraveller = (checkStatus, traveller) => {
    if (checkStatus) {
      setSelectedTravellers(
        (prevState) => (prevState = [...prevState, traveller])
      );
    } else {
      setSelectedTravellers((prevState) =>
        prevState.filter((t) => t._fid !== traveller._fid)
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="lg"
      keepMounted
    >
      <DialogTitle>{`Apply for visa`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          HAJonSoft uses Hawk application to connect to travel service providers. If you are new or using MacOs, you can select "visa by proxy", use eagle or <a href="https://hajonsoft.talentlms.com/catalog/info/id:125">Take a Course</a>
        </DialogContentText>

        <div className={classes.root}>
          <Accordion
            expanded={expandedPanel === "travellersPanel"}
            onChange={handlePanelChange("travellersPanel")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Step 1: Choose Travellers
              </Typography>
              <Typography
                className={classes.secondaryHeading}
              >{`${selectedTravellers?.length}/${travellers?.length} Travellers [${caravan} caravan]`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container justify="space-between">
                <Grid items md={6}>
                  <Button onClick={() => setSelectedTravellers(travellers)}>
                    Select All
                  </Button>
                </Grid>
                <Grid items md={6} container justify="flex-end">
                  <Button onClick={() => setSelectedTravellers([])}>
                    Deselect All
                  </Button>
                </Grid>
                {travellers &&
                  travellers.map((traveller) => (
                    <Grid item key={traveller._fid}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedTravellers?.filter(
                                (t) => t._fid === traveller._fid
                              ).length > 0
                            }
                            onChange={(e) =>
                              handleCheckTraveller(e.target.checked, traveller)
                            }
                          />
                        }
                        label={traveller.name}
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
                Step 2: Choose Service Provider Profile
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
                        <InputLabel>Service Provider Profile</InputLabel>
                        <Select
                          value={selectedVisaSystem}
                          onChange={(e) =>
                            handleServiceProviderProfileChange(e.target.value)
                          }
                        >
                          {visaSystems &&
                            visaSystems?.length > 0 &&
                            visaSystems.map((x, i) => (
                              <MenuItem value={i} key={x.username}>
                                <Grid
                                  container
                                  justify="space-between"
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
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item md={12}>
                      Enter service provider profile details then press Done
                    </Grid>
                    <Grid item md={8}>
                      <Select
                        fullWidth
                        value={selectedServiceProvider}
                        onChange={(e) =>
                          handleServiceProviderChange(e.target.value)
                        }
                      >
                        {serviceProviders.map((ausap) => (
                          <MenuItem value={ausap.value}>{ausap.name}</MenuItem>
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
                      <Button onClick={() => setServiceProviderAddMode(false)}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item md={1}>
                      <Button
                        onClick={handleDoneAddServiceProviderProfile}
                        color="primary"
                      >
                        Done
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
                Step 3: Bundle and process
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Create a bundle for Hawk processing or create "visa by proxy" Ticket
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item md={12}>
                    <Typography variant="body1">
                      Bundle file is required for Hawk or "visa by proxy". To install Hawk  <a href="https://meetings.hubspot.com/haj-onsoft"> Schedule a meeting</a> 
                    </Typography>
                  <Box style={{textAlign: 'right', width: '100%'}}>
                    <Typography variant="body2" align="right">
                      Useful links
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
                        href="https://github.com/hajonsoft/hajonsoft-hawk/raw/main/hawk/bin/Release/hawk.exe"
                      >
                        Hawk
                      </a>
                      <a
                        style={{ marginLeft: "1rem" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/hajonsoft/hajonsoft-eagle"
                      >
                        Eagle
                      </a>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Card
                    raised
                    style={{ backgroundColor: "hsl(240,50%,90%)" }}
                    className={classes.sendCard}
                  >
                    <CardHeader
                      title="Step 1 [Bundle]"
                      subheader={downloadFileName || "Required"}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        {`Bundle file may include passwords and/or personal identifying information. Average bundle creation time depends on your speed ~= ${pace} seconds per traveller`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {!downloading && (
                        <Button onClick={handleDownloadZipFileClick}>
                          Download file
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
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <Card
                    raised
                    style={{ backgroundColor: "hsl(240,50%,95%)" }}
                    className={classes.sendCard}
                  >
                    <CardHeader
                      title="Step 2 [Hawk]"
                      subheader={downloadFileName || "Optional"}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        Hawk uploads a bundle file immediately to the service
                        provider. For MacOs we recommend using eagle directly. To setup eagle please schedule a meeting.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        disabled={!downloadFileName}
                        onClick={handleSendDownloadedFile}
                      >
                        {`Upload Automatic`}
                      </Button>
                      <Button onClick={handleOpenHawk}>
                        {`Upload Manual`}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <Card
                    raised
                    style={{ backgroundColor: "hsl(240,50%,99%)" }}
                    className={classes.sendCard}
                  >
                    <CardHeader
                      title="- OR - [visa by proxy]"
                      subheader={downloadFileName || "Optional"}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        We use spicework to manage "visa by proxy" tickets. Email to <a href={`mailto:help@hajonsoft.on.spiceworks.com?subject=visa-by-proxy [${downloadFileName}] ${selectedTravellers?.length} PAX&body=Embassy is ...`}>help@hajonsoft.on.spiceworks.com</a> or fill a form. either way you must attach the bundle file
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button href="https://hajonsoft.on.spiceworks.com/portal">
                        Create "visa by proxy" Ticket
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyForVisa;
