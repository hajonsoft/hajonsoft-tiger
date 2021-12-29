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
import React, { useState } from "react";
import firebase from "../../../firebaseapp";
import { eventsNearby, todayHijraDate } from "../../../shared/util/hijri";
import Gender from "./CustomerGender";
import InputControl from "../../Reservation/components/InputControl";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "90%",
    margin: "25px auto",
  },
  cardTitle: {
    textAlign: "left",
    fontSize: "2em",
    background: "white",
    borderBottom: "1px solid #ccc",
    marginBottom: "2rem",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "white",
    borderTop: "1px solid #ccc",
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
                  justifyContent="space-between"
                  alignItems="center"
                  alignContent="center"
                >
                  <Grid item xs={12}>
                    <InputControl
                      name="name"
                      label="Title"
                      required
                      value={values.name}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="headline"
                      label="Subheader"
                      required
                      value={values.headline}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Gender
                    value={values.gender}
                    name="gender"
                    label="Nature"
                    mode={mode}
                    xsWidth={6}
                    onChange={(e) => handleTripTypeChange(e)}
                  />
                  <Grid item xs={12}>
                    <InputControl
                      multiline
                      name="description"
                      label="Detail"
                      value={values.description || defaultDescription}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Card>
                      <CardHeader title="Flight" />
                      <CardContent>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item xs={12} md={6}>
                            <InputControl
                              label="Departure airport or city"
                              value={values.departureAirport || ""}
                              name="departureAirport"
                              required={false}
                              error={
                                touched.departureAirport &&
                                Boolean(errors.departureAirport)
                              }
                              helperText={
                                touched.departureAirport &&
                                errors.departureAirport
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputControl
                              required={false}
                              error={
                                touched.departureFlight &&
                                Boolean(errors.departureFlight)
                              }
                              helperText={
                                touched.departureFlight &&
                                errors.departureFlight
                              }
                              value={values.departureFlight || ""}
                              name="departureFlight"
                              label="Departure flight or airline"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputControl
                              required={false}
                              error={
                                touched.departureDate &&
                                Boolean(errors.departureDate)
                              }
                              helperText={
                                touched.departureDate && errors.departureDate
                              }
                              value={values.departureDate || ""}
                              name="departureDate"
                              label="Departure Date"
                              type="date"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputControl
                              required={false}
                              error={
                                touched.arrivalAirport &&
                                Boolean(errors.arrivalAirport)
                              }
                              helperText={
                                touched.arrivalAirport && errors.arrivalAirport
                              }
                              value={values.arrivalAirport || ""}
                              name="arrivalAirport"
                              label="Arrival airport or city"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputControl
                              required={false}
                              error={
                                touched.returnAirport &&
                                Boolean(errors.returnAirport)
                              }
                              helperText={
                                touched.returnAirport && errors.returnAirport
                              }
                              value={values.returnAirport || ""}
                              name="returnAirport"
                              label="Rebound airport or city"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputControl
                              required={false}
                              error={
                                touched.returnFlight &&
                                Boolean(errors.returnFlight)
                              }
                              helperText={
                                touched.returnFlight && errors.returnFlight
                              }
                              value={values.returnFlight || ""}
                              name="returnFlight"
                              label="Rebound flight or airline"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputControl
                              required={false}
                              error={
                                touched.returnDate && Boolean(errors.returnDate)
                              }
                              helperText={
                                touched.returnDate && errors.returnDate
                              }
                              value={values.returnDate || ""}
                              name="returnDate"
                              label="Rebound date"
                              type="date"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputControl
                              required={false}
                              error={
                                touched.flightNotes &&
                                Boolean(errors.flightNotes)
                              }
                              helperText={
                                touched.flightNotes && errors.flightNotes
                              }
                              value={values.flightNotes || ""}
                              name="flightNotes"
                              label="Flight Notes"
                              multiline
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={4}>
                      <Card>
                        <CardHeader title="Prices"></CardHeader>
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <InputControl
                                required={false}
                                error={
                                  touched.quadPrice && Boolean(errors.quadPrice)
                                }
                                helperText={
                                  touched.quadPrice && errors.quadPrice
                                }
                                value={values.quadPrice || ""}
                                name="quadPrice"
                                label="Quad Price"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <InputControl
                                required={false}
                                error={
                                  touched.triplePrice &&
                                  Boolean(errors.triplePrice)
                                }
                                helperText={
                                  touched.triplePrice && errors.triplePrice
                                }
                                value={values.triplePrice || ""}
                                name="triplePrice"
                                label="Tripple Price"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <InputControl
                                required={false}
                                error={
                                  touched.doublePrice &&
                                  Boolean(errors.doublePrice)
                                }
                                helperText={
                                  touched.doublePrice && errors.doublePrice
                                }
                                value={values.doublePrice || ""}
                                name="doublePrice"
                                label="Double Price"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <InputControl
                                required={false}
                                error={touched.fees && Boolean(errors.fees)}
                                helperText={touched.fees && errors.fees}
                                value={values.fees || ""}
                                name="fees"
                                label="Fees not included"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <InputControl
                                required={false}
                                error={
                                  touched.paymentLink &&
                                  Boolean(errors.paymentLink)
                                }
                                helperText={
                                  touched.paymentLink && errors.paymentLink
                                }
                                value={values.paymentLink || ""}
                                name="paymentLink"
                                label="Payment Link"
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid
                      item
                      xs={8}
                      container
                      spacing={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item md={12}>
                        <Card>
                          <CardHeader title="Accommodation"></CardHeader>
                          <CardContent>
                            <Grid container xs={12} spacing={3}>
                              <Grid item xs={12}>
                                <InputControl
                                  required={false}
                                  error={
                                    touched.arrivalHotel &&
                                    Boolean(errors.arrivalHotel)
                                  }
                                  helperText={
                                    touched.arrivalHotel && errors.arrivalHotel
                                  }
                                  value={values.arrivalHotel || ""}
                                  name="arrivalHotel"
                                  label="Arrival hotel details [First stay]"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <InputControl
                                  required={false}
                                  error={
                                    touched.checkoutDate &&
                                    Boolean(errors.checkoutDate)
                                  }
                                  helperText={
                                    touched.checkoutDate && errors.checkoutDate
                                  }
                                  value={values.checkoutDate || ""}
                                  name="checkoutDate"
                                  label="Checkout Date"
                                  type="date"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <InputControl
                                  required={false}
                                  error={
                                    touched.departureHotel &&
                                    Boolean(errors.departureHotel)
                                  }
                                  helperText={
                                    touched.departureHotel &&
                                    errors.departureHotel
                                  }
                                  value={values.departureHotel || ""}
                                  name="departureHotel"
                                  label="Rebound hotel details [Second stay]"
                                />
                              </Grid>
                            </Grid>
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
                          variant="outlined"
                          color="default"
                          onClick={onClose}
                          startIcon={<CancelOutlinedIcon color="error" />}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      {mode === "create" && (
                        <Grid item>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="outlined"
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
                            variant="outlined"
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
                            variant="outlined"
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
