import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/AddCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import clsx from "classnames";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { nationalities } from "../../../data/nationality";
import firebase from "../../../firebaseapp";
import trans from "../../../util/trans";
import InputControl from "./InputControl";

const storage = firebase.storage();

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
    padding: "1.5rem 0px",
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
  pt1rem: {
    paddingTop: "1rem",
  },
  mb1rem: {
    marginBottom: "1rem",
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
    .string("Enter your Full Name")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "Please enter your full name.")
    .required("Full name is required (as it appears on passport) "),
  gender: yup
    .string("Select your gender")
    .required("Gender is required")
    .test("not-null", "Please select your gender", (value) => value !== "none"),
  nationality: yup
    .string("Select your country")
    .required("Nationality is required")
    .test(
      "not-null",
      "Please select your country",
      (value) => value !== "none"
    ),
  passportNumber: yup
    .string("Enter your passport number")
    .required("Passport number is required"),
  passPlaceOfIssue: yup
    .string("Enter your passport issuedAt")
    .required("Passport issuedAt is required"),
  passIssueDt: yup
    .string("Enter your passport issue date")
    .required("Passport issue date is required"),
  passExpireDt: yup
    .string("Enter your passport expiry date")
    .required("Passport expiry date is required"),
  birthDate: yup
    .string("Enter your birth date")
    .required("birth date is required"),
  birthPlace: yup
    .string("Enter your birth place")
    .required("Birth place is required"),
  phone: yup
    .string("Enter your phone number")
    .required("phone number is required"),
});

