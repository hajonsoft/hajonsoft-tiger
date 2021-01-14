import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Grid
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApplyForVisa = ({ open, onClose, travellers }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [visaSystem, setVisaSystem] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSystemChange = (system) => {
      setVisaSystem(system );
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
              >{`${travellers.length} Travellers`}</Typography>
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
                Step 2: Visa system
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Way to Umrah
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
<Grid container justify="space-between" alignItems="center"> 
<Grid item>
              <RadioGroup
                  value={visaSystem}
                  onChange={(e)=> handleSystemChange(e.target.value) }
              >
                  <FormControlLabel value="bau" control={<Radio />} label="Bab al umrah (Recommended)" />
                  <FormControlLabel value="wtu" control={<Radio />} label="Way to umrah (legacy)" />
                  <FormControlLabel value="gma" control={<Radio />} label="Gabul ya hajj (difficult)" />
                  <FormControlLabel value="twf" control={<Radio />} label="Gabul ya hajj (slow)" />
                  <FormControlLabel value="vst" control={<Radio />} label="Visit Saudi " />
                  <FormControlLabel value="mot" control={<Radio />} label="Egypt Tourism" />
              </RadioGroup>
</Grid>
<Grid item>
<Grid  container direction="column" spacing={4}>

<Grid item>
              <TextField
                  value={username}
                  label="User name"
                  onChange={(e)=> setUsername(e.target.value)}
                  margin="normal"
              />
</Grid>
<Grid item>

                            <TextField
                  value={password}
                  label="Password"

                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
              />
</Grid>
</Grid>
</Grid>
</Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Step 3: Options
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Export
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Export data or create an assist request</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Step 4: Execute
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Verify software is installed in case of export
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Button to export the data or create an assist request
              </Typography>
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
