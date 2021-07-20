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

const sanitizeGroupName = (gn) => gn.replace(/[^A-Za-z0-9]/gi, "");

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

const usaps = [
  { value: "bau", name: "UMRAH | Bab al umrah (Recommended)" },

  { value: "wtu", name: "UMRAH | Way to umrah (legacy)" },

  { value: "gma", name: "UMRAH | Gabul ya hajj (difficult)" },

  { value: "twf", name: "UMRAH | Tawaf (slow)" },
  { value: "ehr", name: "HAJ | Ehaj (Reservation)" },
  { value: "ehj", name: "HAJ | Ehaj (Submit)" },

  { value: "vst", name: "VISIT | Visit Saudi " },

  { value: "mot", name: "LOCAL | Egypt Tourism" },
];

const ApplyForVisa = ({ open, onClose, travellers, groupName }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [addMode, setAddMode] = React.useState(false);
  const [usap, setUsap] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [downloadFileName, setDownloadFileName] = useState("");
  const [selectedVisaSystem, setSelectedVisaSystem] = React.useState(0);

  const {
    data: visaSystems,
    createData: createVisaSystem,
    deleteData: deleteVisaSystem,
  } = useVisaSystemState();

  const handleSelectedVisaSystemChange = (systemIndex) => {
    if (visaSystems.length > systemIndex) {
      setSelectedVisaSystem(systemIndex);
    }
  };

  const handleUsapChange = (usap) => {
    setUsap(usap);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDoneAddVisaSystem = () => {
    createVisaSystem({
      path: "visaSystem",
      data: { usap, username, password },
    });
    setAddMode(false);
  };
  const handleOnDeleteVisaSystem = (visaSystemIndex) => {
    deleteVisaSystem({
      path: "visaSystem/" + visaSystems[visaSystemIndex]._fid,
      fid: visaSystems[visaSystemIndex]._fid,
    });
  };
  const handleExport = async () => {
    const travellersData = getTravellersJSON(travellers);
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
      const fileName = `${sanitizeGroupName(groupName) +
        "_" +
        parseInt(moment().format("X")).toString(36)}.zip`;
      tempLink.setAttribute("download", fileName);
      setDownloadFileName(fileName);
      tempLink.click();
    });
  };
  const getUsapName = (u) => {
    return usaps.find((ausap) => ausap.value === u)?.name;
  };

  const getSelectedVisaSystem = () => {
    if (visaSystems && visaSystems?.length > 0) {
      const defaultSystem = visaSystems[selectedVisaSystem] || visaSystems[0];
      return `${getUsapName(defaultSystem?.usap)} - Username: ${
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="lg"
      keepMounted
    >
      <DialogTitle>Apply for visa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          HAJonSoft uses browser automation to connect to visa systems. To apply
          for visa please follow the steps below or watch this video
        </DialogContentText>

        <div className={classes.root}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Step 1: Choose Travellers
              </Typography>
              <Typography
                className={classes.secondaryHeading}
              >{`${travellers?.length} Travellers`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              List all travellers in this package in a list or a table, with a
              check box. all checked. User an deselect a traveller
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "system"}
            onChange={handleChange("system")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Step 2: Choose visa system
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {getSelectedVisaSystem()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box style={{ width: "100%" }}>
                {!addMode && (
                  <Grid container alignItems="center">
                    <Grid item md={11}>
                      <FormControl fullWidth variant="filled">
                        <InputLabel>System</InputLabel>
                        <Select
                          value={selectedVisaSystem}
                          onChange={(e) =>
                            handleSelectedVisaSystemChange(e.target.value)
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
                                    {`${getUsapName(x.usap)} ${x.username}`}
                                  </Grid>
                                  {i !== selectedVisaSystem && (
                                    <Grid item>
                                      <IconButton
                                        onClick={() =>
                                          handleOnDeleteVisaSystem(i)
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
                        <AddIcon onClick={() => setAddMode(true)} />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
                {addMode && (
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item md={12}>
                      Enter visa system details then press Done
                    </Grid>
                    <Grid item md={8}>
                      <Select
                        fullWidth
                        value={usap}
                        onChange={(e) => handleUsapChange(e.target.value)}
                      >
                        {usaps.map((ausap) => (
                          <MenuItem value={ausap.value}>{ausap.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={1}>
                      <TextField
                        fullWidth
                        value={username}
                        label="User name"
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item md={1}>
                      <TextField
                        fullWidth
                        value={password}
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item md={1}>
                      <Button onClick={() => setAddMode(false)}>Cancel</Button>
                    </Grid>
                    <Grid item md={1}>
                      <Button onClick={handleDoneAddVisaSystem} color="primary">
                        Done
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Step 3: Download and Send
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Download travellers in one file and start sending to the
                selected visa system
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
                      Instructions: To send travller data to an external visa
                      system. You must have NodeJs installed as well as Eagle
                      and Hawk applications. Eagle is a NodeJs application while
                      Hawk is a windows desktop application.
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
                        formatted ready to be submitted to all visa systems
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={handleExport}>Download zip file</Button>
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
                        able to send the downloaded file to the visa system
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
                        perform manual steps. This is an advanced option. If Hawk
                        did not start restart Hawk setup
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
