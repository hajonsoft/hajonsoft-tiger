import { Box, Typography } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { Helmet } from "react-helmet";
import firebaseConfig from '../../firebaseConfig';
import qibla from '../../images/qibla-bg.jpg';
import PackagesContainer from '../onlinePackage/components/PackagesContainer';
import CustomerHeader from './../Header/CustomerHeader';
const CustomerHome = () => {

    const projectName = `${_.startCase(firebaseConfig.projectId.replace(/[0-9]/g, '').replace(/-/g, ' '))}`;

    return (

        <div style={{ backgroundImage: "url(" + qibla + ")", backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
            <Helmet>
                <title>{projectName}</title>
            </Helmet>
            <CustomerHeader />
            <Box m={8} mt={50}>
                <PackagesContainer />
            </Box>
            <Box m={4}>
                <Typography variant="body1" align="center" style={{color: '#fff'}}>If you are an admin, <a  style={{color: '#fff'}} href="/admin">click here to login.</a></Typography>
            </Box>

        </div >
    )
};

export default CustomerHome