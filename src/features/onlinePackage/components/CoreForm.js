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
import moment from 'moment';
import React from "react";
import firebase from "../../../firebaseapp";
import CoreTextField from "./CoreTextField";
import PackageDetail from './PackageDetail';
import CoreDateField from './CoreDateField';

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

const CoreForm = ({ mode, record, customerKey, title, onClose }) => {
  const classes = useStyles();
  // const handleImageChange = ()=> {
  //     // TODO: when image changes store it to the database using the record key and its field name
  // }
  const handleSubmitForm = async (values, actions, callback = onClose) => {
    delete values["image"];
    switch (mode) {
      case "create":
        const customerRef = firebase.database().ref(`onlinePackage`);
        customerRef.push(values);
        break;
      case "update":
        const updateRef = firebase.database().ref(`onlinePackage`);
        delete values.tableData;
        updateRef.child(customerKey).update(values);
        break;

      case "delete":
        const removeRef = firebase.database().ref(`onlinePackage`);
        removeRef.child(customerKey).remove();
        break;

      default:
        console.log("unknown mode");
    }
    onClose();
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
                  subheader={customerKey}
                  action={<CancelOutlinedIcon color="secondary" onClick={onClose} />}
                />
                <CardContent>
                  <Grid container spacing={2} justify="space-between" alignItems="center">
                    <CoreTextField
                      value={values.name}
                      name="name"
                      label="Name"
                      mode={mode}
                      xsWidth={9}
                    />
                    <CoreTextField
                      value={values.headline}
                      name="headline"
                      label="Headline"
                      mode={mode}
                      xsWidth={3}
                    />
                    <PackageDetail mode={mode} value={values.description} />
                    <CoreTextField value={values.departureAirport || ""} name="departureAirport" mode={mode} xsWidth={3} />
                    <CoreTextField value={values.departureFlight || ""} name="departureFlight" mode={mode} xsWidth={3} />
                    <CoreDateField  setFieldValue={setFieldValue} value={values.departureDate || ""} name="departureDate" mode={mode} xsWidth={3} />
                    <CoreTextField value={values.arrivalAirport || ""} name="arrivalAirport" mode={mode} xsWidth={3} />
                    <Grid item xs={12} container spacing={2} justify="space-between" alignItems="center">
                      <Grid item xs={3}>
                        <CoreTextField value={values.quadPrice || ""} name="quadPrice" mode={mode} xsWidth={12} />
                        <CoreTextField value={values.triplePrice || ""} name="triplePrice" mode={mode} xsWidth={12} />
                        <CoreTextField value={values.doublePrice || ""} name="doublePrice" mode={mode} xsWidth={12} />

                      </Grid>

                      <Grid item xs={9} container spacing={2} justify="space-between" alignItems="center">
                        <CoreTextField value={values.arrivalHotel} name="arrivalHotel" mode={mode} xsWidth={9} />
                        <CoreDateField  setFieldValue={setFieldValue}  value={values.checkoutDate} name="checkoutDate" mode={mode} xsWidth={3} />
                        <CoreTextField value={values.departureHotel} name="departureHotel" mode={mode} xsWidth={9} />
                        <CoreDateField  setFieldValue={setFieldValue}  value={values.returnDate} name="returnDate" mode={mode} xsWidth={3} />
                        <CoreTextField value={values.returnFlight} name="returnFlight" mode={mode} xsWidth={9} />
                        <CoreTextField value={values.returnAirport} name="returnAirport" mode={mode} xsWidth={3} />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.actionsContainer}>
                  <Grid container spacing={2}>
                    {mode !== "create" &&
                      <Grid container item xs>
                        <Typography variant="body2" color="textSecondary">{`Created: ${moment(values.createDt).format('LLLL')} ${moment(values.createDt).fromNow()}`}</Typography>
                      </Grid>
                    }
                    <Grid item spacing={2}>
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
