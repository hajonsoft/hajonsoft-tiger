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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebaseConfig from "../../firebaseConfig";
import { getProfile, updateProfile } from './redux/profileSlice';
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
  const dispatch = useDispatch()
  const history = useHistory();

  const record = useSelector(state => state?.profile?.data);

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch]);

  const onClose = () => history.push("/caravans");

  const handleSubmitForm = async (values, actions) => {
    dispatch(updateProfile({profileData: values}));
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
          values,
          errors,
          touched,
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
                  justifyContent="space-between"
                  spacing={2}
                  style={{ padding: "1rem 2rem" }}
                >
                  <Grid item xs={12}>
                    <InputControl
                      name="name"
                      label="Company Name"
                      value={values.name}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      required={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="email"
                      label="Email Address"
                      required={true}
                      value={values?.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText="Please enter email to enable email notifications (Reservations, visa by proxy, etc...)"
                      disabled={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="tel"
                      required={false}
                      label="Telephone Number"
                      value={values.tel}
                      error={touched.tel && Boolean(errors.tel)}
                      helperText={touched.tel && errors.tel}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="address"
                      required={false}
                      label="Company Address"
                      value={values.address}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      name="facebookPage"
                      label="Facebook Page URL"
                      required={false}
                      value={values.facebookPage || 'facebook.com'}
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
                      required={false}
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
