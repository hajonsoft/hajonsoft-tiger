import { faHandsHelping, faPassport, faPrint, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress, Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import useTravellerState from '../redux/useTravellerState';
import BioStatistics from './BioStatistics';
import NationalityStatistics from './NationalityStatistics';

//TODO: Redesign, talk to customers to get feedback
const PackageDetail = ({ data }) => {
    const { data: values, loading, error } = useTravellerState()

    return (
        <Container style={{ padding: '1rem' }} fixed>
            <Paper style={{ padding: '2rem' }}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        {loading && <CircularProgress />}
                        {error}
                        {!loading && <BioStatistics data={Object.values(values[data.name])} />}
                    </Grid>
                    <Grid item>
                        {loading && <CircularProgress />}
                        {error}
                        {!loading && <NationalityStatistics data={Object.values(values[data.name])} />}
                    </Grid>
                    <Grid item >
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                                <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPassport} />}>Apply for visa</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faShareSquare} />}
                                > Share</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPrint} />}
                                > Reports</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
                                > Assist</Button>
                            </Grid>

                        </Grid></Grid>
                </Grid>
            </Paper>
        </Container >
    )
}

export default PackageDetail
