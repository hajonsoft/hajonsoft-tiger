import { Typography } from "@material-ui/core";
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
import RecentActorsOutlinedIcon from "@material-ui/icons/RecentActorsOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Form, Formik } from "formik";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import firebase from "../../../firebaseapp";
import useTravellerState from "../../Dashboard/redux/useTravellerState";
import BirthPlace from "./BirthPlace";
import CoreImage from "./CoreImage";
import CorePassportImage from "./CorePassportImage";
import CoreTextField from "./CoreTextField";
import CustomerArabicName from "./CustomerArabicName";
import CustomerBirthDate from "./CustomerBirthDate";
import CustomerCodeline from "./CustomerCodeline";
import CustomerComments from "./CustomerComments";
import CustomerIdExpireDate from "./CustomerIdExpireDate";
import CustomerIdIssueDate from "./CustomerIdIssueDate";
import CustomerName from "./CustomerName";
import CustomerNationality from "./CustomerNationality";
import CustomerPassportExpireDate from "./CustomerPassportExpireDate";
import CustomerPassportIssueDate from "./CustomerPassportIssueDate";
import CustomerPassportNumber from "./CustomerPassportNumber";
import CustomerPhone from "./CustomerPhone";
import Dropzone from "./Dropzone";
import Gender from "./Gender";
import PassportPlaceOfIssue from "./PassportPlaceOfIssue";

const storage = firebase.storage();

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

