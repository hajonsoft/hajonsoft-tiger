import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmbassyReports from "./EmbassyReports";
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
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPastCaravan, setUpcomingCaravan } from "../redux/caravanSlice";
import BioStatistics from "./BioStatistics";
import NationalityStatistics from "./NationalityStatistics";
import {
  faHandsHelping,
  faPassport,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import ReportListItem from "./ReportListItem";
import BarChartRoundedIcon from "@material-ui/icons/BarChartRounded";
import { getAllReports } from "../../Dashboard/redux/reportSlice";

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
  const caravans = JSON.parse(
    JSON.stringify(useSelector((state) => state.caravan?.data))
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  // const reportLoading = useSelector((state) => state.report?.loading);
  // const reportError = useSelector((state) => state.report?.error);
  const reports = useSelector((state) => state.report?.data);

  console.log(reports[data.name], "REPORTS DATA !!");

  useEffect(() => {
    dispatch(getAllReports({ caravanName: data.name }));
  }, [dispatch, data.name]);

  const handleOnTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const caravanHistoryHandler = async (isUpcoming) => {
    if (!isUpcoming) {
      await dispatch(
        setPastCaravan({ name: data.name, passengers: caravanData[data.name] })
      );
    } else {
       await dispatch(
        setUpcomingCaravan({
          name: data.name,
          passengers: caravanData[data.name],
        })
      );
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
            label="Print"
            style={{ textTransform: "none" }}
            {...a11yProps(2)}
          />
          <Tab
            label="Reports"
            style={{ textTransform: "none" }}
            {...a11yProps(2)}
          />
          <Tab
            label="Design"
            style={{ textTransform: "none" }}
            {...a11yProps(2)}
          />
        </Tabs>
        <ButtonGroup
          color="primary"
          variant="outlined"
          style={{ marginRight: "2rem" }}
        >
          <Button
            disabled
            onClick={() => caravanHistoryHandler(true)}
            style={{ textTransform: "none" }}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => caravanHistoryHandler(false)}
            style={{ background: "rgb(227, 242, 253)", textTransform: "none" }}
          >
            +Past
          </Button>
        </ButtonGroup>
      </Box>
      <Paper style={{ padding: "2rem" }}>
        <TabPanel value={activeTab} index={0}>
          {loading && <CircularProgress />}
          {error}
          {!loading && data && caravans && (
            <BioStatistics data={Object.values(caravans[data.name])} />
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {loading && <CircularProgress />}
          {error}
          {!loading && data && caravans && (
            <NationalityStatistics data={Object.values(caravans[data.name])} />
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
                onClick={() => console.log("ID Cards")}
                className={classes.actionBox}
              >
                <Typography className={classes.actionText}>
                  New ID Card
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
                <Typography className={classes.actionText}>
                  Customize
                </Typography>
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
                onClick={() => {}}
                className={classes.actionBox}
              >
                <Typography className={classes.actionText}>
                  New Report
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
                <Typography className={classes.actionText}>
                  New Bracelet
                </Typography>
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

        <TabPanel value={activeTab} index={3}>
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "1rem",
              paddingBottom: ".25rem",
              borderBottom: "1px solid #ccc",
            }}
          >
            <BarChartRoundedIcon color="primary" fontSize="large" /> Reports
          </Typography>
          {reports[data.name] &&
            Object.keys(reports[data.name]).map((reportName) => {
              const reportObj = reports[data.name][reportName];
              return (
                <ReportListItem
                  name={Object.keys(reportObj)[0]}
                  caravanName={data.name}
                  printingData={ reportObj[Object.keys(reportObj)[0]] }
                />
              );
            })}
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <EmbassyReports passengers={caravans[data.name]} caravanName={data.name} />
        </TabPanel>
      </Paper>
    </>
  );
};

export default PackageDetail;
