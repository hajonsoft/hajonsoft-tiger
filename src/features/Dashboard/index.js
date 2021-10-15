/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DetailsIcon from "@material-ui/icons/Details";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import GroupIcon from "@material-ui/icons/Group";
import LastPage from "@material-ui/icons/LastPage";
import NearMeIcon from "@material-ui/icons/NearMe";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import moment from "moment";
import pluralize from "pluralize";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppHeader from "../../shared/macaw/AppHeader";
import t from "../../shared/util/trans";
import ApplyForVisa from "./components/ApplyForVisa";
import CRUDForm from "./components/CRUDForm";
import PackageDetail from "./components/packageDetail";
import {
  deleteUpcomingCaravan,
  getUpcomingCaravans
} from "./redux/caravanSlice";

const tableIcons = {
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
};

const Dashboard = () => {
  const [applyForVisaOpen, setApplyForVisaOpen] = useState(false);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const caravans = useSelector((state) => state.caravan?.data);
  const loading = useSelector((state) => state.caravan.loading);
  const error = useSelector((state) => state.caravan.error);

  const [state, setState] = useState({ mode: "list", record: {} });
  const history = useHistory();
  const title = "Caravan";

  useEffect(() => {
    dispatch(getUpcomingCaravans());
    window.scrollTo(0, 0);
  }, []);

  const Title = () => {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <GroupIcon />
        </Grid>
        <Grid item>
          <Typography variant="h6">{pluralize(title)}</Typography>
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

  const handleOnTabChange = (e, value) => {
    setActiveTab(value);
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
              justify="center"
              alignItems="center"
              style={{ height: "100vh" }}
            >
              <Grid item>
                <CircularProgress size={60} />
                {`Loading ${pluralize(title)} ...`}
              </Grid>
            </Grid>
          )}
          {!loading && state.mode !== "list" && state.mode !== "delete" && (
            <CRUDForm
              mode={state.mode}
              record={state.record}
              title={title}
              onClose={() => {
                setState((st) => ({ ...st, mode: "list" }));
              }}
            />
          )}
          {!loading && state.mode === "list" && (
            <>
              <Tabs
                value={activeTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleOnTabChange}
              >
                <Tab label={t("upcoming")} style={{ textTransform: "none" }} />
                <Tab label={t("past")} style={{ textTransform: "none" }} />
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
                      <Button
                        href=""
                        color="primary"
                        onClick={() =>
                          history.push(`${rowData.name}/customers`)
                        }
                        style={{ textTransform: "none" }}
                      >
                        {rowData.name}{" "}
                      </Button>
                    ),
                  },
                  {
                    title: t("total"),
                    field: "total",
                  },
                ]}
                data={
                  caravans
                    ? Object.keys(caravans).map((v) => ({
                        name: v,
                        total: caravans[v].length,
                      }))
                    : []
                }
                detailPanel={(rowData) => (
                  <PackageDetail data={rowData} caravanData={caravans} />
                )}
                actions={[
                  {
                    icon: tableIcons.Add,
                    tooltip: `Add ${title}`,
                    isFreeAction: true,
                    onClick: (event) =>
                      setState((st) => ({ ...st, mode: "create" })),
                  },
                  {
                    icon: () => <tableIcons.ApplyVisa color="primary" />,
                    tooltip: `Apply for visa`,
                    onClick: (event, rowData) => {
                      setApplyForVisaOpen(true);
                      setState((st) => ({ ...st, record: rowData }));
                    },
                  },
                  {
                    icon: () => <tableIcons.Delete color="error" />,
                    tooltip: `Delete ${title}`,
                    onClick: (event, rowData) =>
                      setState((st) => ({
                        ...st,
                        mode: "delete",
                        record: rowData,
                      })),
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                  grouping: false,
                  exportButton: true,
                  pageSize: 20,
                  headerStyle: {
                    backgroundColor: "#f0f3f7",
                    color: "#385273",
                    fontSize: "1.1rem",
                    paddingLeft: "0px",
                  },
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: `No ${pluralize(
                      title
                    )} to display, click + button above to add a ${title}`,
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
            {`You want to delete ${state.record.name} caravan? This is a permenant deletion and can not be undone.`}
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
            color="error"
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
    </React.Fragment>
  );
};

export default Dashboard;
