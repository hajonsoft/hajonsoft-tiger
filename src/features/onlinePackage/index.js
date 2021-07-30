import { Breadcrumbs, CircularProgress, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
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
import HomeIcon from "@material-ui/icons/Home";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import moment from "moment";
import pluralize from "pluralize";
import React, { forwardRef, useState } from "react";
import { useList } from "react-firebase-hooks/database";
import { useHistory } from "react-router-dom";
import firebase from "../../firebaseapp";
import AppHeader from "../shared/components/AppHeader/AppHeader";
import CoreForm from "./components/CoreForm";
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
};
const OnlinePackage = () => {
  // const mobileMedia = useMediaQuery((theme) =>
  //   theme.breakpoints.down("sm")
  // );

  const [snapshots, loading, error] = useList(
    firebase.database().ref("protected/onlinePackage")
  );

  const [state, setState] = useState({
    mode: "list",
    record: { gender: "umrah" },
    customerKey: 0,
  });
  const title = "online advertisement";
  const history = useHistory();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={40} />{" "}
      </div>
    );
  }

  const handleGoback = () => {
    history.goBack();
  };

  const Title = () => {
    return (
      <div style={{ width: "500px" }}>
        <Breadcrumbs>
          <Link
            color="inherit"
            href="#"
            onClick={handleGoback}
            style={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon />
            <Typography>Home</Typography>
          </Link>
          <Typography>{`${pluralize(title)}`}</Typography>
        </Breadcrumbs>
      </div>
    );
  };
  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "snow",
        }}
      >
        <AppHeader />
        <div>
          {state.mode !== "list" && (
            <CoreForm
              mode={state.mode}
              record={state.record}
              title={title}
              customerKey={state.customerKey}
              onClose={() =>
                setState((st) => ({
                  ...st,
                  mode: "list",
                  record: {},
                  customerKey: 0,
                }))
              }
            />
          )}

          {state.mode === "list" && (
            <MaterialTable
              icons={tableIcons}
              title={<Title />}
              columns={[
                { title: "Title", field: "name" },
                { title: "Headline", field: "headline" },
                { title: "From", field: "departureAirport" },
                { title: "To", field: "arrivalAirport" },
                {
                  title: "Description",
                  field: "description",
                  width: "35%",
                  headerStyle: {
                    textAlign: "center"
                  },
                  cellStyle: {
                    textAlign: "left",
                  },
                },
                {
                  title: "Departure",
                  field: "departureDate",
                  render: (rowData) =>
                    `${moment(rowData.departureDate).format(
                      "DD-MMM-yyyy"
                    )} [${moment().diff(rowData.departureDate, "days")}]`,
                },
                {
                  title: "Checkout",
                  field: "checkoutDate",
                  render: (rowData) =>
                    `${moment(rowData.checkoutDate).format(
                      "DD-MMM-yyyy"
                    )} [${moment().diff(rowData.checkoutDate, "days")}]`,
                },
                {
                  title: "Return",
                  field: "returnDate",
                  render: (rowData) =>
                    `${moment(rowData.returnDate).format(
                      "DD-MMM-yyyy"
                    )} [${moment().diff(rowData.returnDate, "days")}]`,
                },
              ]}
              data={snapshots && snapshots.map((s) => s.val())}
              // detailPanel={(rowData) => (
              //   <CustomerDetail
              //     customer={rowData}
              //     customerKey={snapshots.map((s) => s.key)[rowData.tableData.id]}
              //   />
              // )}
              actions={[
                {
                  icon: tableIcons.Add,
                  tooltip: `Add ${title}`,
                  isFreeAction: true,
                  onClick: (event) =>
                    setState((st) => ({ ...st, mode: "create" })),
                },
                {
                  icon: () => <tableIcons.Edit color="action" />,
                  tooltip: `Edit ${title}`,
                  onClick: (event, rowData) =>
                    setState((st) => ({
                      ...st,
                      mode: "update",
                      record: rowData,
                      customerKey: snapshots.map((s) => s.key)[
                        rowData.tableData.id
                      ],
                    })),
                },
                {
                  icon: () => <tableIcons.Delete color="error" />,
                  tooltip: `Delete ${title}`,
                  onClick: (event, rowData) =>
                    setState((st) => ({
                      ...st,
                      mode: "delete",
                      record: rowData,
                      customerKey: snapshots.map((s) => s.key)[
                        rowData.tableData.id
                      ],
                    })),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                grouping: true,
                pageSize: 10,
                exportButton: true,
                headerStyle: {
                  backgroundColor: "#f0f3f7",
                  color: "#385273",
                  fontSize: "1.1rem",
                  paddingLeft: "0px",
                },
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `No ${title} to display, click + button above to add a new one`,
                },
              }}
            />
          )}
        </div>
      </div>
      <Snackbar open={error} autoHideDuration={6000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default OnlinePackage;
