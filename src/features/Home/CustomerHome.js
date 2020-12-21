import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { Helmet } from "react-helmet";
import firebaseConfig from '../../firebaseConfig';
import PackageCardM3li from './../onlinePackage/components/PackageCardM3li';

const CustomerHome = () => {
    const projectName = `${_.startCase(firebaseConfig.projectId.replace(/[0-9]/g, '').replace(/-/g, ' '))}`;

    return (

        <div style={{ height: '60vh' }}>
            <Helmet>
                <title>{projectName}</title>
            </Helmet>
            <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
                <Toolbar>
                    <Grid container justify="center">
                        <Grid item><Typography variant="h2" align="center">{projectName}</Typography></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} justify="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item>
                    <PackageCardM3li />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" align="center">If you are an admin, <a href="/admin">click here to login.</a></Typography>

                </Grid>
            </Grid>
        </div >
    )
};

export default CustomerHome