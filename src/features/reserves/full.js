import React, {  useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Avatar, IconButton, Box } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import Input from "./input";
import AddIcon from "@material-ui/icons/AddCircle";
import clsx from "classnames";
import { Form, Formik } from "formik";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import * as yup from "yup";
import firebase from "../../firebaseapp"
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
const storage = firebase.storage();


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
    color: "white",
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
  fullName: yup
    .string("Enter your Full Name")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "Please enter your full name.")
    .required("Full name is required (as it appears on passport) "),
  profession: yup
    .string("Enter your profession")
    .required("Profession is required"),
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
    .required("Passport Number is required"),
  issuedAt: yup
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
  mrz: yup.string("Enter your passport MRZ").required("MRZ is required"),
  phone: yup
    .string("Enter your phone number")
    .required("phone number is required"),
  nextOfKin: yup
    .string("Enter your nextOfKin")
    .required("next Of Kin is required"),
  relationship: yup
    .string("Enter your passport relationship")
    .required("relationship is required"),
});

const Full = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  let { packageName } = useParams();
  const history = useHistory();

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

    const metadata = {
      contentType: "image/jpeg",
    };

    const photoFileName = `${values.nationality ||
      "unknown"}/${values.passportNumber || "unknown"}.jpg`;
    let photoRef = storage.ref(photoFileName);
    photoRef
      .putString(photoURL, metadata)
      .then((snap) => {
        console.log(snap, 1);
      })
      .catch((error) => {
        alert("An error occured");
        console.log(error, "__error___");
        return;
      });

    const passportFileName = `${values.nationality ||
      "unknown"}/${values.passportNumber || "unknown"}_passport.jpg`;
    let passportRef = storage.ref(passportFileName);
    passportRef
      .putString(passportURL, metadata)
      .then((snap) => {
        console.log(snap, 1);
      })
      .catch((error) => {
        alert("An error 2 occured");
        console.log(error, "___error2___");
        return;
      });

    const customerRef = firebase
      .database()
      .ref(`public/fullReserve/${packageName}`);
    customerRef.push({ ...values, photoFileName, passportFileName });

    console.log(customerRef, "___ref___");

    history.push("/");

    alert("You've successfully booked a reserve");
  };

  return (
    <Grid container style={{ backgroundColor: "white" }}>
      <input ref={inputRef} hidden type="file" accept="image/*" />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography className={classes.titleText}>Full Reservation</Typography>
      </Grid>
      <Grid className={classes.container}>
        <Grid item direction="row" xs={12} className={classes.mainContainer}>
          <Grid container direction="row">
            <Grid item className={classes.p5} xs={12} container>
              <Grid direction="column" container>
                <Grid container direction="row" className={classes.mt10}>
                  <Typography className={classes.imgText}>
                    Basic Information
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
            initialValues={{ fullName: "" }}
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
                      <Input
                        name="fullName"
                        label="Full Name"
                        required
                        value={values.fullName}
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        name="arabicName"
                        label="Arabic Name"
                        value={values.arabicName}
                        error={touched.arabicName && Boolean(errors.arabicName)}
                        helperText={touched.arabicName && errors.arabicName}
                        required={false}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Input
                        name="gender"
                        label="Gender"
                        required
                        value={values.gender}
                        error={touched.gender && Boolean(errors.gender)}
                        helperText={touched.gender && errors.gender}
                        options={[
                          { value: "none", label: "Gender" },
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Input
                        name="nationality"
                        label="Nationality"
                        required
                        value={values.nationality}
                        error={
                          touched.nationality && Boolean(errors.nationality)
                        }
                        helperText={touched.nationality && errors.nationality}
                        options={[
                          { value: "none", label: "Nationality" },
                          { value: "nigeria", label: "Nigeria" },
                          { value: "egypt", label: "Egypt" },
                        ]}
                      />
                    </Grid>
                    <Grid item md={12} className={classes.p1rem0}>
                      <Typography className={classes.imgText}>
                        Passport Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md="6">
                      <Input
                        name="passportNumber"
                        label="Passport Number"
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
                      <Input
                        name="issuedAt"
                        label="Issued At"
                        value={values.issueAt}
                        error={touched.issueAt && Boolean(errors.issueAt)}
                        helperText={touched.issueAt && errors.issueAt}
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="passIssueDt"
                        label="Passort Issue Date"
                        value={values.passIssueDt}
                        error={
                          touched.passIssueDt && Boolean(errors.passIssueDt)
                        }
                        helperText={touched.passIssueDt && errors.passIssueDt}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="passExpireDt"
                        label="Passort Expiry Date"
                        value={values.passExpireDt}
                        error={
                          touched.passExpireDt && Boolean(errors.passExpireDt)
                        }
                        helperText={touched.passExpireDt && errors.passExpireDt}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="birthDate"
                        label="Birth Date"
                        value={values.birthDate}
                        error={touched.birthDate && Boolean(errors.birthDate)}
                        helperText={touched.birthDate && errors.birthDate}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="birthPlace"
                        label="Birth Place"
                        value={values.birthPlace}
                        error={touched.birthPlace && Boolean(errors.birthPlace)}
                        helperText={touched.birthPlace && errors.birthPlace}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        multiline
                        name="mrz"
                        label="MRZ"
                        value={values.mrz}
                        error={touched.mrz && Boolean(errors.mrz)}
                        helperText={touched.mrz && errors.mrz}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Upload your passport</Typography>
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
                            <Typography>Upload your Passport</Typography>
                          </>
                        )}
                      </Box>
                    </Grid>

                    <Grid item md={12} className={classes.p1rem0}>
                      <Typography className={classes.imgText}>
                        Residential Permit Information (optional)
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md="6">
                      <Input
                        name="idNumber"
                        required={false}
                        label="ID Number"
                        value={values.idNumber}
                        error={touched.idNumber && Boolean(errors.idNumber)}
                        helperText={touched.idNumber && errors.idNumber}
                      />
                    </Grid>

                    <Grid item xs={12} md="6">
                      <Input
                        name="idIssueDate"
                        label="ID Issue Date"
                        required={false}
                        value={values.idIssueDate}
                        error={
                          touched.idIssueDate && Boolean(errors.idIssueDate)
                        }
                        helperText={touched.idIssueDate && errors.idIssueDate}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="idExpiryDate"
                        label="ID Expiry Date"
                        value={values.idExpiryDate}
                        required={false}
                        error={
                          touched.idExpiryDate && Boolean(errors.idExpiryDate)
                        }
                        helperText={touched.idExpiryDate && errors.idExpiryDate}
                        type="date"
                      />
                    </Grid>

                    <Grid item md={12} className={classes.p1rem0}>
                      <Typography className={classes.imgText}>
                        More Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="profession"
                        label="Profession"
                        value={values.profession}
                        error={touched.profession && Boolean(errors.profession)}
                        helperText={touched.profession && errors.profession}
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="phone"
                        label="Phone"
                        value={values.phone}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="nextOfKin"
                        label="Next Of Kin"
                        value={values.nextOfKin}
                        error={touched.nextOfKin && Boolean(errors.nextOfKin)}
                        helperText={touched.nextOfKin && errors.nextOfKin}
                      />
                    </Grid>
                    <Grid item xs={12} md="6">
                      <Input
                        name="relationship"
                        label="Relationship"
                        value={values.relationship}
                        error={
                          touched.relationship && Boolean(errors.relationship)
                        }
                        helperText={touched.relationship && errors.relationship}
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
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Full;
