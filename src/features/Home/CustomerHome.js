import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { Helmet } from "react-helmet";
import firebaseConfig from '../../firebaseConfig';
import OnlinePackagesContainer from '../onlinePackage/OnlinePackagesContainer';
const CustomerHome = () => {
    const projectName = `${_.startCase(firebaseConfig.projectId.replace(/[0-9]/g, '').replace(/-/g, ' '))}`;

    // const handleDoit = () => {
    //     const storage = firebase.storage();
    //     var listRef = storage.ref('');
    //     listRef.listAll().then(function (res) {
    //         res.items.forEach(i => alert(i))
    //     });
    // }

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
            <Grid container spacing={2} justify="center" style={{ padding: '4rem', height: '100%' }}>
                <Grid item xs={12}>
                    <OnlinePackagesContainer />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1" align="center">If you are an admin, <a href="/admin">click here to login.</a></Typography>

                </Grid>
            </Grid>
        </div>
    )
};

export default CustomerHome