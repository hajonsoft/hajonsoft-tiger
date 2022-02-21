import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import RecentActorsOutlinedIcon from "@material-ui/icons/RecentActorsOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import TranslateIcon from "@material-ui/icons/Translate";
import TwitterIcon from "@material-ui/icons/Twitter";
import Alert from "@material-ui/lab/Alert";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Form, Formik } from "formik";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { nationalities } from "../../../data/nationality";
import firebase from "../../../firebaseapp";
import trans from "../../../shared/util/trans";
import firebaseArabicName from "../../arabicName/firebaseArabicName";
import InputControl from "../../Reservation/components/InputControl";
import CoreImage from "../../../shared/macaw/CoreImage";
import CorePassportImage from "../../../shared/macaw/CorePassportImage";
import CoreVaccineImage from "../../../shared/macaw/CoreVaccineImage"
import CustomerCodeline from "../../../shared/macaw/CustomerCodeline";
import Dropzone from "../../../shared/macaw/Dropzone";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useDispatch, useSelector } from "react-redux";
import { createPassenger, deleteOnlinePassenger, deletePassenger, updatePassenger } from "../../Dashboard/redux/caravanSlice";
import t from '../../../shared/util/trans';
import { analytics } from '../../analytics/firebaseAnalytics';

const storage = firebase.storage();

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

