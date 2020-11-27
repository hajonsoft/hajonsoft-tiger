import { faHandsHelping, faPassport, faPrint, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { useHistory } from 'react-router-dom';
import firebase from '../../../firebaseapp';
import Statistics from './Statistics';

const PackageDetail = ({ data }) => {
    const history = useHistory()
    const [values, loading, error] = useListVals(firebase.database().ref('customer/' + data.name));

    const onGotoCustomers = () => {
        history.push(`${data.name}/customers`)
    }
    return (
        <Container style={{ padding: '1rem' }} fixed>
            <Paper elevation={2} style={{ padding: '2rem', borderTop: '2px solid black' }}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={10}>
                        <Typography component="span" variant="h6">{data.name}</Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Button style={{ width: '100%' }} color="secondary" variant="contained" endIcon={<NavigateNextIcon />}
                            onClick={onGotoCustomers}>Customers</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{marginBottom: '2rem'}}/>
                    </Grid>
                    <Grid item xs={10} >
                        {loading && <CircularProgress />}
                        {error}
                        {!loading && <Statistics data={values} />}
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={2}>
                        <Grid item>

                            <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPassport} />}>Apply for visa</Button>

                        </Grid>

                        <Grid item>
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faShareSquare} />}
                            > Share</Button>

                        </Grid>

                        <Grid item>
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPrint} />}
                            > Reports</Button>

                        </Grid>

                        <Grid item>
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
                            > Assist</Button>
                        </Grid>

                    </Grid>
                </Grid>



            </Paper>

        </Container >
    )
}

export default PackageDetail
