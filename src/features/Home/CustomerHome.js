import { Box, Typography, Grid } from '@material-ui/core';
import React from 'react';
import roundedPlus from '../../images/customer-home-background.svg';
import PackagesContainer from '../onlinePackage/components/PackagesContainer';
import CustomerHeader from './../Header/CustomerHeader';
import ImportantDates from './components/importantDates';
import hummingBird from '../../images/humming-bird.svg'

const CustomerHome = () => {

    return (

        <div style={{ background: "url(" + roundedPlus + ")" }}>
            <CustomerHeader />
            <Box m={8} mt={2}>
                <ImportantDates />
                <PackagesContainer />
            </Box>
            <Box m={4}>
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography variant="body1" align="center" style={{ color: '#18a600' }}>If you are a admin! <a style={{ color: '#18a600' }} href="/admin">click here to login to Hummingbird</a></Typography>
                    </Grid>
                    <Grid item>
                        <img src={hummingBird} alt="humming bird" width="64" height="64"></img>

                    </Grid>
                </Grid>
            </Box>

        </div >
    )
};

export default CustomerHome