const FullReservation = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  let { packageName } = useParams();
  const [reservationNumber, setReservationNumber] = useState("");

  const [photoURL, setPhotoURL] = useState("");
  const [passportURL, setPassportURL] = useState("");

  function uploadImageHandler(cb) {
    inputRef.current.click();
    inputRef.current.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        cb(reader.result);
      };
      reader.readAsDataURL(file);
    };
  }

  const handleSubmitForm = async (values, actions) => {
    if (!photoURL || !passportURL) {
      alert("upload all required photos");
      return;
    }
    const photoFileName = `${values.nationality ||
      "unknown"}/${values.passportNumber || "unknown"}.jpg`;
    let photoRef = storage.ref(photoFileName);
    photoRef
      .putString(photoURL, "data_url")
      .then((snap) => {
        console.log(snap, 1);
      })
      .catch((error) => {
        alert("An error occurred");
        console.log(error, "__error___");
        return;
      });

    const passportFileName = `${values.nationality ||
      "unknown"}/${values.passportNumber || "unknown"}_passport.jpg`;
    let passportRef = storage.ref(passportFileName);
    passportRef
      .putString(passportURL, "data_url")
      .then((snap) => {
        console.log(snap, 1);
      })
      .catch((error) => {
        alert("An error 2 occurred");
        console.log(error, "___error2___");
        return;
      });

    const reservationReference = firebase
      .database()
      .ref(`customer/${packageName}`);
    const reservationResult = reservationReference.push({
      ...values,
      photoFileName,
      passportFileName,
    });

    setReservationNumber(reservationResult.key);
  };

  return (
    <div>
      <Paper style={{ margin: "0.5rem" }}>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
          className={classes.titleContainer}
        >
          <Grid item>
            <FlightTakeoffIcon fontSize="medium" />
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {trans("reservation.full-reservation")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{packageName}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {!reservationNumber && (
        <Grid container style={{ backgroundColor: "white" }}>
          <input ref={inputRef} hidden type="file" accept="image/*" />
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
                    <Grid container direction="row" className={classes.mt10}>
                      <Typography className={classes.imgText}>
                        {trans("reservation.basic-information")}
                      </Typography>
                    </Grid>
                    <Grid container direction="row">
                      <div className={classes.avatarContainer}>
                        <Avatar
                          src={
                            photoURL
                              ? photoURL
                              : "https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"
                          }
                          className={classes.avatar}
                        />
                        <div className={classes.posRelative}>
                          <div className={classes.imgIconContainer}>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                uploadImageHandler((val) => setPhotoURL(val));
                              }}
                            >
                              <AddIcon className={classes.addIcon} />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </Grid>
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
                            name="nameArabic"
                            label={trans("reservation.arabic-name")}
                            value={values.arabicName}
                            error={
                              touched.nameArabic && Boolean(errors.nameArabic)
                            }
                            helperText={touched.nameArabic && errors.nameArabic}
                            required={false}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputControl
                            name="gender"
                            label={trans("reservation.gender")}
                            required
                            value={values.gender}
                            error={touched.gender && Boolean(errors.gender)}
                            helperText={touched.gender && errors.gender}
                            options={[
                              { value: "none", label: "Gender" },
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                            ]}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputControl
                            name="nationality"
                            label={trans("reservation.nationality")}
                            required
                            value={values.nationality}
                            error={
                              touched.nationality && Boolean(errors.nationality)
                            }
                            helperText={
                              touched.nationality && errors.nationality
                            }
                            options={[
                              { value: "none", label: "Nationality" },
                              ...nationalities.map((nationality) => ({
                                value: nationality.name,
                                label: nationality.name,
                              })),
                            ]}
                          />
                        </Grid>
                        <Grid item md={12} className={classes.p1rem0}>
                          <Typography className={classes.imgText}>
                            Passport Information
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md="6">
                          <InputControl
                            name="passportNumber"
                            label={trans("reservation.passport-number")}
                            value={values.passportNumber}
                            error={
                              touched.passportNumber &&
                              Boolean(errors.passportNumber)
                            }
                            helperText={
                              touched.passportNumber && errors.passportNumber
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="passPlaceOfIssue"
                            label={trans("reservation.issued-at")}
                            value={values.passPlaceOfIssue}
                            error={
                              touched.passPlaceOfIssue &&
                              Boolean(errors.passPlaceOfIssue)
                            }
                            helperText={
                              touched.passPlaceOfIssue &&
                              errors.passPlaceOfIssue
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="passIssueDt"
                            label={trans("reservation.passport-issue-date")}
                            value={values.passIssueDt}
                            error={
                              touched.passIssueDt && Boolean(errors.passIssueDt)
                            }
                            helperText={
                              touched.passIssueDt && errors.passIssueDt
                            }
                            type="date"
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="passExpireDt"
                            label={trans("reservation.passport-expire-date")}
                            value={values.passExpireDt}
                            error={
                              touched.passExpireDt &&
                              Boolean(errors.passExpireDt)
                            }
                            helperText={
                              touched.passExpireDt && errors.passExpireDt
                            }
                            type="date"
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="birthDate"
                            label={trans("reservation.birth-date")}
                            value={values.birthDate}
                            error={
                              touched.birthDate && Boolean(errors.birthDate)
                            }
                            helperText={touched.birthDate && errors.birthDate}
                            type="date"
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="birthPlace"
                            label={trans("reservation.birth-place")}
                            value={values.birthPlace}
                            error={
                              touched.birthPlace && Boolean(errors.birthPlace)
                            }
                            helperText={touched.birthPlace && errors.birthPlace}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            {trans("reservation.upload-your-passport")}
                          </Typography>
                          <Box
                            className={classes.passportBox}
                            onClick={(e) => {
                              e.stopPropagation();
                              uploadImageHandler((val) => setPassportURL(val));
                            }}
                          >
                            {passportURL ? (
                              <img
                                src={passportURL}
                                width="100%"
                                height="100%"
                                alt="passport"
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              <>
                                <AddCircleOutlineIcon
                                  color="primary"
                                  fontSize="large"
                                />
                                <Typography>
                                  {trans("reservation.upload-your-passport")}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </Grid>

                        <Grid item md={12} className={classes.p1rem0}>
                          <Typography className={classes.imgText}>
                            {trans("reservation.residency-permit-info")}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md="6">
                          <InputControl
                            name="idNumber"
                            required={false}
                            label={trans("reservation.id-number")}
                            value={values.idNumber}
                            error={touched.idNumber && Boolean(errors.idNumber)}
                            helperText={touched.idNumber && errors.idNumber}
                          />
                        </Grid>

                        <Grid item xs={12} md="6">
                          <InputControl
                            name="idNumberIssueDate"
                            label={trans("reservation.id-issue-date")}
                            required={false}
                            value={values.idNumberIssueDate}
                            error={
                              touched.idNumberIssueDate &&
                              Boolean(errors.idNumberIssueDate)
                            }
                            helperText={
                              touched.idNumberIssueDate &&
                              errors.idNumberIssueDate
                            }
                            type="date"
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="idNumberExpireDate"
                            label={trans("reservation.id-expire-date")}
                            value={values.idNumberExpireDate}
                            required={false}
                            error={
                              touched.idNumberExpireDate &&
                              Boolean(errors.idNumberExpireDate)
                            }
                            helperText={
                              touched.idNumberExpireDate &&
                              errors.idNumberExpireDate
                            }
                            type="date"
                          />
                        </Grid>

                        <Grid item md={12} className={classes.p1rem0}>
                          <Typography className={classes.imgText}>
                            More Details
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="profession"
                            label={trans("reservation.profession")}
                            value={values.profession}
                            error={
                              touched.profession && Boolean(errors.profession)
                            }
                            helperText={touched.profession && errors.profession}
                            required={false}
                          />
                        </Grid>
                        <Grid item xs={12} md="6">
                          <InputControl
                            name="phone"
                            label={trans("reservation.telephone")}
                            value={values.phone}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputControl
                            name="email"
                            label={trans("reservation.email")}
                            value={values.email}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            required={false}
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
                      <Grid item></Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      )}

      {reservationNumber && (
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
              <FlightTakeoffIcon
                fontSize="large"
                style={{ color: "#4caf50" }}
              />
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

export default FullReservation;
