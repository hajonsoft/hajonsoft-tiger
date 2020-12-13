import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Helmet } from "react-helmet";
import firebaseConfig from '../../firebaseConfig';
import _ from 'lodash'
import welcome from '../../images/welcome.jpg'
const CustomerHome = () => {


    // const handleDoit = () => {
    //     const storage = firebase.storage();
    //     var listRef = storage.ref('');
    //     listRef.listAll().then(function (res) {
    //         res.items.forEach(i => alert(i))
    //     });
    // }

    return (

        <div style={{ padding: '4rem', height: '60vh' }}>
            <Helmet>
                <title>{firebaseConfig.projectId}</title>
            </Helmet>
            <Paper elevation={4} style={{ padding: '4rem', height: '60vh' }}>
                <Grid container justify="center" alignItems="space-between" style={{height: '60vh'}}>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center">{`${_.startCase(firebaseConfig.projectId.replace(/[0-9]/g, '').replace(/-/g, ' '))}`}</Typography>
                    </Grid>
                    <Grid item>
                        <img src={welcome} alt="welcome" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" align="center">If you are an admin, <a href="/admin">click here to login.</a></Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
};

export default CustomerHome