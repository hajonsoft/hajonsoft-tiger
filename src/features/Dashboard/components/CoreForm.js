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
import React from "react";
import firebase from "../../../firebaseapp";
import CoreTextField from "../../customer/components/CoreTextField";
const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "60%",
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

const CoreForm = ({ mode, record, title, onClose }) => {
  const classes = useStyles();

  const handleSubmitForm = (values, actions) => {
    switch (mode) {
      case "create":
        const customerRef = firebase.database().ref("/customer/" + values.name);
        customerRef.push({ ...values, name: "Default customer" });
        break;
      case "delete":
        const removeRef = firebase.database().ref("/customer/" + values.name);
        removeRef.remove();
        break;

      default:
        console.log("unknown mode");
    }
    onClose();
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={mode === "create" ? {} : record}
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
                subheader={record.id}
                action={
                  <CancelOutlinedIcon color="secondary" onClick={onClose} />
                }
              />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item container>
                    <CoreTextField
                      name="name"
                      value={values.name}
                      mode={mode}
                      xsWidth={12}
                      required
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container justify="flex-end" spacing={2}>
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
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CoreForm;
