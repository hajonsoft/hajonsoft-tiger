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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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
import moment from 'moment';
import pluralize from "pluralize";
import React, { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePassenger } from "../Caravans/redux/caravanSlice";
import AppHeader from "../../shared/macaw/AppHeader";
import CRUDForm from "./components/CRUDForm";
import CustomerDetail from "./components/CustomerDetail";

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
  Favorite: forwardRef((props, ref) => <FavoriteIcon {...props} ref={ref} />),
  NoFavorite: forwardRef((props, ref) => (
    <FavoriteBorderIcon {...props} ref={ref} />
  )),
};
const Favorite = () => {

  const passengers = useSelector(state => state.customer.data);
  const loading = useSelector(state => state.customer.loading);
  const error = useSelector(state => state.customer.error);
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    mode: "list",
    record: {},
    customerKey: 0,
  });
  const title = "Traveller";
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
        <CircularProgress size={40} />
      </div>
    );
  }

  const handleBack = () => {
    history.goBack();
  };

  const Title = () => {
    return (
      <div style={{ width: "500px" }}>
        <Breadcrumbs>
          <Link
            color="inherit"
            href="#"
            onClick={handleBack}
            style={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon />
            <Typography>Home</Typography>
          </Link>
          <Typography>{`Favorite ${pluralize(title)}`}</Typography>
        </Breadcrumbs>
      </div>
    );
  };
  const favoriteData = () => {
    const keys = Object.keys(passengers);
    let output = [];
    keys.forEach((k) => {
      const values = passengers[k].filter((x) => x.favorite);
      values.forEach((v) => (v._groupName = k));
      output = output.concat(values);
    });

    return output;
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
            <CRUDForm
              mode={state.mode}
              record={state.record}
              title={title}
              onClose={() =>
                setstate((st) => ({ ...st, mode: "list", record: {} }))
              }
            />
          )}
          {state.mode === "list" && (
            <MaterialTable
              icons={tableIcons}
              title={<Title />}
              columns={[
                { title: "Name", field: "name" },
                { title: "Gender", field: "gender" },
                { title: "Nationality", field: "nationality" },
                { title: "Pass #", field: "passportNumber" },
                {
                  title: "Birth Date",
                  field: "birthDate",
                  render: (rowData) =>
                    `${moment(rowData.birthDate).format(
                      "DD-MMM-yyyy"
                    )} [${moment().diff(rowData.birthDate, "years")}]`,
                },
                { title: "Email", field: "email" },
              ]}
              data={favoriteData()}
              detailPanel={(rowData) => (
                <CustomerDetail
                  customer={rowData}
                  customerKey={
                    passengers.map((s) => s.key)[rowData.tableData.id]
                  }
                />
              )}
              actions={[
                (rowData) => ({
                  icon: () =>
                    rowData.favorite ? (
                      <tableIcons.Favorite color="action" />
                    ) : (
                      <tableIcons.NoFavorite color="action" />
                    ),
                  tooltip: rowData.favorite
                    ? `un-favor ${title}`
                    : `favor ${title}`,
                  onClick: (event, rowData) => {
                    if (Array.isArray(rowData)) {
                      return; //TODO process multiple selection edits
                    }
                    dispatch(updatePassenger(`${rowData._groupName}/${rowData._fid}`, { ...rowData, favorite: !rowData.favorite },))
                  },
                }),
                {
                  icon: () => <tableIcons.Edit color="action" />,
                  tooltip: `Edit ${title}`,
                  onClick: (event, rowData) => {
                    if (Array.isArray(rowData)) {
                      return; //TODO process multiple selection edits
                    }
                    setstate((st) => ({
                      ...st,
                      mode: "update",
                      record: rowData,
                      // customerKey: travellers.map((s) => s.key)[rowData.tableData.id],
                    }));
                  },
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                grouping: true,
                pageSize: 20,
                exportButton: true,
                headerStyle: { backgroundColor: "#f0f3f7", color: "#385273", fontSize: "1.1rem", paddingLeft: "0px" }
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `No ${title} to display, click + button above to add a new ${title}`,
                },
              }}
            />
          )}
        </div>
      </div>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Favorite;
