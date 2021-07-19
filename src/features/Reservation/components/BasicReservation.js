import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import InputControl from "./InputControl";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import clsx from "classnames";
import { Form, Formik } from "formik";
import * as yup from "yup";
import firebase from "../../../firebaseapp";
import trans from "../../../util/trans";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    color: "#385273",
    borderRadius: 15,
    padding: 15,
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: "1px solid #F7F7FA",
  },
  submitBtn: {
    background: "#178CF9",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    textTransform: "capitalize",
    color: "white",
  },
  titleText: {
    marginLeft: 10,
    fontSize: "1.1rem",
    color: "#434343",
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

const BasicReservation = () => {
  const classes = useStyles();
  const { packageName } = useParams();
  const history = useHistory();

  const handleSubmitForm = async (values, actions) => {
    const reservationRef = firebase
      .database()
      .ref(`customer/${packageName}`);
    const pushResult = reservationRef.push(values);
    alert("You reservation has been received " + pushResult.key);
    history.push("/");
  };

  return (
    <Grid container style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Grid
        container
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography component="span" className={classes.titleText}>
          {trans("reservation.quick-reservation")}
        </Typography>
        <Typography className={classes.titleText}>{`${packageName}`}</Typography>
      </Grid>
      <Grid className={classes.container}>
        <Grid item direction="row" xs={12} className={classes.mainContainer}>
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
                        label={trans('reservation.full-name')}
                        required
                        value={values.name}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputControl
                        name="phone"
                        label={trans('reservation.telephone')}
                        value={values.phone}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                        required={true}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputControl
                        name="email"
                        label={trans('reservation.email')}
                        required
                        value={values.email}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputControl
                        name="departureCity"
                        label={trans('reservation.departure-city')}
                        required
                        value={values.departureCity}
                        error={
                          touched.departureCity && Boolean(errors.departureCity)
                        }
                        helperText={
                          touched.departureCity && errors.departureCity
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md="6">
                      <InputControl
                        name="pax"
                        label={trans('reservation.number-of-companions')}
                        value={values.pax}
                        error={touched.pax && Boolean(errors.pax)}
                        helperText={touched.pax && errors.pax}
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <InputControl
                        name="departureDate"
                        label={trans('reservation.departure-date')}
                        value={values.departureDate}
                        error={
                          touched.departureDate && Boolean(errors.departureDate)
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
                        label={trans('reservation.message')}
                        value={values.comments}
                        error={touched.comments && Boolean(errors.comments)}
                        helperText={touched.comments && errors.comments}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justify="flex-end" className={classes.pt1rem}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isValid || isSubmitting}
                      className={classes.submitBtn}
                      type="submit"
                    >
                      {isSubmitting ? trans('reservation.submitting') : trans('reservation.submit')}
                    </Button>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BasicReservation;
