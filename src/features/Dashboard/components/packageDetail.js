import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReports } from '../../Dashboard/redux/reportSlice';
import { setPastCaravan, setUpcomingCaravan } from '../redux/caravanSlice';
import BioStatistics from './BioStatistics';
import EmbassyReports from './EmbassyReports';
import NationalityStatistics from './NationalityStatistics';
import ReportListItem from './ReportListItem';
import IDCard from './IDCard';

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

const PackageDetail = ({ data, caravanData }) => {
  const loading = useSelector((state) => state.caravan?.loading);
  const error = useSelector((state) => state.caravan?.error);
  const caravans = JSON.parse(
    JSON.stringify(useSelector((state) => state.caravan?.data))
  );

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  // const reportLoading = useSelector((state) => state.report?.loading);
  // const reportError = useSelector((state) => state.report?.error);
  const reports = useSelector((state) => state.report?.data);

  console.log(caravans, "caravans")

  console.log("hello world...")

  useEffect(() => {
    dispatch(getAllReports());
  }, [dispatch]);

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            style={{ textTransform: 'none' }}
            {...a11yProps(0)}
          />
          <Tab
            label="Nationality Stats"
            style={{ textTransform: 'none' }}
            {...a11yProps(1)}
          />
          <Tab
            label="Reports"
            style={{ textTransform: 'none' }}
            {...a11yProps(2)}
          />
          <Tab
            label="Report designer ..."
            style={{ textTransform: 'none' }}
            {...a11yProps(3)}
          />
          <Tab
            label="ID Card designer ..."
            style={{ textTransform: 'none' }}
            {...a11yProps(4)}
          />
        </Tabs>
        <ButtonGroup
          color="primary"
          variant="outlined"
          style={{ marginRight: '2rem' }}
        >
          <Button
            disabled
            onClick={() => caravanHistoryHandler(true)}
            style={{ textTransform: 'none' }}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => caravanHistoryHandler(false)}
            style={{ background: 'rgb(227, 242, 253)', textTransform: 'none' }}
          >
            +Past
          </Button>
        </ButtonGroup>
      </Box>
      <Paper style={{ padding: '2rem' }}>
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

        <TabPanel value={activeTab} index={2}>
          <Typography
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '1rem',
              paddingBottom: '.25rem',
              borderBottom: '1px solid #ccc',
            }}
          >
            <BarChartRoundedIcon color="primary" fontSize="large" /> Reports
          </Typography>
          {reports &&
            reports.map((report) => {
              return (
                <ReportListItem
                  name={report.name}
                  printingData={{
                    columns: Object.values(report.columns),
                    data: caravans[data.name],
                  }}
                />
              );
            })}
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <EmbassyReports passengers={caravans[data.name]} />
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <IDCard caravanName={data.name} passengers={caravanData[data.name]} />
        </TabPanel>
      </Paper>
    </>
  );
};

export default PackageDetail;
