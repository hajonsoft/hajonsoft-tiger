import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import firebase from "../../../firebaseapp";
import CoreDateField from './CoreDateField';
import CoreTextAreaField from './CoreTextAreaField';
import CoreTextField from "./CoreTextField";
import _ from 'lodash';

const Reserve = () => {
    let { packageName } = useParams();
    const mode = 'create';
    const history = useHistory();
    const handleSubmitForm = async (values, actions) => {
        const customerRef = firebase.database().ref(`public/reserve/${packageName}`);
        customerRef.push(values);
        history.push('/')

    };
    return (
        <Container style={{ marginTop: '5rem' }}>
            <Formik
                initialValues={{ name: '', email: '', tel: '' }}
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
                            <Paper style={{ padding: '2rem' }}>
                                <Typography variant="h4" align="center" gutterBottom>{_.startCase(packageName)}</Typography>
                                <Grid container spacing={2} justify="space-between" alignItems="center">

                                    <CoreTextField value={values.name} name="name" label="Your Name" mode={mode} xsWidth={4} />
                                    <CoreTextField value={values.tel} name="tel" label="Your Number" mode={mode} xsWidth={4} />
                                    <CoreTextField value={values.email} name="email" label="Your Email" mode={mode} xsWidth={4} />

                                    <CoreTextField value={values.departureCity} name="departureCity" label="Departure City" mode={mode} xsWidth={4} />
                                    <CoreTextField value={values.pax} name="pax" label="Number of Companions" mode={mode} xsWidth={4} />
                                    <CoreDateField value={values.departureDate} name="departureDate" label="Departure Date" mode={mode} xsWidth={4} setFieldValue={setFieldValue} />

                                    <CoreTextAreaField value={values.comments} name="comments" label="Your message" mode={mode} xsWidth={12} />
                                </Grid>

                                <Grid container spacing={4} justify="center" style={{marginTop: '2rem'}}>
                                    <Grid item>
                                        <Button
                                            type="button"
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => history.push('/')}
                                            style={{textTransform: 'none'}}
                                            startIcon={<CancelOutlinedIcon />}
                                        >
                                            Cancel
                          </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            variant="contained"
                                            style={{textTransform: 'none'}}
                                            color="primary"
                                            startIcon={<AddOutlinedIcon />}
                                        >
                                            Register
                                </Button>
                                    </Grid>



                                </Grid>
                            </Paper>
                        </Form>
                    )}
            </Formik>
        </Container>
    );
};

export default Reserve
