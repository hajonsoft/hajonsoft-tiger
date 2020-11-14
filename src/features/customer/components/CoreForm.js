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
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../../firebaseapp";
import CoreImage from "./CoreImage";
import CoreTextField from "./CoreTextField";
import CoreDateField from "./CoreDateField";
import Dropzone from "./Dropzone";
import { current } from "@reduxjs/toolkit";

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

const CoreForm = ({ mode, record, customerKey, title, onClose }) => {
  const classes = useStyles();
  let { packageName } = useParams();
  const [currentImport, setCurrentImport] = useState(null);
  // const handleImageChange = ()=> {
  //     // TODO: when image changes store it to the database using the record key and its field name
  // }
  const handleSubmitForm = async (values, actions, callback = onClose) => {
    let recordKey = customerKey;
    let image = values.image;
    delete values["image"];
    switch (mode) {
      case "create":
        const customerRef = firebase.database().ref(`customer/${packageName}`);
        let snap = await customerRef.push(values);
        recordKey = snap.key;
        break;
      case "update":
        const updateRef = firebase.database().ref(`customer/${packageName}`);
        delete values.tableData;
        updateRef.child(customerKey).update(values);
        break;

      case "delete":
        const removeRef = firebase.database().ref(`customer/${packageName}`);
        removeRef.child(customerKey).remove();
        break;

      default:
        console.log("unknown mode");
    }
    if (image) {
      const metadata = {
        contentType: "image/jpeg",
      };
      let ref = storage.ref(`${packageName}/${recordKey}.jpg`);
      ref
        .put(image, metadata)
        .then((snap) => {
          callback({ success: true });
        })
        .catch((error) => {
          callback({ error });
        });
    } else {
      callback();
    }
  };
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={currentImport ? currentImport : mode === "create" ? {} : record}
        onSubmit={handleSubmitForm}
      >
        {({
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
                <Grid container spacing={4}>
                  <Grid item container>
                    <Grid item xs={4}>
                      <CoreImage
                        packageName={packageName}
                        customerKey={customerKey}
                        record={currentImport ? currentImport : record}
                      />
                    </Grid>
                    <Grid item xs={8} container direction="column" justify="space-around">
                      <Grid item container justify="space-between" spacing={4}>
                        <CoreTextField
                          name="name"
                          mode={mode}
                          xsWidth={6}
                          autoFocus
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
                        <CoreTextField
                          name="nationality"
                          mode={mode}
                          xsWidth={6}
                          value={values.nationality || ""}
                        />
                        <CoreTextField name="gender" mode={mode} xsWidth={6} />
                      </Grid>
                      <Grid item container justify="space-between" spacing={4}>
                        <CoreTextField
                          name="passportNumber"
                          mode={mode}
                          xsWidth={6}
                          value={values.passportNumber || ""}
                        />
                        <CoreDateField
                          name="passExpireDt"
                          mode={mode}
                          xsWidth={6}
                          value={values.passExpireDt || ""}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <CoreTextField value={values.birthDate || ""} name="birthDate" mode={mode} />
                  <CoreTextField value={values.birthPlace || ""} name="birthPlace" mode={mode} />
                  <CoreTextField
                    value={values.passPlaceOfIssue || ""}
                    name="passPlaceOfIssue"
                    mode={mode}
                  />
                  <CoreTextField value={values.idNumber || ""} name="idNumber" mode={mode} />
                  <CoreDateField
                    value={values.idNumberIssueDate || ""}
                    name="idNumberIssueDate"
                    mode={mode}
                  />
                  <CoreDateField
                    value={values.idNumberExpireDate || ""}
                    name="idNumberExpireDate"
                    mode={mode}
                  />
                  <CoreDateField value={values.passIssueDt || ""} name="passIssueDt" mode={mode} />
                  <CoreTextField value={values.profession || ""} name="profession" mode={mode} />
                  <CoreDateField value={values.CreateDt || ""} name="CreateDt" mode={mode} />
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
                  <CoreTextField value={values.phone || ""} name="phone" mode={mode} />
                  <CoreTextField value={values.email || ""} name="email" mode={mode} />
                </Grid>
              </CardContent>
              <CardActions className={classes.actionsContainer}>
                {/* <div>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importJSONOpen: true })} >Import JSON</Button>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importDMLOpen: true })} >Import DML</Button>
                                    </div> */}
                <Grid container spacing={2}>
                  <Grid container item xs>
                    {mode === "create" && (
                      <Dropzone
                        onClose={onClose}
                        saveToFirebase={handleSubmitForm}
                        packageName={packageName}
                        setCurrentImport={setCurrentImport}
                      ></Dropzone>
                    )}
                  </Grid>
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