const CRUDForm = ({ mode, record, customerKey, title, onClose, onNext }) => {
  const [photoMode, setPhotoMode] = React.useState("photo");
  const classes = useStyles();
  const dispatch = useDispatch();
  let { packageName } = useParams();
  const caravans = useSelector(state => state.caravan?.data);
  const passengers = caravans[packageName];

  const savePassportImage = (values, image) => {
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
        passportNumber: values.passportNumber,
        name: values.name,
      };
      const fileName = `${values.nationality}/${values.passportNumber}_passport.jpg`;
      let ref = storage.ref(fileName);
      ref.put(image, metadata);
    }
  };

  const saveVaccineImage = (values, image) => {
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
        passportNumber: values.passportNumber,
        name: values.name,
      };
      const fileName = `${values.nationality}/${values.passportNumber}_vaccine.jpg`;
      let ref = storage.ref(fileName);
      ref.put(image, metadata);
    }
  };

  const savePortrait = (values, image) => {
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
        passportNumber: values.passportNumber,
      };
      const fileName = `${values.nationality}/${values.passportNumber}.jpg`;
      console.log('%c 🌰 fileName: ', 'font-size:20px;background-color: #FCA650;color:#fff;', fileName);
      let ref = storage.ref(fileName);
      ref.put(image, metadata);
    }
  };

  const handleSaveAndNext = async (values) => {
    await handleSubmitForm(values, null, onNext);
  };

  const handleSubmitForm = async (values, actions, callback = onClose) => {
    delete values["image"];
    delete values["passportImage"];
    switch (mode) {
      case "create":
        dispatch(createPassenger({name: packageName, passenger: values}))
        break;
      case "update":
        delete values.tableData;
        dispatch(updatePassenger({name: packageName, passenger: values}));
        break;
      case "delete":
        dispatch(deletePassenger({name: packageName, passenger: record}));
        break;
      default:
        console.log("unknown mode");
    }
    analytics.logEvent("scan");
    callback();
  };

  const popularNationality = () => {
    if (passengers) {
      const grouped = _.groupBy(passengers[packageName], "nationality");
      let count = 0;
      let popularNationality = "";
      Object.keys(grouped).forEach((k) => {
        if (grouped[k].length > count) {
          count = grouped.length;
          popularNationality = k;
        }
      });
      return popularNationality;
    }
  };

  const validSchema = yup.object().shape({
    passportNumber: yup
      .string()
      .required("Required")
      .min(7, "Too short!")
      .max(9, "Too long!"),
    passExpireDt: yup
      .date()
      .required("Required")
      .min(moment().add("6", "month"), "at least in 6 month")
      .max(moment().add(30, "year"), "Too far!"),
    passIssueDt: yup
      .date()
      .required("Required")
      .max(moment(), "Future Date!")
      .min(moment().subtract(15, "year"), "Too old!"),
    birthDate: yup
      .date()
      .required("Required")
      .max(new Date(), "Too young!")
      .min(moment().subtract(150, "year"), "Too old!"),
    birthPlace: yup
      .string()
      .required("Required")
      .max(50, "Too long!"),
    passPlaceOfIssue: yup
      .string()
      .required("Required")
      .max(50, "Too long!"),
    name: yup
      .string("Enter your Full Name")
      .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "Please enter your full name.")
      .required("Full name is required (as appears on passport) "),
    gender: yup
      .string("Select your gender")
      .required("Gender is required")
      .test(
        "not-null",
        "Please select your gender",
        (value) => value !== "none"
      ),
    nationality: yup
      .string("Select your country")
      .required("Nationality is required")
      .test(
        "not-null",
        "Please select your country",
        (value) => value !== "none"
      ),
  });

  const handleAlignment = (event, newPhotoMode) => {
    if (newPhotoMode !== null) {
      setPhotoMode(newPhotoMode);
    }
  };

  const handleFacebookClick = (value) => {
    const url = `https://www.facebook.com/search/top/?q=${encodeURIComponent(
      value
    )}&opensearch=1`;
    window.open(url, "_blank");
  };

  const handleTwitterClick = (value) => {
    const url = `https://twitter.com/search?q=${encodeURIComponent(
      value
    )}&src=typed_query`;
    window.open(url, "_blank");
  };

  const handleGoogleClick = (value) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(value)}`;
    window.open(url, "_blank");
  };

  const handleAcceptOnlineReservation = (data) => {
    dispatch(createPassenger({name: record.packageName, passenger: data}));
    dispatch(deleteOnlinePassenger({fid: record._fid}));
    onClose()
  };

  const getFullArabicName = (arabicNameDictionary) => {
    const cursor = Object.values(arabicNameDictionary);
    let fullArabicName = "";
    for (let i = 0; i < cursor.length; i++) {
      if (arabicNameDictionary[`"${i}"`]) {
        fullArabicName += " " + arabicNameDictionary[`"${i}"`];
      }
    }

    return fullArabicName.trim();
  };

  const handleTranslateName = async (englishName, setFieldValue) => {
    const names = englishName?.split(" ").filter((name) => name?.trim());
    if (names.length === 0) {
      return;
    }
    const translationResult = {};
    try {
      for (let i = 0; i < names.length; i++) {
        firebaseArabicName
          .database()
          .ref(`/${names[i].toLowerCase()}`)
          .once("value")
          .then((snapshot) => {
            const result = snapshot.val();
            translationResult[`"${i}"`] = result;
            const fullArabicName = getFullArabicName(translationResult);
            setFieldValue("nameArabic", fullArabicName);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dateHelperText = (incomingDate) => {
    return `${moment(incomingDate).format("dddd DD-MMM-yyyy")} ${moment(
      incomingDate
    ).fromNow()}`;
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={
          mode === "create"
            ? {
              nationality: popularNationality(),
              passExpireDt: moment().add(6, "month"),
              passIssueDt: moment().subtract(7, "days"),
              birthDate: moment().subtract(7, "days"),
              profession: 'unknown',
              passportNumber: record.passportNumber,
            }
            : record
        }
        validationSchema={mode !== "delete" ? validSchema : null}
        onSubmit={handleSubmitForm}
      >
        {({ setFieldValue, values, errors, isSubmitting, touched }) => (
          <Form>
            {packageName === 'online' && record.packageName &&

              <Alert severity="info" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <Typography variant="h5" >
                    {record.packageName}
                  </Typography>
                  <div style={{marginLeft: '2rem'}}>
                    <Button color="primary" size="small" variant="contained" onClick={() => handleAcceptOnlineReservation(values)} >{t('accept-reservation')}</Button>
                  </div>
                </div>

              </Alert>
            }
            <Card raised className={classes.formContainer}>
              <CardHeader
                className={classes.cardTitle}
                title={_.startCase(mode + " " + title)}
                subheader={customerKey}
                action={<CancelOutlinedIcon color="error" onClick={onClose} />}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item container justifyContent="center">
                    <Grid item xs={4}>
                      <ToggleButtonGroup
                        value={photoMode}
                        exclusive
                        onChange={handleAlignment}
                      >
                        <ToggleButton value="photo" aria-label="left aligned">
                          <AssignmentIndOutlinedIcon />
                        </ToggleButton>
                        <ToggleButton value="passport" aria-label="centered">
                          <RecentActorsOutlinedIcon />
                        </ToggleButton>
                        <ToggleButton value="vaccine" aria-label="centered">
                          <LocalHospitalIcon />
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <br />
                      {photoMode === "photo" && (
                        <CoreImage
                          setImage={(img) => savePortrait(values, img)}
                          record={values}
                        />
                      )}
                      {photoMode === "passport" && (
                        <CorePassportImage
                          setImage={(img) => savePassportImage(values, img)}
                          record={values}
                        />
                      )}
                      {photoMode === "vaccine" && (
                        <CoreVaccineImage
                        setImage={(img) => saveVaccineImage(values, img)}
                        record={values}
                      />
                      )}
                      {mode === "create" && (
                        <Grid container item xs style={{ padding: '1rem' }}>
                          <Dropzone
                            onClose={onClose}
                            saveToFirebase={handleSubmitForm}
                            packageName={packageName}
                          ></Dropzone>
                        </Grid>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      container
                      direction="column"
                      justifyContent="space-around"
                    >
                      <Grid
                        item
                        xs={12}
                      >
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={9}>
                            <InputControl
                              name="name"
                              label={trans("reservation.full-name")}
                              required
                              value={values.name}
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <IconButton>
                              <FacebookIcon fontSize="small"
                                onClick={() => handleFacebookClick(values.name)}
                              />
                            </IconButton>
                            <IconButton>
                              <TwitterIcon fontSize="small"
                                onClick={() => handleTwitterClick(values.name)}
                              />
                            </IconButton>
                            <IconButton >
                              <FontAwesomeIcon size="sm"
                                icon={faGoogle}
                                onClick={() => handleGoogleClick(values.name)}
                              />
                            </IconButton>
                          </Grid>
                          <Grid item xs={9}>
                            <InputControl
                              name="nameArabic"
                              label={trans("reservation.arabic-name")}
                              value={values.nameArabic}
                              error={
                                touched.nameArabic && Boolean(errors.nameArabic)
                              }
                              helperText={
                                touched.nameArabic && errors.nameArabic
                              }
                              required={false}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <IconButton>
                              <TranslateIcon
                                onClick={() =>
                                  handleTranslateName(
                                    values.name,
                                    setFieldValue
                                  )
                                }
                              />
                            </IconButton>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <InputControl
                              name="nationality"
                              label={trans("reservation.nationality")}
                              required
                              value={values.nationality}
                              error={
                                touched.nationality &&
                                Boolean(errors.nationality)
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
                                values?.passportNumber?.length || (touched.passportNumber && errors.passportNumber)
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
                              value={moment(values?.passIssueDt).format("YYYY-MM-DD")} 
                              error={
                                touched.passIssueDt &&
                                Boolean(errors.passIssueDt)
                              }
                              helperText={
                                (touched.passIssueDt && errors.passIssueDt) ||
                                dateHelperText(values.passIssueDt)
                              }
                              type="date"
                            />
                          </Grid>
                          {/* //TODO: Make sure the date conversion ignores time zone otherwies date will depend on location */}
                          <Grid item xs={12} md="6">
                            <InputControl
                              name="passExpireDt"
                              label={trans("reservation.passport-expire-date")}
                              value={moment(values?.passExpireDt).format("YYYY-MM-DD")} 
                              error={
                                touched.passExpireDt &&
                                Boolean(errors.passExpireDt)
                              }
                              helperText={
                                (touched.passExpireDt && errors.passExpireDt) ||
                                dateHelperText(values.passExpireDt)
                              }
                              type="date"
                            />
                          </Grid>
                          <Grid item xs={12} md="6">
                            <InputControl
                              name="birthDate"
                              label={trans("reservation.birth-date")}
                              value={moment(values?.birthDate).format("YYYY-MM-DD")} 
                              error={
                                touched.birthDate && Boolean(errors.birthDate)
                              }
                              helperText={
                                (touched.birthDate && errors.birthDate) ||
                                dateHelperText(values.birthDate)
                              }
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
                              helperText={
                                touched.birthPlace && errors.birthPlace
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <CustomerCodeline
                              record={record}
                              setFieldValue={setFieldValue}
                              mode={mode}
                            />
                          </Grid>
                          <Grid item xs={12} md="6">
                            <InputControl
                              name="idNumber"
                              required={false}
                              label={trans("reservation.id-number")}
                              value={values.idNumber}
                              error={
                                touched.idNumber && Boolean(errors.idNumber)
                              }
                              helperText={touched.idNumber && errors.idNumber}
                            />
                          </Grid>

                          <Grid item xs={12} md="6">
                            <InputControl
                              name="idNumberIssueDate"
                              label={trans("reservation.id-issue-date")}
                              required={false}
                              value={moment(values?.idNumberIssueDate).format("YYYY-MM-DD")} 
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
                              value={moment(values?.idNumberExpireDate).format("YYYY-MM-DD")} 
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
                          <Grid item xs={12} md="6">
                            <InputControl
                              name="profession"
                              label={trans("reservation.profession")}
                              value={values.profession || 'unknown'}
                              error={
                                touched.profession && Boolean(errors.profession)
                              }
                              helperText={
                                touched.profession && errors.profession
                              }
                              required={false}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputControl
                              name="email"
                              label={trans("reservation.email")}
                              value={values.email}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                              required={false}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputControl
                              name="phone"
                              label={trans("reservation.telephone")}
                              value={values.phone}
                              error={touched.phone && Boolean(errors.phone)}
                              helperText={touched.phone && errors.phone}
                              required={false}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputControl
                              multiline
                              required={false}
                              name="comments"
                              label={t('note')}
                              value={values.comments}
                              error={
                                touched.comments && Boolean(errors.comments)
                              }
                              helperText={touched.comments && errors.comments}
                            />
                          </Grid>
                          <Grid item xs={2} >
                          <InputControl
                              required={false}
                              name="mofaNumber"
                              label={t('mofaNumber')}
                              value={values.mofaNumber}
                              error={
                                touched.mofaNumber && Boolean(errors.mofaNumber)
                              }
                              helperText={touched.mofaNumber && errors.mofaNumber}
                            />
                          </Grid>
                          <Grid item xs={2} >
                          <InputControl
                              required={false}
                              name="eNumber"
                              label={t('eNumber')}
                              value={values.eNumber}
                              error={
                                touched.eNumber && Boolean(errors.eNumber)
                              }
                              helperText={touched.eNumber && errors.eNumber}
                            />
                          </Grid>
                          <Grid item xs={2} >
                          <InputControl
                              required={false}
                              name="airlineRef"
                              label={t('airlineRef')}
                              value={values.airlineRef}
                              error={
                                touched.airlineRef && Boolean(errors.airlineRef)
                              }
                              helperText={touched.airlineRef && errors.airlineRef}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        align="center"
                        style={{ color: "#f44336" }}
                      >
                        {errors &&
                          Object.keys(errors).length === 0 &&
                          errors.constructor === Object
                          ? ""
                          : JSON.stringify(errors).replace(/"/g, "")}
                      </Typography>
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
                          style={{ color: "red", borderColor: "red" }}
                          disabled={isSubmitting}
                          variant="outlined"
                          color="default"
                          onClick={onClose}
                          startIcon={<CancelOutlinedIcon color="error" />}
                        >
                          {t('cancel')}
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
                            {t('create')}
                          </Button>
                        </Grid>
                      )}
                      {mode === "delete" && (
                        <Grid item>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="outlined"
                            style={{ color: "red", borderColor: "red" }}
                            color="default"
                            startIcon={<DeleteOutlinedIcon color="error" />}
                          >
                            {t('delete')}
                          </Button>
                        </Grid>
                      )}
                      {mode === "update" && (
                        <React.Fragment>
                          <Grid item>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              variant="outlined"
                              color="secondary"
                              startIcon={<SaveOutlinedIcon />}
                            >
                              {t('save-and-close')}
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              type="button"
                              disabled={isSubmitting}
                              variant="outlined"
                              color="primary"
                              onClick={() => handleSaveAndNext(values)}
                              startIcon={<SaveOutlinedIcon />}
                            >
                              {t('save-and-next')}
                            </Button>
                          </Grid>
                        </React.Fragment>
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

export default CRUDForm;
