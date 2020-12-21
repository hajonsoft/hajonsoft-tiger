import { Box, Button, Grid, Paper, Typography } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router';
const PackageFeatures = ({ detail }) => {

    const history = useHistory()

    const arrivalHotelText = () => {
        const checkoutDate = moment(detail.checkoutDate);
        if (!checkoutDate.isValid()) {
            return 'Call for arrival details'
        }
        const arrivalDate = moment(detail.arrivalDate);
        if (!arrivalDate.isValid()) {
            return 'Call for arrival details'
        }
        const nights = checkoutDate.diff(arrivalDate, 'days') + 1;
        if (detail.arrivalAirport !== 'JED' && detail.arrivalAirport !== 'MED') {
            return `${nights} nights in arrival city`
        }
        return `${nights} nights in ${detail.arrivalAirport === 'JED' ? 'Makkah' : 'Madinah'}`
    }

    const returnHotelText = () => {
        const checkoutDate = moment(detail.checkoutDate);
        if (!checkoutDate.isValid()) {
            return 'Call for return details'
        }
        const returnDate = moment(detail.returnDate);
        if (!returnDate.isValid()) {
            return 'Call for return details'
        }
        const nights = returnDate.diff(checkoutDate, 'days');
        if (detail.arrivalAirport !== 'JED' && detail.arrivalAirport !== 'MED') {
            return `${nights} nights in departure city`
        }
        return `${nights} nights in ${detail.arrivalAirport === 'JED' ? 'Madinah' : 'Makkah'}`
    }

    const totalDurationText = () => {
        // Total of 15 days
        const returnDate = moment(detail.returnDate);
        if (!returnDate.isValid()) {
            return 'Call for total nights'
        }
        const arrivalDate = moment(detail.arrivalDate);
        if (!arrivalDate.isValid()) {
            return 'Call for total nights'
        }
        const nights = returnDate.diff(arrivalDate, 'days') + 1;
        return `Total of ${nights} days`
    }
    return (
        <Paper elevation={3} style={{ paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: "#e8f5e9" }}>
            <Typography variant="h6" align="center" >{detail.name}</Typography>
            <Typography variant="body1" align="center" gutterBottom >{`${detail.headline}`}</Typography>
            <Typography variant="body2" color="textSecondary" align="center" >{`${detail.quadPrice} 4 persons/room`}</Typography>

            <Box p={2}>
                <Typography variant="h6">Features</Typography>
                <div>
                    <ul>
                        <li>{`Round trip air fare ${detail.departureAirport}/${detail.arrivalAirport}/${detail.returnAirport}/${detail.departureAirport}`}</li>
                        <li>{arrivalHotelText()}</li>
                        <li>{returnHotelText()}</li>
                        <li>{totalDurationText()}</li>
                    </ul>
                </div>
            </Box>

            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button variant="contained" color="primary" style={{ textTransform: 'none' }} onClick={()=> history.push('/reserve/' + detail.name)}>Book Now</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" style={{ textTransform: 'none' }} onClick={()=> history.push('/reserve/Enquire-' + detail.name)}>Enquire</Button>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default PackageFeatures
