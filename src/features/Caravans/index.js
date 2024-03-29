import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddCircleOutline, SendOutlined } from "@material-ui/icons";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import DetailsIcon from "@material-ui/icons/Details";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import ExploreIcon from "@material-ui/icons/Explore";
import LastPage from "@material-ui/icons/LastPage";
import NearMeIcon from "@material-ui/icons/NearMe";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";
import dayjs from "dayjs";
import MaterialTable from "material-table";
import moment from "moment";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppHeader from "../../shared/macaw/AppHeader";
import t from "../../shared/util/trans";
import ApplyForVisa from "./components/ApplyForVisa";
import CRUDForm from "./components/CRUDForm";
import PackageDetail from "./components/packageDetail";
import {
  deleteExpiredPassports,
  deleteUpcomingCaravan,
  getUpcomingCaravans,
} from "./redux/caravanSlice";
import { getPastCaravans } from "./redux/pastCaravanSlice";
import { faPassport } from "@fortawesome/free-solid-svg-icons";
import { isResult } from "../../redux/helpers";

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  MoreDetails: forwardRef((props, ref) => <DetailsIcon {...props} ref={ref} />),
  ApplyVisa: forwardRef((props, ref) => <NearMeIcon {...props} ref={ref} />),
  CallMerge: forwardRef((props, ref) => <CallMergeIcon {...props} ref={ref} />),
};

