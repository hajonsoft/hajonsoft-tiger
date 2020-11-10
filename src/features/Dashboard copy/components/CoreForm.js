import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import CoreTextField from '../../customer/components/CoreTextField';
import useUserState from '../../SignIn/redux/useUserState';
import usePackageState from '../redux/usePackageState';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '90%',
        margin: '25px auto',
    },
    cardTitle: {
        textAlign: 'left',
        fontSize: '2em',
        backgroundColor: 'silver',
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'silver',
    },
    actionsContainerTopMain: {
        width: '50%',
        padding: '10px',
    },
    actionsContainerTopButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

const CoreForm = ({ mode, record, title, onClose }) => {


    const classes = useStyles();
    const {createData, updateData, deleteData } = usePackageState();
    const { data: user } = useUserState();

    // const handleImageChange = ()=> {
    //     // TODO: when image changes store it to the database using the record key and its field name
    // }

    const handleSubmitForm = (values, actions) => {
        switch (mode) {
            case 'create':
                createData({ record: values, user, projectId: process.env.REACT_APP_PROJECT_ID, folder: `customer/${values.name}` });
                break;
            case 'update':
                updateData({ record: values, user, projectId: process.env.REACT_APP_PROJECT_ID, folder: `customer/${values.name}`, recordId: record.id});
                break;

            case 'delete':
                deleteData({ record: values, user, projectId: process.env.REACT_APP_PROJECT_ID, folder: `customer/${values.name}`,  recordId: record.id});
                break;

            default:
                console.log('unknown mode')
        }
        onClose()
    }
    return (
        <React.Fragment>
            <Formik
                initialValues={mode === 'create' ? {} : record}
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
                            <CardHeader className={classes.cardTitle}
                                title={_.startCase(mode + ' ' + title)}
                                subheader={record.id}
                                action={
                                    <CancelOutlinedIcon color='secondary' onClick={onClose} />
                                }
                            />
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Grid item container>
                                        <Grid item xs={8} container direction="column" justify="space-around">
                                            <Grid item container justify="space-between" spacing={4}>
                                                <CoreTextField name="name" mode={mode} xsWidth={6} autoFocus />
                                                <CoreTextField name="dest" label="Destination" mode={mode} xsWidth={6} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </CardContent>
                            <CardActions className={classes.actionsContainer}>
                                {/* <div>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importJSONOpen: true })} >Import JSON</Button>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importDMLOpen: true })} >Import DML</Button>
                                    </div> */}


                                <div>
                                    <Button style={{ marginRight: '1rem' }} type="button" disabled={isSubmitting} variant="contained" color='secondary' onClick={onClose} startIcon={<CancelOutlinedIcon />}>Cancel</Button>
                                    {(mode === 'create') && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' startIcon={<AddOutlinedIcon />}>Create</Button>}
                                    {(mode === 'delete') && <Button type="submit" disabled={isSubmitting} variant="contained" color='secondary' startIcon={<DeleteOutlinedIcon />}>Delete</Button>}
                                    {(mode === 'update') && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' startIcon={<SaveOutlinedIcon />}>Save</Button>}
                                </div>
                            </CardActions>
                        </Card>
                    </Form>
                )}

            </Formik>
        </React.Fragment>
    )
}


export default CoreForm;