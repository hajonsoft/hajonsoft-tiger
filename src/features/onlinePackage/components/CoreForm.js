import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { Form, Formik } from "formik";
import _ from "lodash";
import moment from "moment";
import { todayHijraDate, eventsNearby } from "../../../util/hijri";
import React, { useState } from "react";
import firebase from "../../../firebaseapp";
import Gender from "./CustomerGender";
import CoreDateField from "./CoreDateField";
import CoreTextField from "./CoreTextField";
import PackageDetail from "./PackageDetail";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "90%",
    margin: "25px auto",
  },
  cardTitle: {
    textAlign: "left",
    fontSize: "2em",
    backgroundColor: "silver",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "silver",
  },
  actionsContainerTopMain: {
    width: "50%",
    padding: "10px",
  },
  actionsContainerTopButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const DEFAULT_DESCRIPTION = `Spiritual experience led by an amazing group of scholars designed to provide the best in customer service, hospitality and comfort. Commemorate the legacy of Islam with uplifting lectures and tours of historical sites. We are dedicated to help you have a great experience with personalized services and peace of mind.`;

const CoreForm = ({ mode, record, customerKey, title, onClose }) => {
  const classes = useStyles();
  const handleSubmitForm = async (values, actions, callback = onClose) => {
    delete values["image"];
    switch (mode) {
      case "create":
        const customerRef = firebase.database().ref(`protected/onlinePackage`);
        customerRef.push(values);
        break;
      case "update":
        const updateRef = firebase.database().ref(`protected/onlinePackage`);
        delete values.tableData;
        updateRef.child(customerKey).update(values);
        break;

      case "delete":
        const removeRef = firebase.database().ref(`protected/onlinePackage`);
        removeRef.child(customerKey).remove();
        break;

      default:
        console.log("unknown mode");
    }
    onClose();
  };
  const [defaultDescription, setDefaultDescription] = useState(
    DEFAULT_DESCRIPTION
  );

  const handleTripTypeChange = (selectedType) => {
    if (selectedType === "tour") {
      setDefaultDescription("");
    }
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={mode === "create" ? {} : record}
        onSubmit={handleSubmitForm}
      >
        {({
          setFieldValue,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <Card raised className={classes.formContainer}>
              <CardHeader
                className={classes.cardTitle}
                title={_.startCase(mode + " " + title)}
                subheader={`${todayHijraDate()} : ${eventsNearby(
                  values.departureDate
                )}`}
                action={
                  <CancelOutlinedIcon color="secondary" onClick={onClose} />
                }
              />
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  justify="space-between"
                  alignItems="center"
                  alignContent="center"
                >
                  <CoreTextField
                    value={values.name}
                    name="name"
                    label="Title"
                    mode={mode}
                    required={true}
                    xsWidth={3}
                  />
                  <CoreTextField
                    value={values.headline}
                    name="headline"
                    label="Subheader"
                    mode={mode}
                    xsWidth={3}
                  />
                  <Gender
                    value={values.gender}
                    name="gender"
                    label="Nature"
                    mode={mode}
                    xsWidth={6}
                    onChange={(e) => handleTripTypeChange(e)}
                  />
                  <PackageDetail
                    mode={mode}
                    value={values.description || defaultDescription}
                  />
                  <Grid item md={12}>
                    <Card>
                      <CardHeader title="Flight" />
                      <CardContent>
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <CoreTextField
                            value={values.departureAirport || ""}
                            name="departureAirport"
                            mode={mode}
                            xsWidth={2}
                            label="Departure airport or city"
                          />
                          <CoreTextField
                            value={values.departureFlight || ""}
                            name="departureFlight"
                            mode={mode}
                            xsWidth={2}
                            label="Departure flight or airline"
                          />
                          <CoreDateField
                            setFieldValue={setFieldValue}
                            value={values.departureDate}
                            name="departureDate"
                            onChange={(departureMoment) => {
                              const departeMomentClone = moment(departureMoment);
                              setFieldValue(
                                "returnDate",
                                departureMoment.add(20, "days").format()
                              );
                              setFieldValue(
                                "checkoutDate",
                                departeMomentClone
                                  .add(5, "days")
                                  .format()
                              );
                            }}
                            mode={mode}
                            xsWidth={2}
                          />
                          <CoreTextField
                            value={values.arrivalAirport || ""}
                            name="arrivalAirport"
                            mode={mode}
                            xsWidth={2}
                            label="Arrival airport or city"
                          />

                          <CoreTextField
                            value={values.returnAirport}
                            name="returnAirport"
                            mode={mode}
                            xsWidth={2}
                            label="Rebound airport or city"
                          />
                          <CoreTextField
                            value={values.returnFlight}
                            name="returnFlight"
                            mode={mode}
                            xsWidth={2}
                            label="Rebound flight or airline"
                          />
                          <CoreDateField
                            setFieldValue={setFieldValue}
                            value={values.returnDate}
                            name="returnDate"
                            mode={mode}
                            onChange={() => {}}
                            xsWidth={2}
                            label="Rebound date"
                          />
                          <CoreTextField
                            value={values.flightNotes}
                            name="flightNotes"
                            mode={mode}
                            xsWidth={10}
                          />
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={2}
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Card>
                        <CardHeader title="Prices"></CardHeader>
                        <CardContent>
                          <CoreTextField
                            value={values.quadPrice || ""}
                            name="quadPrice"
                            mode={mode}
                            xsWidth={12}
                          />
                          <CoreTextField
                            value={values.triplePrice || ""}
                            name="triplePrice"
                            mode={mode}
                            xsWidth={12}
                          />
                          <CoreTextField
                            value={values.doublePrice || ""}
                            name="doublePrice"
                            mode={mode}
                            xsWidth={12}
                          />
                          <CoreTextField
                            value={values.fees || ""}
                            name="fees"
                            label="Fees not included"
                            mode={mode}
                            xsWidth={12}
                          />
                          <CoreTextField
                            value={values.paymentLink || ""}
                            name="paymentLink"
                            mode={mode}
                            xsWidth={12}
                          />
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid
                      item
                      xs={9}
                      container
                      spacing={2}
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item md={12}>
                        <Card>
                          <CardHeader title="Accommodation"></CardHeader>
                          <CardContent>
                            <CoreTextField
                              value={values.arrivalHotel}
                              name="arrivalHotel"
                              label="Arrival hotel details [First stay]"
                              mode={mode}
                              xsWidth={12}
                            />
                            <CoreDateField
                              setFieldValue={setFieldValue}
                              value={values.checkoutDate}
                              name="checkoutDate"
                              onChange={() => {}}
                              mode={mode}
                              xsWidth={3}
                            />
                            <CoreTextField
                              value={values.departureHotel}
                              name="departureHotel"
                              label="Rebound hotel details [Second stay]"
                              mode={mode}
                              xsWidth={12}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.actionsContainer}>
                <Grid container spacing={2}>
                  {mode !== "create" && (
                    <Grid container item xs>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >{`Created: ${moment(values.createDt).format(
                        "LLLL"
                      )} ${moment(values.createDt).fromNow()}`}</Typography>
                    </Grid>
                  )}
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Button
                          type="button"
                          disabled={isSubmitting}
                          variant="contained"
                          color="secondary"
                          onClick={onClose}
                          startIcon={<CancelOutlinedIcon />}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      {mode === "create" && (
                        <Grid item>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            startIcon={<AddOutlinedIcon />}
                          >
                            Create
                          </Button>
                        </Grid>
                      )}
                      {mode === "delete" && (
                        <Grid item>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteOutlinedIcon />}
                          >
                            Delete
                          </Button>
                        </Grid>
                      )}
                      {mode === "update" && (
                        <Grid item>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            startIcon={<SaveOutlinedIcon />}
                          >
                            Save
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CoreForm;
