import { Box, Typography } from '@material-ui/core';
import React from 'react';
import roundedPlus from '../../images/customer-home-background.svg';
import PackagesContainer from '../onlinePackage/components/PackagesContainer';
import CustomerHeader from './../Header/CustomerHeader';
import ImportantDates from './components/importantDates';

const CustomerHome = () => {

    return (

        <div style={{ background: "url(" + roundedPlus + ")" }}>
            <CustomerHeader />
            <Box m={8} mt={2}>
                <ImportantDates />
                <PackagesContainer />
            </Box>
            <Box m={4}>
                <Typography variant="body1" align="center" style={{ color: '#18a600' }}>If you are a dove admin, <a style={{ color: '#18a600' }} href="/admin">click here to login to Hummingbird</a></Typography>
            </Box>

        </div >
    )
};

export default CustomerHome