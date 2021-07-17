import React from "react";
import FullReservation from "./components/FullReservation";
import BasicReservation from "./components/BasicReservation";
import { Box, Grid, MenuItem, Select, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import trans from "../../util/trans";

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
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Reservation = ({lang, onLanguageChange}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container style={{ backgroundColor: "#ccc", minHeight: "100vh" }}>
      <Grid item xs={3}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            style={{ width: "100%" }}
            label="Quick reservation"
            {...a11yProps(0)}
          />
          <Tab
            style={{ width: "100%" }}
            label="Full reservation"
            {...a11yProps(1)}
          />
        </Tabs>
        <Box p={4} style={{display: 'flex', justifyContent: 'center'}}>
          <Select
            value={lang}
            onChange={(e) => onLanguageChange(e.target.value)}
            variant="standard"
          >
            <MenuItem value="en">
              <Typography variant="body1">English</Typography>
            </MenuItem>
            <MenuItem value="ar">
              <Typography variant="body1">اللغه العربيه</Typography>
            </MenuItem>
            <MenuItem value="fr">
              <Typography variant="body1">Française</Typography>
            </MenuItem>
          </Select>
        </Box>
      </Grid>
      <Grid item xs={9}>
        {value === 0 ? <BasicReservation /> : <FullReservation />}
      </Grid>
    </Grid>
  );
};

export default Reservation;
