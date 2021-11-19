import {
  Breadcrumbs, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
  Typography
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import HomeIcon from "@material-ui/icons/Home";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import moment from "moment";
import pluralize from "pluralize";
import _ from 'lodash';
import React, { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AppHeader from "../../shared/macaw/AppHeader";
import CRUDForm from "./components/CRUDForm";
import CustomerDetail from "./components/CustomerDetail";
import { deletePassenger, getUpcomingCaravans, updatePassenger } from "../Dashboard/redux/caravanSlice";
import t from '../../shared/util/trans';
import dayjs from "dayjs";

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
const Passengers = () => {
  let { packageName } = useParams();
  const dispatch = useDispatch();

  const caravans = useSelector(state => state.caravan?.data);
  const loading = useSelector(state => state.caravan?.loading);
  const error = useSelector(state => state.caravan?.error);
  const passengers = _.cloneDeep(caravans?.[packageName]);

  const [state, setState] = useState({
    mode: "list",
    record: {},
    customerKey: 0,
  });

  const title = "Passenger";
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

  const handleGoback = () => {
    history.goBack();
  };

  const handleWhatsappClick = (phone) => {
    if (!phone) return;
    let whatsappPhone = phone;
    if (phone.startsWith("00")) {
      whatsappPhone = phone.subString(2);
    }
    const url = `https://api.whatsapp.com/send?phone=+${encodeURIComponent(
      whatsappPhone.replace(/[^0-9]/g, "")
    )}`;
    window.open(url, "_blank");
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
          <Typography>{`${packageName} ${pluralize(title)}`}</Typography>
        </Breadcrumbs>
      </div>
    );
  };

  const bringNext = () => {
    let nextPassenger = passengers[0];
    if (state.record && state.record._fid) {
      for (let i = 0; i < passengers.length - 1; i++) {
        if (passengers[i]._fid === state.record._fid) {
          nextPassenger = passengers[packageName][i + 1];
        }
      }
    }
    setState((st) => ({ ...st, mode: "update", record: nextPassenger }));
  };

  const handleOnConfirmDelete = (passenger) => {
    dispatch(deletePassenger({ packageName, passenger }))
    setState((st) => ({ ...st, mode: "list", record: {} }))
  }

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "snow",
        }}
      >
        <AppHeader />
        <div>
          {state.mode !== "list" && state.mode !== "delete" && (
            <CRUDForm
              mode={state.mode}
              record={state.record}
              title={title}
              onClose={() => {
                dispatch(getUpcomingCaravans())
                setState((st) => ({ ...st, mode: "list", record: {} }))
              }
              }
              onNext={bringNext}
            />
          )}
          {state.mode === "list" && (
            <MaterialTable
              icons={tableIcons}
              title={<Title />}
              columns={[
                { title: t('name'), field: "name" },
                {
                  title: t('phone'),
                  field: "phone",
                  render: (rowData) =>
                    rowData.phone && (
                      <Grid container>
                        <Grid item>
                          <WhatsAppIcon
                            onClick={() => handleWhatsappClick(rowData.phone)}
                          />
                        </Grid>
                        <Grid item>{rowData.phone}</Grid>
                      </Grid>
                    ),
                },
                { title: t('nationality'), field: "nationality" },
                {
                  title: t('birth-date'),
                  field: "birthDate",
                  render: (rowData) =>
                    rowData.birthDate && (
                      <Chip
                        avatar={
                          <Avatar>
                            {moment(rowData.birthDate).isValid() && moment().diff(rowData.birthDate, "years")}
                          </Avatar>
                        }
                        variant="outlined"
                        label={moment(rowData.birthDate).format("DD-MMM-yyyy")}
                      />
                    ),
                },
                {
                  title: t('expire-date'),
                  field: "Expire date",
                  render: (rowData) =>
                    rowData.passExpireDt && (
                      <Chip
                        avatar={
                          <Avatar>
                            {
                              dayjs(rowData.passExpireDt).diff(dayjs(), "month") <= 0 && <div style={{ backgroundColor: '#d32f2f', width: '100%', height: '100%' }}></div>
                            }
                            {dayjs(rowData.passExpireDt).isValid() && dayjs(rowData.passExpireDt).diff(dayjs(), "month") > 0 && dayjs(rowData.passExpireDt).diff(dayjs(), "month") <= 6 &&
                              <div style={{ backgroundColor: '#d32f2f', width: '100%', height: '100%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{dayjs(rowData.passExpireDt).diff(dayjs(), "month")}</div>
                            }
                            {
                              dayjs(rowData.passExpireDt).diff(dayjs(), "month") > 6 && dayjs(rowData.passExpireDt).diff(dayjs(), "month") < 12 && <div style={{ backgroundColor: 'grey', width: '100%', height: '100%' }}>{dayjs(rowData.passExpireDt).diff(dayjs(), "month")}</div>
                            }
                                                        {
                              dayjs(rowData.passExpireDt).diff(dayjs(), "month") >= 12 && <div style={{ backgroundColor: 'white', width: '100%', height: '100%' }}></div>
                            }
                          </Avatar>
                        }
                        variant="outlined"
                        label={dayjs(rowData.passExpireDt).format("DD-MMM-YYYY")}
                      />
                    ),
                }
              ]}

              data={passengers}
              detailPanel={(rowData) => <CustomerDetail customer={rowData} />}
              actions={[
                {
                  icon: tableIcons.Add,
                  tooltip: `Add ${title}`,
                  isFreeAction: true,
                  onClick: (event) =>
                    setState((st) => ({ ...st, mode: "create" })),
                },
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
                      return;
                    }
                    dispatch(updatePassenger(`${packageName}/${rowData._fid}`, { ...rowData, favorite: !rowData.favorite }))
                  },
                }),
                {
                  icon: () => <tableIcons.Edit color="action" />,
                  tooltip: `Edit ${title}`,
                  onClick: (event, rowData) => {
                    if (Array.isArray(rowData)) {
                      return;
                    }
                    setState((st) => ({
                      ...st,
                      mode: "update",
                      record: rowData,
                      // customerKey: travellers.map((s) => s.key)[rowData.tableData.id],
                    }));
                  },
                },
                {
                  icon: () => <tableIcons.Delete color="error" />,
                  tooltip: `Delete ${title}`,
                  onClick: (event, rowData) => {
                    if (Array.isArray(rowData)) {
                      return; //TODO process multiple selection deletes
                    }
                    setState((st) => ({
                      ...st,
                      mode: "delete",
                      record: rowData,
                      // customerKey: travellers.map((s) => s.key)[rowData.tableData.id],
                    }));
                  },
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                grouping: true,
                exportAllData: true,
                pageSize: 50,
                pageSizeOptions: [10, 50, 100],
                initialPage: 0,
                exportFileName: packageName,
                exportButton: true,
                columnsButton: true,
                searchAutoFocus: true,
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

      <Dialog
        open={state.mode === 'delete'}
        onClose={() => setState((st) => ({
          ...st,
          mode: "list",
          record: {},
        }))}
      >
        <DialogTitle >{t('are-you-sure')}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            {`You want to delete ${state.record.name}. This is a permenant deletion and can not be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState((st) => ({
            ...st,
            mode: "list",
            record: {},
          }))} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleOnConfirmDelete(state.record)} style={{ backgroundColor: "#ef5350", color: "#fff" }} variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
};

export default Passengers;
