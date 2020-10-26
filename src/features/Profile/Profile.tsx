// import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  Divider,
  Hidden,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Alert from "@material-ui/lab/Alert";
import "date-fns";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import lisa_logo_sm from "../../images/logo_mobile.jpg";
import HajonsoftHeader from "../Header/HajonsoftHeader";
import useUserState from "../SignIn/redux/useUserState";
import profileService from "./profileService";


const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    background: "linear-gradient(#DEE7EB, white)",
  },
}));

const phoneDescriptions = [
  { value: 0, description: "Home" },
  { value: 2, description: "Emergency" },
  { value: 7, description: "Office" },
  { value: 9, description: "Other" },
  { value: 13, description: "Cell Phone" },
  { value: 16, description: "Home and Emergency" },
  { value: 17, description: "Cell and Emergency" },
  { value: 22, description: "Primary" },
  { value: 24, description: "AUS Company Cell" },
];

const svc = profileService();

const Profile = () => {

  let initialEmployee: { id: number; is_opt: boolean; employee_number: number, name: string, last_name: string, phone_number: string, phone1_description: string, email: string } = {
    id: 0,
    is_opt: false,
    employee_number: 0,
    name: '',
    last_name: '',
    phone_number: '',
    phone1_description: '',
    email: ''
  };

  const { data: user } = useUserState();
  const [employee, setEmployee] = useState(initialEmployee);
  const [isError, setIsError] = React.useState(false);
  const classes = useStyles();

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };

  useEffect(() => {
    async function getEmployee() {
      try {
        const result = await svc.getEmployeeById(
          user?.idToken?.payload["profile"]
        );
        result.email = user?.idToken?.payload["email"]
        setEmployee(result);
      } catch {
        setIsError(true);
      }
    }
    getEmployee();
  }, [user]);


  const handleSubscribeToSMS = (e: any) => {
    if (employee && employee.id) {
      try {
        employee.is_opt = e.target.checked;
        setEmployee(employee);
      } catch (err) {
        setIsError(true);
      }
      //open sms alert here when set to true
    }
  };

  return (
    <React.Fragment>
      <HajonsoftHeader />
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid item xs={12} sm={1}>
            <img src={lisa_logo_sm} alt="lisa logo" style={{margin: "10px"}}></img>
          </Grid>
          <Grid item xs={12} sm={11} container direction="column">
            <Grid item>
              <Tabs value={0} indicatorColor="secondary">
                <Tab label="Profile" />
                <Tab label="Choice 2" />
              </Tabs>
            </Grid>
            <Grid item container justify="center">
              <Grid item xs={12} md={6} key={employee?.id}>
                <ProfileForm data={employee} smsOptStatus={true} />
              </Grid>
              <Grid item xs={10} md={1}>
                <Hidden smDown>
                    <Divider orientation="vertical" />
                </Hidden>
                <Hidden mdUp>
                    <Divider orientation="horizontal" />
                </Hidden>
              </Grid>
              <Grid item xs={10} md={4} container direction="column" justify="center">
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    Account-related notifications
                  </Typography>
                  <Typography variant="body2">
                  Thanks for your interest in using the LISA Web Portal! As an employee of HajOnSoft, 
                  you can use this system as a resource for accessing and updating information and personal 
                  preferences about scheduling, job opportunities, and other employment-related matters. 
                  You can also update your contact information and opt-in and out of various contact methods. 
                  You are not required to use this system — participation is 100% optional. 
                  </Typography>
                </Grid>

                <Grid item container>
                  <Grid item xs={4}>
                    <Typography>Receive SMS messages</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      color="primary"
                      onChange={handleSubscribeToSMS}
                      checked={employee?.is_opt}
                    />
                  </Grid>
                </Grid>
                <Box display="none"> //no feature to email messages. remove for now....
                <Grid item container>
                  <Grid item xs={4}>
                    <Typography>Email messages</Typography>
                  </Grid>
                  <Grid item>
                    <Switch color="primary" />
                  </Grid>
                </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          Server Error: Unable to reach server! Please try again.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

const ProfileForm = ({ data }: any, { opt }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [employee, setEmployee] = useState(data);
  const [isError, setIsError] = React.useState(false);
  
  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };
  return (
    <div>
      <Formik
        initialValues={employee}
        onSubmit={async (values, actions) => {
          try {
            // await svc.updateEmployee(employee.id, { ...employee, json_data: JSON.stringify(values) });
            //setEmployee((prev: any) => ({ ...prev, json_data: { ...values } }));
           await svc.updateEmployee(values.id, values);
           let updated = await svc.getEmployeeById(values.id);
            setEmployee(updated);
          } catch {
            setIsError(true);
          }
          setIsEdit(false);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <Grid container direction="column">
              <Grid
                container
                item
                justify="space-between"
                >
                <Grid item xs={9}>
                  <Typography variant="h5">{`${employee?.name} ${employee?.last_name}`}</Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                  >{`${employee?.email}`}</Typography>

                  {isEdit && (
                    <>
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                      >
                        <Grid item>
                          <Field
                            name="name"
                            label="First Name"
                            as={TextField}
                            variant="outlined"
                            style={{ borderRadius: "16px" }}
                          ></Field>
                        </Grid>
                        <Grid item>
                          <Field
                            name="middle_name"
                            label="Middle Name"
                            as={TextField}
                            variant="outlined"
                          ></Field>
                        </Grid>
                        <Grid item>
                          <Field
                            name="last_name"
                            label="Last name"
                            as={TextField}
                            variant="outlined"
                          ></Field>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={3}
                  container
                  justify="center"
                  alignItems="flex-start"
                >
                  {!isEdit && (
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      style={{
                        borderRadius: "8px",
                      }}
                      onClick={() => setIsEdit(true)}
                    >
                      Edit
                    </Button>
                  )}

                  {isEdit && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disableElevation
                      style={{ borderRadius: "8px" }}
                    >
                      Done
                    </Button>
                  )}
                </Grid>
              </Grid>

              <Grid container item>
                <Grid item>
                  {isEdit && (
                    <>
                      <Field
                        name="phone_number"
                        as={TextField}
                        variant="outlined"
                        label="Phone number"
                      >
                      </Field>
                   
                    </>
                  )}
                  {!isEdit && (
                    <>
                      <Typography color="textSecondary">
                        Phone number
                      </Typography>
                      <Typography>
                        <NumberFormat value={employee?.phone_number} format="(###) ###-####" displayType={'text'} />
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={4}>
                  {false && ( //isEdit
                    <>
                      <Field
                        name="phone1_description"
                        as={Select}
                        variant="outlined"
                        label="Description"
                        fullWidth
                      >
                        {phoneDescriptions.map((d) => (
                          <MenuItem value={d.value}>{d.description}</MenuItem>
                        ))}
                      </Field>
                    </>
                  )}
                  {true && ( //!isEdit
                    <>
                      <Typography color="textSecondary">Description</Typography>
                      <Typography>
                        {
                          phoneDescriptions.find(
                            (d) => d.value === employee?.phone1_description
                          )?.description
                        }
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
              <Box display="none">
              <Grid container item >
                <Grid item>
                  {isEdit && (
                    <>
                      <Field
                        name="phone2"
                        as={TextField}
                        variant="outlined"
                        label="Phone number"
                      ></Field>
                    </>
                  )}
                  {!isEdit && (
                    <>
                      <Typography color="textSecondary">
                        Phone number
                      </Typography>
                      <Typography>{`${employee?.phone2}`}</Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={4}>
                  {isEdit && (
                    <>
                      <Field
                        name="phone2_description"
                        as={Select}
                        variant="outlined"
                        label="Description"
                        fullWidth
                      >
                        {phoneDescriptions.map((d) => (
                          <MenuItem value={d.value}>{d.description}</MenuItem>
                        ))}
                      </Field>
                    </>
                  )}
                  {!isEdit && (
                    <>
                      <Typography color="textSecondary">Description</Typography>
                      <Typography>
                        {
                          phoneDescriptions.find(
                            (d) => d.value === employee?.phone2_description
                          )?.description
                        }
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid container item >
                <Grid item>
                  {isEdit && (
                    <>
                      <Field
                        name="phone2"
                        as={TextField}
                        variant="outlined"
                        label="Phone number"
                      ></Field>
                    </>
                  )}
                  {!isEdit && (
                    <>
                      <Typography color="textSecondary">
                        Phone number
                      </Typography>
                      <Typography>{employee?.phone2}</Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={4}>
                  {isEdit && (
                    <>
                      <Field
                        name="phone2_description"
                        as={Select}
                        variant="outlined"
                        label="Description"
                        fullWidth
                      >
                        {phoneDescriptions.map((d) => (
                          <MenuItem value={d.value}>{d.description}</MenuItem>
                        ))}
                      </Field>
                    </>
                  )}
                  {!isEdit && (
                    <>
                      <Typography color="textSecondary">Description</Typography>
                      <Typography>Office main</Typography>
                    </>
                  )}
                </Grid>
              </Grid>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>

      <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          Server Error: Unable to save employee! Please try again.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
