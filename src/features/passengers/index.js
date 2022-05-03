import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Modal,
  Box,
  makeStyles,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import AddBox from "@material-ui/icons/AddBox";
import Checkbox from "@material-ui/core/Checkbox";
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
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import pluralize from "pluralize";
import _ from "lodash";
import React, { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AppHeader from "../../shared/macaw/AppHeader";
import Passenger from "./components/Passenger";
import CaravanSelectInput from "./components/CaravanSelectInput";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {
  deletePassenger,
  getUpcomingCaravans,
  movePassengers,
  updatePassenger,
} from "../Caravans/redux/caravanSlice";
import t from "../../shared/util/trans";
import dayjs from "dayjs";
import { isResult } from "../../redux/helpers";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: 0,
    right: 0,
    top: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: "1rem",
  },
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Checkbox: forwardRef((props, ref) => <Checkbox {...props} ref={ref} />),
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
  const classes = useStyles();

  const caravans = useSelector((state) => state.caravan?.data);
  const loading = useSelector((state) => state.caravan?.loading);
  const error = useSelector((state) => state.caravan?.error);
  const keyword = useSelector((state) => state.caravan?.keyword);
  const passengers = _.cloneDeep(caravans?.[packageName]);
  const [newCaravan, setNewCaravan] = useState("");

  const [state, setState] = useState({
    mode: "list",
    record: {},
    customerKey: 0,
  });
  const [passengersToMove, setPassengersToMove] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  const handleBack = () => {
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
            onClick={handleBack}
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
    dispatch(deletePassenger({ packageName, passenger }));
    setState((st) => ({ ...st, mode: "list", record: {} }));
  };

  const passengerList = () => {
    // apply filter
    return passengers.filter((passenger) => isResult(passenger, keyword));
  };

  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Box className={classes.paper}>
          <Typography className={classes.title}>
            {" "}
            Select Caravan to move passengers to{" "}
          </Typography>
          <Grid item xs={12}>
            <CaravanSelectInput
              onSelect={(newCaravanName) => {
                setNewCaravan(newCaravanName);
              }}
              customers={passengersToMove}
              caravan={packageName}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              style={{
                background: "rgb(227, 242, 253)",
                textTransform: "none",
                color: "#03a9f4",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
              onClick={() => {
                dispatch(
                  movePassengers({
                    newCaravan,
                    oldCaravan: packageName,
                    passengers: passengersToMove,
                  })
                );
                setPassengersToMove([]);
                setOpenModal(false);
              }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Modal>

      <div
        style={{
          backgroundColor: "snow",
        }}
      >
        <AppHeader />
        <div>
          {state.mode !== "list" && state.mode !== "delete" && (
            <Passenger
              mode={state.mode}
              record={state.record}
              title={title}
              onClose={() => {
                dispatch(getUpcomingCaravans());
                setState((st) => ({ ...st, mode: "list", record: {} }));
              }}
              onNext={bringNext}
            />
          )}
          {state.mode === "list" && (
            <MaterialTable
              icons={tableIcons}
              title={<Title />}
              columns={[
                { title: t("name"), field: "name" },
                {
                  title: t("phone"),
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
                { title: t("nationality"), field: "nationality" },
                {
                  title: t("birth-date"),
                  field: "birthDate",
                  render: (rowData) => {
                    if (
                      rowData.birthDate &&
                      !rowData.birthDate._isAMomentObject
                    ) {
                      return (
                        <Chip
                          avatar={
                            <Avatar>
                              {moment(rowData.birthDate).isValid() &&
                                moment().diff(rowData.birthDate, "years")}
                            </Avatar>
                          }
                          variant="outlined"
                          label={moment(rowData.birthDate).format(
                            "DD-MMM-yyyy"
                          )}
                        />
                      );
                    }
                    return <div>Invalid Date</div>;
                  },
                },
                {
                  title: t("expire-date"),
                  field: "Expire date",
                  render: (rowData) => {
                    if (
                      rowData.passExpireDt &&
                      !rowData.passExpireDt._isAMomentObject
                    ) {
                      return (
                        <Chip
                          avatar={
                            <Avatar>
                              {dayjs(rowData.passExpireDt).diff(
                                dayjs(),
                                "month"
                              ) <= 0 && (
                                <div
                                  style={{
                                    backgroundColor: "#e53935",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                ></div>
                              )}
                              {dayjs(rowData.passExpireDt).isValid() &&
                                dayjs(rowData.passExpireDt).diff(
                                  dayjs(),
                                  "month"
                                ) > 0 &&
                                dayjs(rowData.passExpireDt).diff(
                                  dayjs(),
                                  "month"
                                ) <= 6 && (
                                  <div
                                    style={{
                                      backgroundColor: "#d32f2f",
                                      width: "100%",
                                      height: "100%",
                                      color: "white",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    {dayjs(rowData.passExpireDt).diff(
                                      dayjs(),
                                      "month"
                                    )}
                                  </div>
                                )}
                              {dayjs(rowData.passExpireDt).diff(
                                dayjs(),
                                "month"
                              ) > 6 &&
                                dayjs(rowData.passExpireDt).diff(
                                  dayjs(),
                                  "month"
                                ) < 12 && (
                                  <div
                                    style={{
                                      backgroundColor: "#ffcdd2",
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    {dayjs(rowData.passExpireDt).diff(
                                      dayjs(),
                                      "month"
                                    )}
                                  </div>
                                )}
                              {dayjs(rowData.passExpireDt).diff(
                                dayjs(),
                                "month"
                              ) >= 12 && (
                                <div
                                  style={{
                                    backgroundColor: "white",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                ></div>
                              )}
                            </Avatar>
                          }
                          variant="outlined"
                          label={dayjs(rowData.passExpireDt).format(
                            "DD-MMM-YYYY"
                          )}
                        />
                      );
                    }

                    return <div>Invalid date</div>;
                  },
                },
              ]}
              components={{
                Toolbar: (props) => (
                  <div>
                    <MTableToolbar {...props} />
                    {passengersToMove.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          padding: ".5rem 1rem",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          disableElevation
                          onClick={() => {
                            setOpenModal(true);
                          }}
                        >
                          Move Passengers
                        </Button>
                      </div>
                    )}
                  </div>
                ),
              }}
              data={passengerList()}
              // detailPanel={(rowData) => (
              //   <CustomerDetail customer={rowData} caravan={packageName} />
              // )}
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
                    dispatch(
                      updatePassenger(`${packageName}/${rowData._fid}`, {
                        ...rowData,
                        favorite: !rowData.favorite,
                      })
                    );
                  },
                }),
                (rowData) => ({
                  icon: () => <tableIcons.Checkbox color="action" />,
                  tooltip: "Move passenger",
                  onClick: (event, rowData) => {
                    if (event.target.checked) {
                      setPassengersToMove((prev) => [...prev, rowData]);
                    } else {
                      setPassengersToMove((prev) => {
                        return prev.filter((p) => p._fid !== rowData._fid);
                      });
                    }
                  },
                }),
                (rowData) => ({
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
                }),
                (rowData) => ({
                  icon: () => (
                    <>
                      {!rowData.isDuplicate ? (
                        <tableIcons.Delete color="error" />
                      ) : (
                        <Chip
                          icon={<FileCopyIcon />}
                          label={rowData.duplicateCount}
                          color="secondary"
                        />
                      )}
                    </>
                  ),
                  tooltip: `Delete ${title}`,
                  onClick: (event, rowData) => {
                    if (Array.isArray(rowData)) {
                      return;
                    }
                    setState((st) => ({
                      ...st,
                      mode: "delete",
                      record: rowData,
                      // customerKey: travellers.map((s) => s.key)[rowData.tableData.id],
                    }));
                  },
                }),
              ]}
              options={{
                actionsColumnIndex: -1,
                search: false,
                grouping: true,
                exportAllData: true,
                pageSize: 50,
                pageSizeOptions: [10, 50, 100],
                initialPage: 0,
                exportFileName: packageName,
                exportButton: true,
                columnsButton: true,
                headerStyle: {
                  backgroundColor: "#f0f3f7",
                  color: "#385273",
                  fontSize: "1.1rem",
                  paddingLeft: "0px",
                },
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
        open={state.mode === "delete"}
        onClose={() =>
          setState((st) => ({
            ...st,
            mode: "list",
            record: {},
          }))
        }
      >
        <DialogTitle>{t("are-you-sure")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You want to delete ${state.record.name} from ${packageName}. This is a permanent deletion and can not be undone.`}
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
            Cancel
          </Button>
          <Button
            onClick={() => handleOnConfirmDelete(state.record)}
            style={{ backgroundColor: "#ef5350", color: "#fff" }}
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Passengers;
