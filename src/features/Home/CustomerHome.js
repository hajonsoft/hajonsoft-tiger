import { Box, Typography } from '@material-ui/core';
import React from 'react';
import qibla from '../../images/qibla-bg.jpg';
import PackagesContainer from '../onlinePackage/components/PackagesContainer';
import CustomerHeader from './../Header/CustomerHeader';
import ImportantDates from './components/importantDates';

const CustomerHome = () => {

    return (

        <div style={{ backgroundImage: "url(" + qibla + ")", backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
            <CustomerHeader />
            <Box m={8} mt={50}>
                <ImportantDates />
                <PackagesContainer />
            </Box>
            <Box m={4}>
                <Typography variant="body1" align="center" style={{ color: '#ffdabf' }}>If you are an admin, <a style={{ color: '#ffdabf' }} href="/admin">click here to login.</a></Typography>
            </Box>

        </div >
    )
};

export default CustomerHome