import { Button, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import clsx from "classnames";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import firebase from "../../../firebaseapp";
import trans from "../../../shared/util/trans";
import InputControl from "./InputControl";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    color: "#385273",
    padding: 15,
    backgroundColor: "white",
  },
  submitBtn: {
    background: "#178CF9",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    textTransform: "capitalize",
    color: "white",
  },
  mainContainer: {
    marginTop: 10,
    padding: 10,
  },
  container: {
    maxWidth: 1000,
    overflowY: "auto",
    padding: "0px 2rem",
  },
  p5: {
    padding: 5,
  },
  pt3rem: {
    paddingTop: "1.5rem",
  },
  pb0: {
    padding: 0,
  },
  pt1rem: {
    paddingTop: "1rem",
  },
}));

const validationSchema = yup.object({
  name: yup
    .string("Enter your full Name")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "Please enter your full name.")
    .required("Full name is required (as it appears on passport) "),
  phone: yup
    .string("Enter your phone number")
    .required("Phone number is required"),
  email: yup.string("Enter your email address").email("Enter a valid email"),
  departureCity: yup
    .string("Enter your departure city")
    .required("Departure city is required"),
  departureDate: yup
    .string("Enter your departure date")
    .required("Departure date is required"),
  pax: yup
    .number("Enter your number of companions")
    .required("Number of companions is required"),
});

const BasicReservation = ( { openSuccessModal, isModalOpen } ) => {
  const classes = useStyles();
  const { packageName } = useParams();
  const [reservationNumber, setReservationNumber] = useState("");

  const handleSubmitForm = async (values, actions) => {
    const reservationRef = firebase.database().ref(`customer/online`);
    const pushResult = reservationRef.push({ ...values, packageName });
    setReservationNumber(pushResult.key);
    openSuccessModal()
  };

  return (
    <div>
      <Paper style={{ margin: "0.5rem" }}>
        <Grid
          container
          alignItems="center"
          spacing={1}
          justify="center"
          className={classes.titleContainer}
        >
          <Grid item>
            <ExploreIcon fontSize="medium" />
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {trans("reservation.quick-reservation")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{`${packageName}`}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {!reservationNumber && (
        <Grid
          container
          style={{ backgroundColor: "white", minHeight: "100vh" }}
        >
          <Grid className={classes.container}>
            <Grid
              item
              direction="row"
              xs={12}
              className={classes.mainContainer}
            >
              <Grid container direction="row">
                <Grid item className={classes.p5} xs={12} container>
                  <Grid direction="column" container>
                    <Grid container direction="row"></Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, isSubmitting, isValid }) => {
                  return (
                    <Form className={classes.pt3rem}>
                      <Grid
                        container
                        spacing={3}
                        className={clsx(classes.container, classes.pb0)}
                      >
                        <Grid item xs={12}>
                          <InputControl
                            name="name"
                            label={trans("reservation.full-name")}
                            required
                            value={values.name}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputControl
                            name="phone"
                            label={trans("reservation.telephone")}
                            value={values.phone}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            required={true}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputControl
                            name="email"
                            label={trans("reservation.email")}
                            required
                            value={values.email}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputControl
                            name="departureCity"
                            label={trans("reservation.departure-city")}
                            required
                            value={values.departureCity}
                            error={
                              touched.departureCity &&
                              Boolean(errors.departureCity)
                            }
                            helperText={
                              touched.departureCity && errors.departureCity
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md="6">
                          <InputControl
                            name="pax"
                            label={trans("reservation.number-of-companions")}
                            value={values.pax}
                            error={touched.pax && Boolean(errors.pax)}
                            helperText={touched.pax && errors.pax}
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="departureDate"
                            label={trans("reservation.departure-date")}
                            value={values.departureDate}
                            error={
                              touched.departureDate &&
                              Boolean(errors.departureDate)
                            }
                            helperText={
                              touched.departureDate && errors.departureDate
                            }
                            type="date"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputControl
                            multiline
                            required={false}
                            name="comments"
                            label={trans("reservation.message")}
                            value={values.comments}
                            error={touched.comments && Boolean(errors.comments)}
                            helperText={touched.comments && errors.comments}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justify="flex-end"
                        className={classes.pt1rem}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={!isValid || isSubmitting}
                          className={classes.submitBtn}
                          type="submit"
                        >
                          {isSubmitting
                            ? trans("reservation.submitting")
                            : trans("reservation.submit")}
                        </Button>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      )}
      {reservationNumber && !isModalOpen && (
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100vh",
            paddingTop: "4rem",
          }}
        >
          <Grid
            container
            direction="column"
            spacing={4}
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <ExploreIcon fontSize="large" style={{ color: "#4caf50" }} />
            </Grid>
            <Grid item>
              <Typography variant="h5">{reservationNumber}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {trans("reservation.completed")}
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default BasicReservation;
