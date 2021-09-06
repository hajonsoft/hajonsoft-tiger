import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebaseapp";
import firebaseConfig from "../../firebaseConfig";
// import InputControl from "./InputControl";
import InputControl from "../Reservation/components/InputControl";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "75%",
    margin: "50px auto",
  },
  cardTitle: {
    textAlign: "left",
    fontSize: "2em",
    backgroundColor: "white",
    borderBottom: "1px solid #ccc",
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

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();

  const [record, setRecord] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref(`protected/profile`)
      .once("value", (snapshot) => {
        if (snapshot.toJSON()) {
          setRecord(snapshot.toJSON());
        }
      });
  }, []);

  const onClose = () => history.push("/caravans");

  const handleSubmitForm = async (values, actions) => {
    const updateRef = firebase.database().ref(`protected/profile`);
    updateRef.set(values).catch((err) => {
      alert(err.message);
    });
    onClose();
  };
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={record}
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
                title={`${firebaseConfig.projectId} Profile`}
                action={<CancelOutlinedIcon color="error" onClick={onClose} />}
              />
              <CardContent>
                <Grid
                  container
                  justify="space-between"
                  spacing={2}
                  style={{ padding: "1rem 2rem" }}
                >
                  <Grid item xs={12}>
                    <InputControl
                      name="name"
                      label="Company Name"
                      required
                      value={values.name}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="email"
                      label="Email Address"
                      required
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText="This email address will be used to communicate with you when you send visa by proxy request"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="tel"
                      label="Telephone Number"
                      required
                      value={values.tel}
                      error={touched.tel && Boolean(errors.tel)}
                      helperText={touched.tel && errors.tel}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="address"
                      label="Company Address"
                      required
                      value={values.address}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="facebookPage"
                      label="Facebook Page URL"
                      required
                      value={values.facebookPage}
                      error={
                        touched.facebookPage && Boolean(errors.facebookPage)
                      }
                      helperText={touched.facebookPage && errors.facebookPage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="about"
                      label="About Us"
                      required
                      value={values.about}
                      error={touched.about && Boolean(errors.about)}
                      multiline
                      helperText={touched.about && errors.about}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.actionsContainer}>
                <Button
                  type="button"
                  disabled={isSubmitting}
                  variant="outlined"
                  color="default"
                  style={{ color: "red", borderColor: "red" }}
                  onClick={onClose}
                  startIcon={<CancelOutlinedIcon />}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outlined"
                  color="primary"
                  startIcon={<SaveOutlinedIcon />}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default Profile;
