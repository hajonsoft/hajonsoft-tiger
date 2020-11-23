import { faHandsHelping, faPassport, faPrint, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, CircularProgress, Container, Grid } from '@material-ui/core';
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
            <Card>
                <CardHeader title={`Package ${data.name}`} subheader={values && `${values.length} travellers`}></CardHeader>
                <CardContent>
                    {loading && <CircularProgress />}
                    {error}
                    {!loading &&
                        <Grid container >
                            <Grid item xs>
                                <Statistics data={values} />
                            </Grid>
                            <Grid item xs={2} container spacing={2}>

                                <Grid item>
                                    <Button color="primary" variant="contained" endIcon={<NavigateNextIcon />}
                                        onClick={onGotoCustomers}>Customers</Button>
                                </Grid>

                                <Grid item>
                                    <Button variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPassport} />}>Apply for visa</Button>
                                </Grid >

                                <Grid item>
                                    <Button variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faShareSquare} />}
                                    > Share</Button>
                                </Grid>


                                <Grid item>
                                    <Button variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPrint} />}
                                    > Reports</Button>
                                </Grid>

                                <Grid item>
                                    <Button variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
                                    > Assist</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    }
                </CardContent>

            </Card>

        </Container>
    )
}

export default PackageDetail