const Dashboard = () => {
  // Local State
  const [isPast, setIsPast] = useState(false);
  const [holdData, setHoldData] = useState([]);
  const [state, setState] = useState({ mode: "list", record: {} });
  const [showConfirmDeleteExpired, setShowConfirmDeleteExpired] =
    useState(false);
  const [applyForVisaOpen, setApplyForVisaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  // Redux
  const dispatch = useDispatch();
  const caravans = useSelector((state) => state.caravan?.data);
  const pastCaravans = useSelector((state) => state.past?.data);
  const loading = useSelector((state) => state.caravan?.loading);
  const keyword = useSelector((state) => state.caravan?.keyword);
  const error = useSelector((state) => state.caravan?.error);
  const history = useHistory();

  const title = !isPast ? t("caravan") : t("past-caravans");
  const paxUpcoming = Object.entries(caravans).reduce((acc, [name, pax]) => {
    return acc + pax.length;
  }, 0);
  const duplicatePaxUpcoming =  Object.entries(caravans).reduce((acc, [name, pax]) => {
    return acc + pax.filter(p => p.isDuplicate).length;
  }, 0);
  const paxPast = Object.entries(pastCaravans).reduce((acc, [name, pax]) => {
    return acc + pax.length;
  }, 0);
  const duplicatePaxPast = Object.entries(pastCaravans).reduce((acc, [name, pax]) => {
    return acc + pax.filter(p => p.isDuplicate).length;
  }, 0);
  // use Effect
  useEffect(() => {
    dispatch(getUpcomingCaravans());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const Title = () => {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <ExploreIcon />
        </Grid>
        <Grid item>
          <Typography variant="h6" component="span">
            {title}
          </Typography>
          <Typography variant="caption" component="span"> {' '}
            {isPast ? `${paxPast} pax, ${duplicatePaxPast} duplicates` : `${paxUpcoming} pax, ${duplicatePaxUpcoming} duplicates`}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const handleOnSearchChange = (keyword) => {
    const keyword1 = "passExpireDt";
    const pattern = new RegExp(`${keyword1}[0-9]{4}-[0-9]{2}-[0-9]{2}`, "i");
    if (keyword.match(pattern)) {
      const expireDate = moment(
        keyword.toLowerCase().replace(keyword1.toLowerCase(), "")
      );
      const searchResult = {};
      const stats = {};
      let total = 0;

      for (const grp in caravans) {
        const groupResult = caravans[grp].filter((pax) =>
          moment(pax.passExpireDt).isBefore(expireDate)
        );
        if (groupResult.length) {
          searchResult[grp] = groupResult;
          total = total + groupResult.length;
          stats[grp] = {
            total: groupResult.length,
          };
        }
      }
      const content = JSON.stringify(searchResult, null, 2);
      const message = `You have ${total} passports expiring on or before ${expireDate.format(
        "ddd DD-MMM-yyyy"
      )} which is ${expireDate.fromNow()}. Click ok to download.\n ${JSON.stringify(
        stats,
        null,
        2
      )}`;
      alert(message);

      const newFile = new Blob([content], { type: "application/text" });
      var csvURL = window.URL.createObjectURL(newFile);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      const fileName = `${keyword}`;
      tempLink.setAttribute("download", fileName);
      tempLink.click();
    }
  };

  const handleOnConfirmDelete = () => {
    dispatch(deleteUpcomingCaravan(state.record.name));
    setState((st) => ({ ...st, mode: "list", record: {} }));
  };

  const handleOnConfirmDeleteExpired = () => {
    dispatch(
      deleteExpiredPassports({
        passengers: holdData.expired,
        caravan: holdData.name,
      })
    );
    setShowConfirmDeleteExpired(false);
  };

  const handleOnTabChange = (e, value) => {
    setActiveTab(value);
  };

  const handleUpcomingCaravanClick = () => {
    setIsPast(false);
  };

  const handlePastCaravanClick = () => {
    dispatch(getPastCaravans());
    setIsPast(true);
  };

  const getData = () => {
    if (isPast) {
      return Object.keys(pastCaravans)
        .sort()
        .map((v) => ({
          name: v,
          total: pastCaravans[v].filter((passenger) =>
            isResult(passenger, keyword)
          ).length,
          duplicates: pastCaravans[v].filter((passenger) => !!passenger?.isDuplicate && passenger?.duplicateCount > 0)
          .length,
          expired: pastCaravans[v].filter(
            (passenger) =>
              isResult(passenger, keyword) &&
              dayjs(passenger.passExpireDt).isBefore(dayjs().add(-6, "month"))
          ),
        }));
    }
    return Object.keys(caravans)
      .sort()
      .map((v) => ({
        name: v,
        total: caravans[v].filter((passenger) => isResult(passenger, keyword))
          .length,
        duplicates: caravans[v].filter((passenger) => passenger?.isDuplicate && passenger?.duplicateCount > 0)
        .length,
        expired: caravans[v].filter(
          (passenger) =>
            isResult(passenger, keyword) &&
            dayjs(passenger.passExpireDt).isBefore(dayjs().add(-6, "month"))
        ),
      }));
  };

  const handleDeleteExpired = (caravan) => {
    setHoldData(caravan);
    setShowConfirmDeleteExpired(true);
  };

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "#e3f2fd",
          minHeight: "100vh",
        }}
      >
        <AppHeader />
        <div>
          {loading && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ height: "100vh" }}
            >
              <Grid item>
                <CircularProgress size={60} />
                {t("loading-caravans")}
              </Grid>
            </Grid>
          )}
          {!loading &&
            state.mode !== "list" &&
            state.mode !== "delete" &&
            state.mode !== "merge" && (
              <CRUDForm
                mode={state.mode}
                record={state.record}
                title={title}
                onClose={() => {
                  setState((st) => ({ ...st, mode: "list" }));
                }}
              />
            )}
          {!loading && (state.mode === "list" || state.mode === "merge") && (
            <>
              <Tabs
                value={activeTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleOnTabChange}
              >
                <Tab
                  label={t("upcoming")}
                  style={{ textTransform: "none" }}
                  onClick={handleUpcomingCaravanClick}
                />
                <Tab
                  label={t("past")}
                  style={{ textTransform: "none" }}
                  onClick={handlePastCaravanClick}
                />
              </Tabs>
              <MaterialTable
                onSearchChange={handleOnSearchChange}
                icons={tableIcons}
                title={<Title />}
                columns={[
                  {
                    title: t("name"),
                    field: "name",
                    render: (rowData) => (
                      <div>
                        {state.mode === "merge" &&
                        rowData.name === state.record.name ? (
                          <Grid container spacing={2} alignItem="center">
                            <Grid item>
                              <CallMergeIcon color="secondary" size="small" />
                            </Grid>
                            <Grid item>
                              <tableIcons.Delete
                                color="secondary"
                                size="small"
                              />
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {rowData.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        ) : (
                          <Button
                            href=""
                            color="primary"
                            onClick={() =>
                              history.push(`${rowData.name}/customers`)
                            }
                            style={{ textTransform: "none" }}
                          >
                            {rowData.name}
                          </Button>
                        )}
                      </div>
                    ),
                  },
                  {
                    title: t("total"),
                    field: "total",
                  },
                  {
                    title: "duplicate",
                    field: "duplicates",
                  },
                  {
                    title: t("expired-passports"),
                    field: "expired",
                    render: (rowData) => (
                      <div>
                        {!loading && rowData?.expired?.length > 0 ? (
                          <Chip
                            label={rowData.expired.length}
                            variant="outlined"
                            onDelete={() => handleDeleteExpired(rowData)}
                            icon={
                              <FontAwesomeIcon
                                color="#d32f2f"
                                icon={faPassport}
                              />
                            }
                          />
                        ) : null}
                      </div>
                    ),
                  },
                ]}
                data={getData()}
                detailPanel={(rowData) => (
                  <PackageDetail
                    data={rowData}
                    caravanData={isPast ? pastCaravans : caravans}
                    isPast={isPast}
                  />
                )}
                actions={[
                  {
                    icon: tableIcons.Add,
                    tooltip: `Add ${title}`,
                    name: "add",
                    isFreeAction: true,
                    onClick: (event) =>
                      setState((st) => ({ ...st, mode: "create" })),
                  },
                  !isPast &&
                    state.mode === "list" && {
                      icon: () => <tableIcons.ApplyVisa color="primary" />,
                      tooltip: `Apply for visa`,
                      name: "apply",
                      onClick: (event, rowData) => {
                        if (isPast) return;
                        setApplyForVisaOpen(true);
                        setState((st) => ({ ...st, record: rowData }));
                      },
                    },
                  !isPast &&
                    state.mode === "list" && {
                      icon: () => <tableIcons.Delete />,
                      name: "delete",
                      tooltip: `Delete ${title}`,
                      onClick: (event, rowData) =>
                        setState((st) => ({
                          ...st,
                          mode: "delete",
                          record: rowData,
                        })),
                    },
                ]}
                components={{
                  Action: (props) => (
                    <div style={{ whiteSpace: "nowrap" }}>
                      {props.action.name === "apply" && (
                        <Button
                          onClick={(event) =>
                            props.action.onClick(event, props.data)
                          }
                          color="primary"
                          variant="contained"
                          style={{ textTransform: "none" }}
                          size="small"
                          endIcon={<SendOutlined />}
                        >
                          {t("apply-for-visa")}
                        </Button>
                      )}
                      {props.action.name === "delete" && (
                        <IconButton
                          onClick={(event) =>
                            props.action.onClick(event, props.data)
                          }
                          size="small"
                        >
                          <DeleteOutlined color="error" />
                        </IconButton>
                      )}
                      {props.action.name === "add" && (
                        <IconButton
                          onClick={(event) =>
                            props.action.onClick(event, props.data)
                          }
                          color="primary"
                          size="medium"
                        >
                          <AddCircleOutline />
                        </IconButton>
                      )}
                      {props.action.name === "merge" && (
                        <IconButton
                          onClick={(event) =>
                            props.action.onClick(event, props.data)
                          }
                          size="small"
                        >
                          <CallMergeIcon color="secondary" />
                        </IconButton>
                      )}
                    </div>
                  ),
                }}
                options={{
                  actionsColumnIndex: -1,
                  grouping: false,
                  pageSize: 20,
                  headerStyle: {
                    backgroundColor: "#f0f3f7",
                    color: "#385273",
                    fontSize: "1.1rem",
                    paddingLeft: "0px",
                    textTransform: "none",
                  },
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: `No ${title} to display, click + button above to add a ${title}`,
                  },
                }}
              />
            </>
          )}
        </div>
      </div>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <ApplyForVisa
        open={applyForVisaOpen}
        onClose={() => setApplyForVisaOpen(false)}
        caravan={state?.record?.name}
        passengers={caravans[state?.record?.name]}
      />
      <Dialog
        open={state.mode === "delete"}
        onClose={() =>
          setState((st) => ({
            ...st,
            mode: "list",
            record: {},
          }))
        }
      >
        <DialogTitle>are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You want to delete ${state.record.name} caravan? This is a permanent deletion and can not be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setState((st) => ({
                ...st,
                mode: "list",
                record: {},
              }))
            }
            variant="outlined"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleOnConfirmDelete()}
            style={{ backgroundColor: "#ef5350", color: "#fff" }}
            variant="contained"
            autoFocus
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmDeleteExpired}
        onClose={() => setShowConfirmDeleteExpired(false)}
      >
        <DialogTitle>are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${holdData?.expired?.length} passport expire before ${dayjs()
              .add(6, "month")
              .format(
                "dddd DD-MMMM-YYYY"
              )}. [less than six month from today ${dayjs().format(
              "dddd DD-MMMM-YYYY"
            )}]`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowConfirmDeleteExpired(false)}
            variant="outlined"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleOnConfirmDeleteExpired()}
            style={{ backgroundColor: "#ef5350", color: "#fff" }}
            variant="contained"
            autoFocus
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Dashboard;