const CRUDForm = ({ mode, record, customerKey, title, onClose }) => {
  const [photoMode, setPhotoMode] = React.useState("photo");
  const classes = useStyles();
  let { packageName } = useParams();
  const {
    data: travellers,
    createData: createTraveller,
    updateData: updateTraveller,
    deleteData: deleteTraveller,
  } = useTravellerState();

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

  const saveImage = (values, image) => {
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
        passportNumber: values.passportNumber,
        name: values.name,
      };
      const fileName = `${values.nationality}/${values.passportNumber}.jpg`;
      let ref = storage.ref(fileName);
      ref.put(image, metadata);
    }
  };

  const handleSubmitForm = async (values, actions, callback = onClose) => {
    delete values["image"];
    delete values["passportImage"];
    switch (mode) {
      case "create":
        createTraveller({ path: `customer/${packageName}`, data: values });
        break;
      case "update":
        delete values.tableData;
        updateTraveller({
          path: `customer/${packageName}/${record._fid}`,
          data: values,
        });
        break;
      case "delete":
        deleteTraveller({ path: `customer/${packageName}/${record._fid}` , data: values});
        break;

      default:
        console.log("unknown mode");
    }

    onClose();
  };

  const popularNationality = () => {
    if (travellers) {
      const grouped = _.groupBy(travellers[packageName], "nationality");
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
    name: yup.string().required("Required"),
    nationality: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    passportNumber: yup
      .string()
      .required("Required")
      .min(8, "Too short!")
      .max(9, "Too long!"),
    passExpireDt: yup
      .date()
      .required("Required")
      .min(moment().add("6", "month"), "at least in 6 month")
      .max(moment().add(20, "year"), "Too far!"),
    passIssueDt: yup
      .date()
      .required("Required")
      .max(moment(), "Future Date!")
      .min(moment().subtract(15, "year"), "Too old!"),
    birthDate: yup
      .date()
      .required("Required")
      .max(new Date(), "Too young!"),
    birthPlace: yup
      .string()
      .required("Required")
      .max(25, "Too long!"),
    passPlaceOfIssue: yup
      .string()
      .required("Required")
      .max(25, "Too long!"),
  });

  const handleAlignment = (event, newPhotoMode) => {
    if (newPhotoMode !== null) {
      setPhotoMode(newPhotoMode);
    }
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
              }
            : record
        }
        validationSchema={mode !== 'delete' ? validSchema: null}
        onSubmit={handleSubmitForm}
      >
        {({ setFieldValue, values, errors, isSubmitting }) => (
          <Form>
            <Card raised className={classes.formContainer}>
              <CardHeader
                className={classes.cardTitle}
                title={_.startCase(mode + " " + title)}
                subheader={customerKey}
                action={
                  <CancelOutlinedIcon color="secondary" onClick={onClose} />
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item container justify="center">
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
                      </ToggleButtonGroup>
                      {photoMode === 'photo' &&  <CoreImage
                        setImage={(img) => saveImage(values, img)}
                        record={values}
                      />}
                      {photoMode === 'passport' && <CorePassportImage
                        setImage={(img) => savePassportImage(values, img)}
                        record={values}
                      />}
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      container
                      direction="column"
                      justify="space-around"
                    >
                      <Grid item container justify="space-between" spacing={4}>
                        <CustomerName
                          mode={mode}
                          value={values.name}
                          setFieldValue={setFieldValue}
                        />
                        <CustomerArabicName
                          mode={mode}
                          value={values.nameArabic}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item container justify="space-between" spacing={4}>
                        <CustomerNationality
                          mode={mode}
                          value={values.nationality || popularNationality()}
                        />
                        <Gender
                          value={values.gender || ""}
                          mode={mode}
                          xsWidth={6}
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <CustomerPassportNumber
                          mode={mode}
                          value={values.passportNumber || ""}
                          setFieldValue={setFieldValue}
                        />
                        <PassportPlaceOfIssue
                          mode={mode}
                          value={values.passPlaceOfIssue || ""}
                          setFieldValue={setFieldValue}
                        />
                        <CustomerPassportIssueDate
                          value={values.passIssueDt}
                          mode={mode}
                          setFieldValue={setFieldValue}
                        />
                        <CustomerPassportExpireDate
                          value={values.passExpireDt}
                          mode={mode}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>

                      <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <CustomerBirthDate
                          value={values.birthDate}
                          mode={mode}
                          setFieldValue={setFieldValue}
                        />
                        <BirthPlace
                          mode={mode}
                          value={values.birthPlace || ""}
                          setFieldValue={setFieldValue}
                        />

                        <CustomerCodeline
                          value={values.codeLine || ""}
                          name="codeLine"
                          setFieldValue={setFieldValue}
                          mode={mode}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item container alignItems="center" spacing={4}>
                    <CoreTextField
                      value={values.idNumber || ""}
                      name="idNumber"
                      mode={mode}
                      maxLength={20}
                    />
                    {values.idNumber ? (
                      <CustomerIdIssueDate
                        value={values.idNumberIssueDate}
                        mode={mode}
                        setFieldValue={setFieldValue}
                      />
                    ) : (
                      <Grid item xs={4}>
                        {" "}
                      </Grid>
                    )}
                    {values.idNumber ? (
                      <CustomerIdExpireDate
                        value={values.idNumberExpireDate}
                        mode={mode}
                        setFieldValue={setFieldValue}
                      />
                    ) : (
                      <Grid item xs={4}>
                        {" "}
                      </Grid>
                    )}
                  </Grid>

                  <Grid item container alignItems="center" spacing={4}>
                    <CoreTextField
                      value={values.profession || ""}
                      name="profession"
                      mode={mode}
                      maxLength={25}
                    />
                    <CustomerPhone value={values.phone} mode={mode} />
                    <CoreTextField
                      value={values.email || ""}
                      name="email"
                      mode={mode}
                    />
                  </Grid>
                  <CoreTextField
                    value={values.mahramName || ""}
                    name="mahramName"
                    label="Mahram"
                    mode={mode}
                  />
                  <CoreTextField
                    value={values.relationship || ""}
                    name="relationship"
                    mode={mode}
                  />

                  <CustomerComments
                    value={values.comments || ""}
                    name="comments"
                    mode={mode}
                  />

                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      align="center"
                      style={{ color: "#f44336" }}
                    >
                      {JSON.stringify(errors).replace(/"/g, "")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.actionsContainer}>
                <Grid container spacing={2}>
                  {mode === "create" && (
                    <Grid container item xs>
                      <Dropzone
                        onClose={onClose}
                        saveToFirebase={handleSubmitForm}
                        packageName={packageName}
                      ></Dropzone>
                    </Grid>
                  )}
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

export default CRUDForm;
