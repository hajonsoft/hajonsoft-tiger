import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Container } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { useHistory } from 'react-router-dom';
import firebase from '../../../firebaseapp';
import Statistics from './Statistics';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { faPassport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PackageDetail = ({ data }) => {
    const history = useHistory()
    const [values, loading, error] = useListVals(firebase.database().ref('customer/' + data.name));

    const onGotoCustomers = () => {
        history.push(`${data.name}/customers`)
    }
    return (
        <Container style={{ padding: '1rem' }}>
            <Card>
                <CardHeader title={`Package ${data.name}`} subheader={values && `${values.length} travellers`}></CardHeader>
                <CardContent>
                    {loading && <CircularProgress />}
                    {error}
                    {!loading && <Statistics data={values} />}
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" endIcon={<NavigateNextIcon />}
                        onClick={onGotoCustomers}> Customers</Button>

                    <Button  variant="outlined" endIcon={<FontAwesomeIcon icon={faPassport}/>}
                    > Apply for visa</Button>

                    <Button  variant="outlined" endIcon={<FontAwesomeIcon icon={faShareSquare} />}
                    > Share</Button>

                    <Button  variant="outlined" endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
                    > Help me</Button>
                </CardActions>
            </Card>

        </Container>
    )
}

export default PackageDetail
