import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Box,
  Typography,
  Tabs,
  ButtonGroup,
  Tab,
} from "@material-ui/core";
//TODO:PKG Redesign, talk to customers to get feedback
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ApplyForVisa from "./ApplyForVisa";
import { setPastCaravan, setUpcomingCaravan } from "../redux/caravanSlice";
import BioStatistics from "./BioStatistics";
import NationalityStatistics from "./NationalityStatistics";
import {
  faHandsHelping,
  faPassport,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  actionBox: {
    padding: "1rem",
    borderRadius: "4px",
    background: "#e3f0fdab",
    "&:hover": {
      cursor: "pointer",
      background: "rgb(227, 242, 253)",
    },
  },
  actionText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#03a9f4",
  },
  actionIconContainer: {
    paddingTop: ".5rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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

const PackageDetail = ({ data, caravanData }) => {
  const loading = useSelector((state) => state.caravan?.loading);
  const error = useSelector((state) => state.caravan?.error);
  const passengers = useSelector((state) => state.caravan?.data);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const handleOnTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const caravanHistoryHandler = async (isUpcoming) => {
    if (!isUpcoming) {
      const pastResult = await dispatch(
        setPastCaravan({ name: data.name, passengers: caravanData[data.name] })
      );
      console.log(pastResult, "past result!!!");
    } else {
      const pastResult = await dispatch(
        setUpcomingCaravan({
          name: data.name,
          passengers: caravanData[data.name],
        })
      );
      console.log(pastResult, "past result!!!");
    }
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleOnTabChange}
        >
          <Tab
            label="Gender Stats"
            style={{ textTransform: "none" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Nationality Stats"
            style={{ textTransform: "none" }}
            {...a11yProps(1)}
          />
          <Tab
            label="Actions"
            style={{ textTransform: "none" }}
            {...a11yProps(2)}
          />
        </Tabs>
        <ButtonGroup
          color="primary"
          variant="outlined"
          color="primary"
          style={{ marginRight: "2rem" }}
        >
          <Button disabled onClick={() => caravanHistoryHandler(true)}>
            Upcoming
          </Button>
          <Button
            onClick={() => caravanHistoryHandler(false)}
            style={{ background: "rgb(227, 242, 253)" }}
          >
            Add to Past
          </Button>
        </ButtonGroup>
      </Box>
      <Paper style={{ padding: "2rem" }}>
        <TabPanel value={activeTab} index={0}>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
            <BioStatistics data={Object.values(passengers[data.name])} />
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
            <NationalityStatistics
              data={Object.values(passengers[data.name])}
            />
          )}
        </TabPanel>
        <TabPanel
          value={activeTab}
          index={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={3} style={{ maxWidth: "500px" }}>
            <Grid item md={6}>
              <Box
                onClick={() => console.log("apply for visa")}
                className={classes.actionBox}
              >
                <Typography className={classes.actionText}>
                  {" "}
                  Apply for visa{" "}
                </Typography>
                <Box className={classes.actionIconContainer}>
                  <FontAwesomeIcon
                    color="#03a9f4"
                    size="2x"
                    icon={faPassport}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box
                onClick={() => console.log("hello__world!!")}
                className={classes.actionBox}
              >
                <Typography className={classes.actionText}> Share </Typography>
                <Box className={classes.actionIconContainer}>
                  <FontAwesomeIcon
                    color="#03a9f4"
                    size="2x"
                    icon={faShareSquare}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box
                onClick={() => console.log("hello__world!!")}
                className={classes.actionBox}
              >
                <Typography className={classes.actionText}>
                  {" "}
                  Reports{" "}
                </Typography>
                <Box className={classes.actionIconContainer}>
                  <FontAwesomeIcon color="#03a9f4" size="2x" icon={faPrint} />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box
                onClick={() => console.log("hello__world!!")}
                className={classes.actionBox}
              >
                <Typography className={classes.actionText}> Assist </Typography>
                <Box className={classes.actionIconContainer}>
                  <FontAwesomeIcon
                    color="#03a9f4"
                    size="2x"
                    icon={faHandsHelping}
                  />
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
