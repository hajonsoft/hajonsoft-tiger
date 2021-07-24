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
import { getTravellersJSON, zipWithPhotos } from "../helpers/common";
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
  const [expandedPanel, setExpandedPanel] = React.useState('');
  const [selectedTravellers, setSelectedTravellers] = React.useState(
    travellers
  );
  const [serviceProviderAddMode, setServiceProviderAddMode] = React.useState(false);
  const [selectedServiceProvider, setSelectedServiceProvider] = React.useState(
    ""
  );
  const [serviceProviderUsername, setServiceProviderProfileUsername] = React.useState("");
  const [serviceProviderPassword, setServiceProviderProfilePassword] = React.useState("");
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
    setExpandedPanel(isExpanded ? panel : '');
  };

  const handleDoneAddServiceProviderProfile = () => {
    createVisaSystem({
      path: "visaSystem",
      data: { usap: selectedServiceProvider, username: serviceProviderUsername, password: serviceProviderPassword },
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
    const travellersData = getTravellersJSON(selectedTravellers);
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
      return `${getServiceProviderProfileName(defaultSystem?.usap)} - Username: ${
        defaultSystem?.username
      }`;
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
          HAJonSoft uses browser automation to connect to service providers. To
          apply for visa please follow the steps below or watch the getting
          started course
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
                    {" "}
                    Select All{" "}
                  </Button>
                </Grid>
                <Grid items md={6} container justify="flex-end">
                  <Button onClick={() => setSelectedTravellers([])}>
                    {" "}
                    Deselect All{" "}
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
                                    {`${getServiceProviderProfileName(x.usap)} ${
                                      x.username
                                    }`}
                                  </Grid>
                                  {i !== selectedVisaSystem && (
                                    <Grid item>
                                      <IconButton
                                        onClick={() =>
                                          handleOnDeleteServiceProviderProfile(i)
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
                        <AddIcon onClick={() => setServiceProviderAddMode(true)} />
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
                        onChange={(e) => setServiceProviderProfileUsername(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item md={1}>
                      <TextField
                        fullWidth
                        value={serviceProviderPassword}
                        label="Password"
                        onChange={(e) => setServiceProviderProfilePassword(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item md={1}>
                      <Button onClick={() => setServiceProviderAddMode(false)}>Cancel</Button>
                    </Grid>
                    <Grid item md={1}>
                      <Button onClick={handleDoneAddServiceProviderProfile} color="primary">
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
                Step 3: Download and Send
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Download travellers in one file and start sending to the
                selected service provider
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
                  <Box p={2}>
                    <Typography variant="body1">
                      Instructions: To send travellers to a service provider. You must have NodeJs installed as well as Eagle
                      and Hawk applications. Eagle is a NodeJs application while
                      Hawk is a windows desktop application. To install Hawk and
                      Eagle please contact HAJonSoft support.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Card
                    raised
                    style={{ backgroundColor: "hsl(240,50%,94%)" }}
                    className={classes.sendCard}
                  >
                    <CardHeader
                      title="Step 1 (Required)"
                      subheader={downloadFileName}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        Download comprehensive traveller data into one file JSON
                        formatted ready to be submitted to any service provider
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {!downloading && (
                        <Button onClick={handleDownloadZipFileClick}>
                          Download zip file
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
                    style={{ backgroundColor: "hsl(240,50%,97%)" }}
                    className={classes.sendCard}
                  >
                    <CardHeader
                      title="Step 2 (Option 1)"
                      subheader={downloadFileName}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        Once traveller data file has been downloaded. Choose
                        this option to start Hawk. Hawk is a desktop application
                        able to send the downloaded file to a service provider
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        disabled={!downloadFileName}
                        onClick={handleSendDownloadedFile}
                      >
                        {`Start Send`}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <Card
                    raised
                    style={{ backgroundColor: "hsl(240,50%,97%)" }}
                    className={classes.sendCard}
                  >
                    <CardHeader
                      title="Step 2 (Option 2)"
                      subheader={downloadFileName}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        Choose this option to start Hawk desktop application and
                        perform manual steps. This is an advanced option. If
                        Hawk did not start restart Hawk setup
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={handleOpenHawk}>start hawk</Button>
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
