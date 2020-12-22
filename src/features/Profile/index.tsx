import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebaseConfig from "./../../firebaseConfig";
import firebase from "./../../firebaseapp";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();

  const [record,setRecord] = useState({});

  useEffect(() => {
    firebase.database().ref(`protected/profile`).once('value', snapshot=> {
      if (snapshot.toJSON()) {
        setRecord(snapshot.toJSON())
      }
    })
  }, [])

  const onClose = ()=> history.push('/groups');

  const handleSubmitForm = async (values, actions) => {
    const updateRef = firebase.database().ref(`protected/profile`);
    updateRef.set(values);
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
                action={
                  <CancelOutlinedIcon color="secondary" onClick={onClose} />
                }
              />
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Field as={TextField} label="Name" fullWidth autoFocus name="name" InputLabelProps={{shrink: true}}/>
                  </Grid>
                  <Grid item>
                    <Field as={TextField} label="Telephone" fullWidth name="tel"  InputLabelProps={{shrink: true}}/>
                  </Grid>
                  <Grid item>
                    <Field as={TextField} label="Address" fullWidth name="address"  InputLabelProps={{shrink: true}}/>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.actionsContainer}>
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
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
