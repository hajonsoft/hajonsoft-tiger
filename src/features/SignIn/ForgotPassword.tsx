import { Box, Button, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import allied_logo from '../../images/allied_logo_svg.svg';
// import UserPool from './UserPool';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100vh',
        margin: '0 auto',
        background: 'linear-gradient(180deg, #007EB8 0%, #00547A 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));


const ForgotPassword = () => {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [errorState, setErrorState] = useState({ isError: false, message: '' });


    const emailSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Required'),
    });


    const forgotPasswordSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Required'),
        code: yup.number().required('Required'),
        password: yup.string().required('Required').matches(/[a-z]/, 'At least one lower case character').matches(/[A-Z]/, 'At least one upper case character').matches(/[0-9]/, 'At least one number').matches(/[!@#$%^&*)()]/, 'At least one special character !@#$%^&*()'),
        passwordConfirm: yup.string()
            .oneOf([yup.ref('password'), ''], 'Passwords must match')
    });

    const handleSendCode = (values: any, actions: any) => {

        // const cognitoUser = new CognitoUser({
        //     Username: values.email,
        //     Pool: UserPool
        // });

        // setEmail(values.email);
        // cognitoUser.forgotPassword({
        //     onSuccess: function (data) {
        //         setIsCodeSent(true);
        //         setErrorState({ isError: false, message: '' });

        //     },
        //     onFailure: function (err) {
        //         setErrorState({ isError: true, message: err.message });
        //     }
        // });
        actions.setSubmitting(false);

    }

    const handleChangePassword = (values: any, actions: any) => {

        // const cognitoUser = new CognitoUser({
        //     Username: values.email,
        //     Pool: UserPool
        // });

        // cognitoUser.confirmPassword(values.code, values.password, {
        //     onSuccess() {
        //         history.push('/login');
        //     },
        //     onFailure(err) {
        //         setErrorState({ isError: true, message: err.message });

        //     },
        // });
        // actions.setSubmitting(false);

    }
    return (
        <div className={classes.container}>
            <Paper style={{ width: '40%' }}>
                <Grid container direction="column" alignItems="stretch" justify="center" spacing={4} alignContent="center" >

                    <Grid item>
                        <Box p={4} style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={allied_logo} alt="Allied logo"></img>
                        </Box>
                        <Box p={2}>

                            <Typography color="textPrimary" align="center" >Forgot your password?</Typography>
                        </Box>
                        <Box>

                            <Typography align="center" color="textSecondary" >{`${isCodeSent ? 'Please enter the verification code and choose a new password' : 'Please enter your registered email address.'}`}</Typography>
                        </Box>
                    </Grid>

                    {!isCodeSent &&
                        <Grid item >

                            <Formik
                                initialValues={{ email: '' }}
                                validationSchema={emailSchema}
                                onSubmit={handleSendCode}
                            >
                                {({ handleSubmit }) => (
                                    <Form>
                                        <Box p={2}>
                                            <Grid container direction="column" spacing={2}>
                                                <Grid item container justify="space-between" spacing={2} alignItems="center">
                                                    <Grid item xs={12}>
                                                        <Field name="email" label="Username or email address" as={TextField} variant="outlined" fullWidth></Field>
                                                        <Box style={{ color: '#C13636' }}>
                                                            <ErrorMessage name="email" />
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                {errorState.isError &&

                                                    <Grid item>

                                                        <Alert severity="error">{`${errorState.message}`}</Alert>
                                                    </Grid>
                                                }
                                            </Grid>
                                            <Box mt={2}>

                                                <Button variant="contained" color="primary" type="submit" fullWidth>Send Code</Button>
                                            </Box>
                                        </Box>
                                    </Form>
                                )
                                }
                            </Formik>

                        </Grid>
                    }

                    {isCodeSent &&

                        <Grid item xs>
                            <Formik
                                style={{ width: '100%' }}
                                initialValues={{ email: email, code: '', password: '', passwordConfirm: '' }}
                                validationSchema={forgotPasswordSchema}
                                onSubmit={handleChangePassword}
                            >
                                {({ handleSubmit }) => (
                                    <Form style={{ width: '100%' }}>
                                        <Grid container direction="column" spacing={2} alignItems="stretch" justify="center" style={{ width: '100%' }}>
                                            <Grid item> <Field
                                                fullWidth
                                                as={TextField}
                                                variant="outlined"
                                                name="email"
                                                label="Email Address"
                                                disabled
                                            />
                                                <Box style={{ color: '#C13636' }}>
                                                    <ErrorMessage name="email" />
                                                </Box>
                                            </Grid>
                                            <Grid item > <Field
                                                fullWidth
                                                as={TextField}
                                                variant="outlined"
                                                name="code"
                                                label="Email Code"
                                            />
                                                <Box style={{ color: '#C13636' }}>


                                                    <ErrorMessage name="code" />
                                                </Box>
                                            </Grid>
                                            <Grid item > <Field
                                                fullWidth
                                                as={TextField}
                                                variant="outlined"
                                                name="password"
                                                type="password"
                                                label="Password"
                                            />
                                                <Box style={{ color: '#C13636' }}>


                                                    <ErrorMessage name="password" />
                                                </Box>
                                            </Grid>

                                            <Grid item > <Field
                                                fullWidth
                                                variant="outlined"
                                                type="password"
                                                as={TextField}
                                                label="Re-type password"
                                                name="passwordConfirm"
                                            />
                                                <Box style={{ color: '#C13636' }}>


                                                    <ErrorMessage name="passwordConfirm" />
                                                </Box>

                                            </Grid>


                                            {errorState.isError &&

                                                <Grid item>

                                                    <Alert severity="error">{`${errorState.message}`}</Alert>
                                                </Grid>
                                            }

                                            <Grid item container spacing={2}>
                                                <Grid item>
                                                    <Button type="submit" color="primary" variant="contained" style={{ borderRadius: '8px' }}>Confirm password</Button>

                                                </Grid>
                                                {!errorState.isError &&


                                                    <Grid item>
                                                        <Alert severity="success">Code sent!</Alert>
                                                    </Grid>
                                                }
                                            </Grid>


                                        </Grid>

                                    </Form>
                                )
                                }
                            </Formik>

                        </Grid>
                    }
                    <Grid item>
                        <Typography align="center">
                            <Box mb={4}>

                                <Link href="#" onClick={() => history.push('login')}>Return to login</Link>
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div >
    )
}

export default ForgotPassword
