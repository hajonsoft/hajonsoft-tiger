import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HotelIcon from '@material-ui/icons/Hotel';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import moment from 'moment';
import React from 'react';

const PackageSchedule = ({ detail }) => {
    return (
        <Paper elevation={3} style={{ paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: "#e8f5e9" }} variant="outlined">
            <Typography variant="h6" align="center">Itinerary</Typography>
            <TableContainer component={Container}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><FlightTakeoffIcon fontSize={"large"} color="primary"></FlightTakeoffIcon></TableCell>
                            <TableCell>{`Round trip air fare ${detail.departureAirport}/${detail.arrivalAirport}/${detail.returnAirport}/${detail.departureAirport}. Leaving ${moment(detail.departureDate).fromNow()} from today, on ${moment(detail.departureDate).format('dddd MMMM Do YYYY')}, returning ${moment(detail.returnDate).format('dddd MMMM Do YYYY')}.`}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow>
                            <TableCell><HotelIcon fontSize={"large"} color="primary"></HotelIcon></TableCell>
                            <TableCell>{`Accommodation in ${detail.arrivalAirport === 'JED' ? 'Makkah' : 'Madinah'} at ${detail.arrivalHotel} or equivalent from ${moment(detail.arrivalDate).format('dddd MMMM Do YYYY')} to ${moment(detail.checkoutDate).format('dddd MMMM Do YYYY')}`}</TableCell>
                        </TableRow>



                        <TableRow>
                            <TableCell><HotelIcon fontSize={"large"} color="primary"></HotelIcon></TableCell>
                            <TableCell>{`Accommodation in ${detail.arrivalAirport === 'JED' ? 'Madinah' : 'Makkah'} at ${detail.departureHotel} or equivalent from ${moment(detail.checkoutDate).format('dddd MMMM Do YYYY')} to ${moment(detail.returnDate).format('dddd MMMM Do YYYY')}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><DirectionsBusIcon fontSize={"large"} color="primary"></DirectionsBusIcon></TableCell>
                            <TableCell>Visit the Historical sites in Medina.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><DirectionsBusIcon fontSize={"large"} color="primary"></DirectionsBusIcon></TableCell>
                            <TableCell>All Transportation in air conditioned buses.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><SupervisorAccountIcon fontSize={"large"} color="primary"></SupervisorAccountIcon></TableCell>
                            <TableCell>Imams will accompany the group.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <Typography>
                This program begins in Makkah where you can perform your first Umrah upon arrival (Must arrive in Ihram) followed by unlimited Umrah's with our scholar as needed. In Madinah, Our beloved Prophet (pbuh) is a short distance from the hotel and your stay includes a guided visit to historical sites like Uhud mountain, Quba Mosque, the first masjid in Madinah, Al al-Baqi cemetery.
</Typography>
            <Typography><h4>Accommodation</h4></Typography>
            <Typography>Mecca</Typography>
            <Typography>Medina</Typography>

            <Typography><h4>Flights</h4></Typography>
            <Typography>Departure Flight</Typography>
            <Typography>Return Fligh</Typography> */}

        </Paper>

    )
}

export default PackageSchedule
