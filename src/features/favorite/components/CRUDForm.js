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
import { useDispatch } from "react-redux";
import firebase from "../../../firebaseapp";
import { updatePassenger } from "../../customer/redux/passengerSlice";
import CoreImage from "./CoreImage";
import CoreTextField from "./CoreTextField";
import CustomerBirthDate from './CustomerBirthDate';
import CustomerComments from './CustomerComments';
import CustomerIdExpireDate from './CustomerIdExpireDate';
import CustomerIdIssueDate from './CustomerIdIssueDate';
import CustomerName from './CustomerName';
import CustomerNationality from './CustomerNationality';
import CustomerPassportExpireDate from './CustomerPassportExpireDate';
import CustomerPassportIssueDate from './CustomerPassportIssueDate';
import CustomerPassportNumber from './CustomerPassportNumber';
import CustomerPhone from './CustomerPhone';
import Gender from './Gender';
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
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmitForm = async (values, actions, callback = onClose) => {
    let image = values.image;
    delete values["image"];
    switch (mode) {
      case "update":
        delete values.tableData;
        dispatch(updatePassenger(`${record._groupName}/${record._fid}`, values)) // TODO:RTK 5 make sure path is combined correctly
        break;
      default:
        console.log("unknown mode");
    }
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const fileName = `${values.nationality}/${values.passportNumber}.jpg`;
      let ref = storage.ref(fileName);
      ref.put(image, metadata);
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
          /* and other goodies */
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
                  <Grid container spacing={2}>
                    <Grid item container>
                      <Grid item xs={4}>
                        <CoreImage
                          setImage={(img) => setFieldValue("image", img)}
                          packageName={record._groupName}
                          customerKey={customerKey}
                          record={record}
                        />
                      </Grid>
                      <Grid item xs={8} container direction="column" justify="space-around">
                        <Grid item container justify="space-between" spacing={4}>
                          <CustomerName
                            mode={mode}
                            value={values.name || ""}
                          />
                          <CoreTextField
                            value={values.nameArabic || ""}
                            name="nameArabic"
                            label="الاسم العربي في جواز السفر"
                            mode={mode}
                            xsWidth={6}
                          />
                        </Grid>
                        <Grid item container justify="space-between" spacing={4}>
                          <CustomerNationality
                            mode={mode}
                            value={values.nationality || ""}
                          />
                          <Gender
                            value={values.gender || ""}
                            mode={mode}
                            xsWidth={6}
                          />
                        </Grid>
                        <Grid item container justify="space-between" alignItems="center" spacing={4}>
                          <CustomerPassportNumber
                            mode={mode}
                            value={values.passportNumber || ""}
                          />
                          <CustomerPassportExpireDate value={values.passExpireDt} mode={mode} setFieldValue={setFieldValue} />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item container alignItems="center" spacing={4}>
                      <CustomerBirthDate value={values.birthDate} mode={mode} setFieldValue={setFieldValue} />
                      <CoreTextField value={values.birthPlace || ""} name="birthPlace" mode={mode} maxLength={25} />
                      <CoreTextField
                        value={values.passPlaceOfIssue || ""}
                        name="passPlaceOfIssue"
                        maxLength={25}
                        mode={mode}
                      />
                    </Grid>
                    <Grid item container alignItems="center" spacing={4}>

                      <CoreTextField value={values.idNumber || ""} name="idNumber" mode={mode} maxLength={20} />
                      {values.idNumber ?
                        <CustomerIdIssueDate
                          value={values.idNumberIssueDate}
                          mode={mode}
                          setFieldValue={setFieldValue}
                        /> :
                        <Grid item xs={4}> </Grid>
                      }
                      {values.idNumber ?
                        <CustomerIdExpireDate
                          value={values.idNumberExpireDate}
                          mode={mode}
                          setFieldValue={setFieldValue}
                        /> :
                        <Grid item xs={4}> </Grid>
                      }
                    </Grid>

                    <Grid item container alignItems="center" spacing={4}>

                      <CustomerPassportIssueDate value={values.passIssueDt} mode={mode} setFieldValue={setFieldValue} />
                      <CoreTextField value={values.profession || ""} name="profession" mode={mode} maxLength={25} />
                      <CoreTextField
                        value={values.mahramName || ""}
                        name="mahramName"
                        label="Mahram"
                        mode={mode}
                      />
                    </Grid>
                    <CoreTextField
                      value={values.relationship || ""}
                      name="relationship"
                      mode={mode}
                    />
                    <CustomerPhone value={values.phone} mode={mode} />
                    <CoreTextField value={values.email || ""} name="email" mode={mode} />
                    <CustomerComments value={values.comments || ""} name="comments" mode={mode} />
                  </Grid>
                </CardContent>
                <CardActions className={classes.actionsContainer}>
                  {/* <div>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importJSONOpen: true })} >Import JSON</Button>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importDMLOpen: true })} >Import DML</Button>
                                    </div> */}
                  <Grid container spacing={2}>
                    {mode !== "create" &&
                      <Grid container item xs>
                        <Typography variant="body2" color="textSecondary">{`Created: ${moment(values.createDt).format('LLLL')} ${moment(values.createDt).fromNow()}`}</Typography>
                      </Grid>
                    }
                    <Grid item >
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
