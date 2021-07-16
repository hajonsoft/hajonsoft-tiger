import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import Input from "./input";
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import clsx from "classnames";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import firebase from "../../firebaseapp"

const useStyles = makeStyles((theme) => ({
  selector: {
    border: "solid 1px #ccc",
    borderRadius: 10,
    paddingLeft: 3,
    height: 32,
  },
  titleContainer: {
    color: "#385273",
    borderRadius: 15,
    padding: 15,
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: "1px solid #F7F7FA",
  },
  coloredText: {
    color: "#ccc",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  button: {
    paddingTop: 10,
    width: 100,
    height: 30,
    color: "white",
    borderRadius: 10,
  },
  buttonApply: {
    backgroundColor: "#487DBF",
    "&:hover": {
      backgroundColor: "#487DBF",
    },
  },
  passwordSectionTitle: {
    color: "#ccc",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    border: "none",
    resize: "none",
    borderRadius: 10,
    padding: 10,
    borderColor: "lightgrey",
    fontSize: "1.075rem",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 90,
    },
  },
  submitBtn: {
    background: "#178CF9",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    textTransform: "capitalize",
    color: "white"
  },
  snackBar: {
    color: "#000",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
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
  avatarContainer: {
    border: "1px solid #F7F7FA",
    padding: "1.4rem",
    borderRadius: "50%",
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 20,
  },
  posRelative: {
    position: "relative",
  },
  imgIconContainer: {
    position: "absolute",
    top: -35,
    left: 64,
  },
  addIcon: {
    color: "#157CFC",
    fontSize: "1.75rem",
  },
  mt10: {
    marginTop: 10,
  },
  imgText: {
    color: "#8A9EB5",
    fontSize: "0.75rem",
    textAlign: "left",
    padding: "1.5rem 0px"
  },
  pt3rem: {
    paddingTop: "1.5rem",
  },
  pb0: {
    padding: 0,
  },
  p1rem0: {
    padding: "1rem 0px",
  },
  addressText: {
    fontSize: ".8rem",
    color: "#434343",
  },
  pt1rem: {
    paddingTop: "1rem",
  },
  form: {
    paddingTop: "5rem",
    paddingBottom: "4rem",
  },
  mb1rem: {
    marginBottom: "1rem",
  },
  sectionText: {
    fontSize: ".8rem",
    color: "#434343",
  },
  passportBox: {
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "300px",
    cursor: "pointer",
    overflow: "hidden",
  },
}));

const validationSchema = yup.object({
  name: yup
  .string('Enter your Full Name')
  .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms,'Please enter your full name.')
  .required('Full name is required (as it appears on passport) '),
  tel: yup.string("Enter your phone number").required("phone number is required"),
  email: yup.string('Enter your email address').email("Enter a valid email"),
  departureCity: yup.string('Enter your departure city').required("Departure city is required"),
  departureDate: yup.string('Enter your departure date').required("Departure date is required"),
  pax: yup.number('Enter your number of compannions').required("Number of Companions is required"),
});

const Full = () => {
  const classes = useStyles();
  let { packageName } = useParams();
  const history = useHistory();

  const handleSubmitForm = async (values, actions) => {
    
    const customerRef = firebase
      .database()
      .ref(`public/reserve/${packageName}`);
    customerRef.push(values);
    history.push("/");
    alert("You've successfully booked a reserve")
  };

  return (
    <Grid container style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography className={classes.titleText}>Basic Reservation</Typography>
      </Grid>
      <Grid className={classes.container}>
        <Grid item direction="row" xs={12} className={classes.mainContainer}>
          <Grid container direction="row">
            <Grid item className={classes.p5} xs={12} container>
              <Grid direction="column" container>
                <Grid container direction="row">
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Formik initialValues={{ name: "" }} onSubmit={handleSubmitForm} validationSchema={validationSchema}>
            {({
              values,
              errors,
              touched,
              isSubmitting,
              isValid
            }) => { 

              console.log(isSubmitting)
            
              
              return (
              <Form className={classes.pt3rem}>
                <Grid
                  container
                  spacing={3}
                  className={clsx(classes.container, classes.pb0)}
                >
                  <Grid item xs={12}>
                    <Input
                      name="name"
                      label="Full Name"
                      required
                      value={values.name}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      name="tel"
                      label="Telephone"
                      value={values.tel}
                      error={touched.tel && Boolean(errors.tel)}
                      helperText={touched.tel && errors.tel}
                      required={false}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Input
                      name="email"
                      label="Email"
                      required
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Input
                      name="departureCity"
                      label="Departure City"
                      required
                      value={values.departureCity}
                      error={touched.departureCity && Boolean(errors.departureCity)}
                      helperText={touched.departureCity && errors.departureCity}
                    />
                  </Grid>

                  <Grid item xs={12} md="6">
                    <Input
                      name="pax"
                      label="Number of Companions"
                      value={values.pax}
                      error={
                        touched.pax && Boolean(errors.pax)
                      }
                      helperText={
                        touched.pax && errors.pax
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md="6">
                    <Input
                      name="departureDate"
                      label="Departure Date"
                      value={values.departureDate}
                      error={touched.departureDate && Boolean(errors.departureDate)}
                      helperText={touched.departureDate && errors.departureDate}
                      type="date"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      multiline
                      required={false}
                      name="message"
                      label="Message"
                      value={values.message}
                      error={touched.message && Boolean(errors.message)}
                      helperText={touched.message && errors.message}
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
                    {isSubmitting ? "Submitting..." : "Submit" }
                  </Button>
                </Grid>
              </Form>
            )}}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Full;
