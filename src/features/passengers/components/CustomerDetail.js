import Alert from '@material-ui/lab/Alert'
import React from 'react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import HotelIcon from '@material-ui/icons/Hotel';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import GavelIcon from '@material-ui/icons/Gavel';
import { Grid } from '@material-ui/core';
function CustomerDetail(props) {
    return (
        <div>
            <Alert severity="info" >{`Customer details here, ex. facebook, twitter, whatsapp, accommodation, etc... `}</Alert>
            <Grid container alignContent="center" justifyContent="space-around" style={{ width: "30%", padding: "1rem"}}>
                <WhatsAppIcon style={{cursor: "pointer"}} /> <TwitterIcon style={{cursor: "pointer"}} /> <HotelIcon style={{cursor: "pointer"}} /> <FlightTakeoffIcon style={{cursor: "pointer"}} /> <GavelIcon style={{cursor: "pointer"}} />
            </Grid>
        </div>
    )
}

export default CustomerDetail
