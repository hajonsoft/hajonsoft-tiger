import Alert from '@material-ui/lab/Alert'
import React from 'react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import HotelIcon from '@material-ui/icons/Hotel';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import GavelIcon from '@material-ui/icons/Gavel';
function CustomerDetail(props) {
    return (
        <div>
            <Alert severity="info" >{`Customer details here, ex. facebook, twitter, whatsapp, accommodation, etc... ${props.customerKey}`}</Alert>
            <WhatsAppIcon /> <TwitterIcon /> <HotelIcon /> <FlightTakeoffIcon /> <GavelIcon />
        </div>
    )
}

export default CustomerDetail
