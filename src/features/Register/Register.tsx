import {
  Box,
  Button,
  Checkbox,
  Grid,
  Link,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import lisa_log_sm from "../../images/lisa_logo_sm.svg";
import AlliedHeader from "../Header/AlliedHeader";
// import UserPool from "../SignIn/UserPool";
import identityService from "./redux/saga/identityService";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    margin: "0 auto",
    paddingTop: '1rem',
    background: "linear-gradient(#DEE7EB, white)",
  },
}));

const phoneDescriptions = [
  { value: 13, description: "Cell Phone" },
  { value: 24, description: "AUS Company Cell" },
  { value: 17, description: "Cell and Emergency" },
];

const Register = () => {
  const mobileMedia = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const identitySvc = identityService();

  let initialEmployee: {
    id: number;
    is_opt: boolean;
    employee_number: number;
    name: string;
    last_name: string;
    phone_number: string;
    phone1_description: string;
    email: string;
  } = {
    id: 0,
    is_opt: false,
    employee_number: 0,
    name: "",
    last_name: "",
    phone_number: "",
    phone1_description: "",
    email: "",
  };
  const [failCounter, setFailCounter] = useState(0);
  const [emp, setEmp] = useState(initialEmployee);
  const [fpValue, setFPValue] = useState("");
  const [regLocked, setRegLocked] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [regSubmit, setRegSubmit] = useState(false);
  const [isSmsAlertOpen, setIsSmsAlertOpen] = useState(true);

  const handleSMSCheckboxClick = (values: any) => {
    if (!values.is_opt) {
      setIsSmsAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    history.push("/");
  };

  const [state, setState] = useState({
    isRegistrationError: false,
    isCreatePasswordError: false,
    message: "",
    isInvalidCode: false,
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();


  const signupSchema = yup.object().shape({
    lastName: yup
      .string()
      .required("Required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    birthDate: yup.string().required("Required"),
    SSN6: yup
      .string()
      .required("Enter last 6 digits of your social security number"),
  });

  const createAccountSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Required"),
    password: yup
      .string()
      .required("Required")
      .matches(/[a-z]/, "At least one lower case character")
      .matches(/[A-Z]/, "At least one upper case character")
      .matches(/[0-9]/, "At least one number")
      .matches(/[!@#$%^&*)()]/, "At least one special character !@#$%^&*()"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  });

  const setupProfileSchema = yup.object().shape({
    phone_number: yup.string().required("required"),
    phone1_description: yup.number().required("required"),
  });

  const codeSchema = yup.object().shape({
    code: yup.number().required("required"),
  });

  const handleVerify = async (registrationInfo: any, setValues: any) => {
    // setRegSubmit(true);
    // const profileSvc = profileService();
    // const employeeNumber: any = await identitySvc.verifyEmployee(
    //   registrationInfo.lastName,
    //   registrationInfo.birthDate,
    //   registrationInfo.SSN6,
    //   fpValue
    // );
    // if (employeeNumber) {
    //   const foundEmployee = await profileSvc.getEmployeeById(employeeNumber);
    //   if (foundEmployee) {
    //     setEmp({ ...foundEmployee, employee_number: employeeNumber });
    //     setValues({
    //       ...registrationInfo,
    //       phone_number: employeeNumber["phone_number"],
    //       phone1_description: employeeNumber["phone1_description"],
    //       is_opt: employeeNumber["is_opt"],
    //       email: "",
    //     });
    //     setActiveStep(1);
    //     setRegSubmit(false);
    //     return;
    //   }
    // } else {
    //   setFailCounter(failCounter + 1);
    // }
    // // error handling
    // setState({
    //   isRegistrationError: true,
    //   message: "Verification error: Please review information provided!",
    //   isCreatePasswordError: false,
    //   isInvalidCode: false,
    // });
    // setRegSubmit(false);
  };

  const handleCreateAccount = async (values: any, actions: any) => {
    setEmp((prev) => ({ ...prev, email: values.email }));
    const attributeList = [];

    var dataEmployeeNumber = {
      Name: "profile",
      Value: emp?.id + "",
    };
    var dataEmail = {
      Name: "email",
      Value: values.email,
    };
    var dataName = {
      Name: "name",
      Value: emp?.name + " " + emp?.last_name,
    };
    var attributeEmployeeNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmployeeNumber
    );
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    );
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataName
    );

    attributeList.push(attributeEmployeeNumber);
    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    // UserPool.signUp(
    //   values.email,
    //   values.password,
    //   attributeList,
    //   null,
    //   function(err: any, result: any) {
    //     if (err) {
    //       setState((prev) => ({
    //         ...prev,
    //         isCreatePasswordError: true,
    //         message: err.message,
    //       }));
    //       return;
    //     }
    //     var userSignedUp = result.user;
    //     console.log("user name is " + userSignedUp.getUsername());
    //     setActiveStep(2);
    //   }
    // );
  };

  const handleConfirmEmail = async (values: any, actions: any) => {
//     var userData = {
//       Username: emp.email,
//       Pool: UserPool,
//     };

//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.confirmRegistration(values.code, true, function(
//       err: any,
//       result: any
//     ) {
//       if (err) {
//         setState((prev) => ({
//           ...prev,
//           isCreatePasswordError: false,
//           isInvalidCode: true,
//           isRegistrationError: false,
//           message: err.message,
//         }));
//         return;
//       }
// //      const profileSvc = profileService();
//       /*       emp.email = userData.Username;
//       setEmp(emp);
//       profileSvc.updateEmployee(emp.id.toString(), emp); */
//       console.log("call result: " + result);
//       setActiveStep((ac) => ac + 1);
//     });
  };
  const handlePhoneNumbers = async (values: any, setValues: any) => {
    // const svc = profileService();
    // await svc.updateSMSOptStatus(emp.employee_number, {
    //   employee_number: emp.employee_number,
    //   phone_number: values.phone_number,
    //   opt_status: values.is_opt,
    // });
    // setActiveStep((ac) => ac + 1);
  };

  return (
    <React.Fragment>

      <AlliedHeader />
    <div className={classes.container}>


      <Box  pl={6} >
        <Grid container spacing={8} md={10} xs={12}>
          {!mobileMedia && (
            <Grid item>
              <img src={lisa_log_sm} alt="Lisa logo"></img>
            </Grid>
          )}
          <Grid item xs>
            {!mobileMedia && (
              <Tabs value={0} indicatorColor="primary" textColor="primary">
                <Tab
                  label="Registration"
                  style={{ textTransform: "none" }}
                  color="primary"
                />
              </Tabs>
            )}

            <RegistrationSteps activeStep={activeStep} />

            <Grid container justify="center" alignItems="center">
              {activeStep === 0 && (
                <div
                  style={{
                    width: "90%",
                    margin: "0 auto",
                    backgroundColor: "transparent",
                  }}
                >
                  <Typography gutterBottom variant="h6">
                    <Box mb={2}>Verification</Box>
                  </Typography>
                  <Formik
                    initialValues={{ lastName: "", birthDate: "", SSN6: "" }}
                    validationSchema={signupSchema}
                    onSubmit={(values, actions) => {
                      handleVerify(values, actions.setValues);
                      actions.setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <Form>
                        <Grid container direction="column" spacing={2}>
                          <Grid item xs={12} md={3}>
                            <Field
                              fullWidth
                              as={TextField}
                              variant="outlined"
                              name="lastName"
                              label="Last Name"
                            />
                            <Box style={{ color: "#C13636" }}>
                              <ErrorMessage name="lastName" />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              fullWidth
                              as={TextField}
                              name="birthDate"
                              label="Birth Date"
                              variant="outlined"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              type="date"
                            />
                            <Box style={{ color: "#C13636" }}>
                              <ErrorMessage name="birthDate" />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              fullWidth
                              variant="outlined"
                              as={TextField}
                              InputProps={{
                                inputComponent: SSN6Component,
                              }}
                              label="Social Security (Last 6)"
                              name="SSN6"
                            />
                            <Box style={{ color: "#C13636" }}>
                              <ErrorMessage name="SSN6" />
                            </Box>
                          </Grid>
                          {state.isRegistrationError && (
                            <Grid item>
                              <Alert severity="error">{state.message}</Alert>
                            </Grid>
                          )}
                          <Grid item>
                            <Button
                              type="submit"
                              color="primary"
                              size="large"
                              variant="contained"
                              style={{ borderRadius: "8px" }}
                            >
                              Verify
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {activeStep === 1 && (
                <div
                  style={{
                    width: "90%",
                    margin: "0 auto",
                    backgroundColor: "transparent",
                  }}
                >
                  <Typography gutterBottom variant="h6">
                    <Box mb={2}>{`Hello ${emp.name} ${
                      emp.last_name !== null ? emp.last_name : ""
                    }!`}</Box>
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    <Box mb={2}>{`Let's create your account.`}</Box>
                  </Typography>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      passwordConfirm: "",
                    }}
                    validationSchema={createAccountSchema}
                    onSubmit={(values, actions) => {
                      handleCreateAccount(values, actions.setValues);
                      actions.setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <Form>
                        <Grid container direction="column" spacing={2}>
                          <Grid item xs={12} md={3}>
                            {" "}
                            <Field
                              fullWidth
                              as={TextField}
                              variant="outlined"
                              name="email"
                              helperText="Please check your email inbox for a verification code..."
                              label="Email Address"
                            />
                            <Box style={{ color: "#C13636" }}>
                              <ErrorMessage name="email" />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            {" "}
                            <Field
                              fullWidth
                              as={TextField}
                              variant="outlined"
                              name="password"
                              type="password"
                              label="Password"
                            />
                            <Box style={{ color: "#C13636" }}>
                              <ErrorMessage name="password" />
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Field
                              fullWidth
                              variant="outlined"
                              type="password"
                              as={TextField}
                              label="Re-type password"
                              name="passwordConfirm"
                            />
                            <Box style={{ color: "#C13636" }}>
                              <ErrorMessage name="passwordConfirm" />
                            </Box>
                            <Typography color="textSecondary">
                              <ul>
                                <li>Between 8 and 32 characters</li>
                                <li>Lowercase letter (a-z)</li>
                                <li>Uppercase letter (A-Z)</li>
                                <li>Number (0-9)</li>
                                <li>Special character (e.g.,#,@,&)</li>
                                <li>Both passwords match</li>
                              </ul>
                            </Typography>
                          </Grid>

                          {state.isCreatePasswordError && (
                            <Grid item>
                              <Alert severity="error">{state.message}</Alert>
                            </Grid>
                          )}

                          <Grid item container spacing={2}>
                            <Grid item>
                              <Button
                                type="submit"
                                color="primary"
                                size="large"
                                variant="contained"
                                style={{ borderRadius: "8px" }}
                              >
                                Register
                              </Button>
                            </Grid>

                            <Grid item>
                              <Button
                                color="secondary"
                                size="large"
                                variant="outlined"
                                style={{ borderRadius: "8px" }}
                                onClick={() => setActiveStep((s) => s - 1)}
                              >
                                Back
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {activeStep === 2 && (
                <div
                  style={{
                    width: "90%",
                    margin: "0 auto",
                    backgroundColor: "transparent",
                  }}
                >
                  <Typography gutterBottom variant="h6">
                    <Box mb={2}>Confirm Email</Box>
                  </Typography>
                  <Formik
                    initialValues={{ code: "" }}
                    validationSchema={codeSchema}
                    onSubmit={(values, actions) => {
                      handleConfirmEmail(values, actions.setValues);
                      actions.setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <Form>
                        <Grid container direction="column" spacing={2}>
                          <Grid item xs={12} md={3}>
                            <Field
                              fullWidth
                              as={TextField}
                              variant="outlined"
                              name="code"
                              label="Email Code"
                            />
                            <Box style={{ color: "#C13636" }}>
                              <ErrorMessage name="email" />
                            </Box>
                          </Grid>

                          {state.isInvalidCode && (
                            <Grid item>
                              <Alert severity="error">{state.message}</Alert>
                            </Grid>
                          )}

                          <Grid item container spacing={2}>
                            <Grid item>
                              <Button
                                type="submit"
                                color="primary"
                                size="large"
                                variant="contained"
                                style={{ borderRadius: "8px" }}
                              >
                                Confirm
                              </Button>
                            </Grid>

                            <Grid item>
                              <Alert severity="success">{`Registration successful. Please check your email.`}</Alert>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {activeStep === 3 && (
                <div
                  style={{
                    width: "90%",
                    margin: "0 auto",
                    backgroundColor: "transparent",
                  }}
                >
                  <Typography gutterBottom variant="h6">
                    <Box mb={2}>Setup Profile</Box>
                  </Typography>
                  <Formik
                    initialValues={{
                      phone_number: emp.phone_number,
                      phone1_description: emp.phone1_description,
                      is_opt: true,
                    }}
                    validationSchema={setupProfileSchema}
                    onSubmit={(values, actions) => {
                      handlePhoneNumbers(values, actions.setValues);
                      actions.setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <Form>
                        <div>
                          {JSON.stringify(props.setFieldValue, null, 2)}
                        </div>

                        <Grid container spacing={2} direction="column">
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={3}>
                                <Field
                                  as={TextField}
                                  name="phone_number"
                                  variant="outlined"
                                  label="Phone number"
                                  fullWidth
                                />
                              </Grid>
                                 <Grid item xs={12} md={3}>
                                <Box mx={2}>
                                  <Field
                                    as={Select}
                                    name="phone1_description"
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                  >
                                    {phoneDescriptions.map((d) => (
                                      <MenuItem value={d.value}>
                                        {d.description}
                                      </MenuItem>
                                    ))}
                                  </Field>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                container
                                spacing={2}
                                alignItems="center"
                              >
                                <Grid item>
                                  <Field
                                    name="is_opt"
                                    type="checkbox"
                                    as={Checkbox}
                                    onClick={() =>
                                      handleSMSCheckboxClick(props.values)
                                    }
                                    color="primary"
                                    size="large"
                                  ></Field>
                                </Grid>
                                <Grid item xs>
                                  <Typography variant="h6" color="primary">
                                    Receive SMS notifications
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Box p={2}>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      I give Allied Universal, its affiliates
                                      and subsidiaries, and their service
                                      providers, permission to contact me at
                                      this phone number about job opportunities,
                                      staffing, scheduling, or other
                                      promotional, marketing or
                                      employment-related matters by autodialed
                                      phone call or text message. I understand
                                      that I am not required to give my consent
                                      as a condition of employment or the
                                      provision of any services, that the number
                                      and timing of messages or phone calls I
                                      receive may vary, and that message, data,
                                      and calling rates may apply.
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item container spacing={2}>
                            <Grid item>
                              <Button
                                type="submit"
                                color="primary"
                                size="large"
                                variant="contained"
                                style={{ borderRadius: "8px" }}
                              >
                                Finish
                              </Button>
                            </Grid>

                            <Grid item>
                              <Alert severity="success">{`Email confirmed! `}</Alert>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {activeStep === 4 && (
                <Grid container spacing={4} direction="column">
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Registration Complete
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary"
                      style={{ borderRadius: "8px" }}
                      onClick={() => history.push("/login")}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
    </React.Fragment>
  );
};

function SSN6Component(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="##-####"
      showMask
      mask="_"
    />
  );
}

const RegistrationSteps = (props: any) => {
  const mobileMedia = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const steps = [
    "Verification",
    "Create Account",
    "Confirm Email",
    "Setup Profile",
    "Registration complete",
  ];

  const calculateLabel = (label: string, index: number) => {
    if ((mobileMedia && props.activeStep === index) || !mobileMedia) {
      return label;
    }
    return "";
  };

  return (
    <Stepper
      activeStep={props.activeStep}
      style={{ backgroundColor: "transparent" }}
    >
      {steps.map((step: string, index: number) => (
        <Step key={step}>
          <StepLabel>{calculateLabel(step, index)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
export default Register;