import React from "react";
import Full from "./full";
import Basic from "./basic"
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


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

const Reserve = () => {
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
          <Tab style={{width: "100%"}} label="Basic Reserve" {...a11yProps(0)} />
          <Tab style={{width: "100%"}} label="Full Reserve" {...a11yProps(1)} />
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        { value === 0 ? <Basic /> : <Full />  }
      </Grid>
    </Grid>
  );
};

export default Reserve;
