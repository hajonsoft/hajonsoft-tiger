import { Button, CircularProgress, Grid, Paper, Tabs, Tab, Box, Typography, ButtonGroup } from "@material-ui/core";
//TODO: Redesign, talk to customers to get feedback
import React, { useState } from "react";
import { getPassengersJSON, zipWithPhotos } from "../helpers/common";
import useTravellerState from "../redux/useTravellerState";
import ApplyForVisa from "./ApplyForVisa";
import BioStatistics from "./BioStatistics";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import NationalityStatistics from "./NationalityStatistics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faPassport,
  faPrint,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  actionBox: {
    padding: "1rem", borderRadius: "4px", background: "#e3f0fdab",
    "&:hover": {
      cursor: "pointer",
      background: "rgb(227, 242, 253)"
    }
  },
  actionText: {
    fontSize: "18px", fontWeight: "bold", color: "#03a9f4"
  },
  actionIconContainer: {
    paddingTop: ".5rem", display: "flex", justifyContent: "flex-end", alignItems: "center"
  }
});


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



const PackageDetail = ({ data }) => {
  const { data: travellers, loading, error, updateData } = useTravellerState();
  const [shareProgress, setShareProgress] = useState({
    loading: false,
    value: 0,
  });
  const classes = useStyles()
  const [applyForVisaOpen, setApplyForVisaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);


  // const updateCaravan = () => {
  //   updateData({
  //     path: `customer/${data.name}/upcoming`,
  //     data: { _fid: "upcoming" },
  //   });
  // }


  const handleShareClick = async () => {
    setShareProgress({ loading: true, value: 0 });
    const travellersData = getPassengersJSON(travellers, data);
    const jsonData = JSON.stringify(travellersData);
    const zip = await zipWithPhotos(
      jsonData,
      travellers,
      data,
      setShareProgress
    );

    zip.generateAsync({ type: "blob" }).then(function (content) {
      const newFile = new Blob([content], { type: "application/zip" });
      var csvURL = window.URL.createObjectURL(newFile);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", `${data.name}.zip`);
      tempLink.click();
    });

    setShareProgress({ loading: false, value: 100 });
  };

  const handleApplyForVisa = () => {
    setApplyForVisaOpen(true);
  };

  const handleOnTabChange = (e, value) => {
    setActiveTab(value);
  }

  return (
    <>
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleOnTabChange}
        >
          <Tab label="Gender Stats" style={{ textTransform: 'none' }}  {...a11yProps(0)} />
          <Tab label="Nationality Stats" style={{ textTransform: 'none' }} {...a11yProps(1)} />
          <Tab label="Actions" style={{ textTransform: 'none' }} {...a11yProps(2)} />
        </Tabs>
        <ButtonGroup color="primary" variant="outlined" color="primary" style={{ marginRight: "2rem" }} >
          <Button disabled>Upcoming</Button>
          <Button style={{ background: "rgb(227, 242, 253)" }} >Add to Past</Button>
        </ButtonGroup>

      </Box>
      <Paper style={{ padding: "2rem" }}>
        <TabPanel value={activeTab} index={0}>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
            <BioStatistics data={Object.values(travellers[data.name])} />
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
            <NationalityStatistics
              data={Object.values(travellers[data.name])}
            />
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container spacing={3} style={{ maxWidth: "500px" }}>
            <Grid item md={6}>
              <Box onClick={handleApplyForVisa} className={classes.actionBox} >
                <Typography className={classes.actionText} > Apply for visa </Typography>
                <Box className={classes.actionIconContainer} >
                  <FontAwesomeIcon color="#03a9f4" size="2x" icon={faPassport} />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box onClick={handleShareClick} className={classes.actionBox} >
                <Typography className={classes.actionText} > Share </Typography>
                <Box className={classes.actionIconContainer} >
                  <FontAwesomeIcon color="#03a9f4" size="2x" icon={faShareSquare} />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box onClick={handleShareClick} className={classes.actionBox} >
                <Typography className={classes.actionText} > Reports </Typography>
                <Box className={classes.actionIconContainer} >
                  <FontAwesomeIcon color="#03a9f4" size="2x" icon={faPrint} />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box onClick={handleShareClick} className={classes.actionBox} >
                <Typography className={classes.actionText} > Assist </Typography>
                <Box className={classes.actionIconContainer} >
                  <FontAwesomeIcon color="#03a9f4" size="2x" icon={faHandsHelping} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </>
  );
};

export default PackageDetail;
