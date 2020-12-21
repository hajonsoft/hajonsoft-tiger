import React from 'react'
import { Paper, Grid, Typography, Box, Divider, Button } from '@material-ui/core';
import moment from 'moment';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@material-ui/icons/FlightLandRounded';
import { useHistory } from 'react-router';
const OnePackage = ({ detail,  backgroundColor }) => {
    const history = useHistory()
    return (

        <Paper elevation={4} rounded="true" style={{backgroundColor}}>
            <Box pt={4}>
                <Typography variant="h3" align="center" gutterBottom>{detail.name}</Typography>
                <Typography variant="h6" color="textSecondary" align="center">{detail.headline}</Typography>
            </Box>

            <Box mt={2} style={{backgroundColor: '#fff'}}>
                <Grid container spacing={2} justify="space-between" alignItems="center">
                    <Grid item xs={5}>
                        <Typography variant="h4" align="center" gutterBottom>Depart <FlightTakeoffRoundedIcon /></Typography>
                        <Typography variant="h6" align="center" >{moment(detail.departureDate).format('MMM D, YYYY')}</Typography>
                        <Typography variant="h6" align="center" color="textSecondary">{moment(detail.departureDate).fromNow()}</Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={5}>
                        <Typography variant="h4" align="center" gutterBottom>Return <FlightLandRoundedIcon /></Typography>
                        <Typography variant="h6" align="center">{moment(detail.returnDate).format('MMM D, YYYY')}</Typography>
                        <Typography variant="h6" align="center" color="textSecondary">{moment(detail.returnDate).fromNow()}</Typography>

                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth onClick={()=> history.push(`/reserve/${detail.name}`)}>Reserve</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h4" align="center" gutterBottom>Duration</Typography>
                        <Typography variant="h6" align="center" color="textSecondary">{`${moment(detail.returnDate).diff(moment(detail.departureDate), 'days')} Days`}</Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />

                    <Grid item xs={5}>
                        <Typography variant="h4" align="center" gutterBottom>Price From</Typography>
                        <Typography variant="h6" align="center" color="textSecondary">{detail.quadPrice}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>

    )
}

export default OnePackage
