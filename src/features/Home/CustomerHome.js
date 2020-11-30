import { Grid, Paper, Typography, Button } from '@material-ui/core';
import React from 'react';
import { firebaseConfig } from '../../firebaseConfig';
import firebase from '../../firebaseapp';

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
            <Paper elevation={4} style={{ padding: '4rem', height: '60vh' }}>
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <Typography variant="h6">{`Welcome to ${firebaseConfig.projectId} traveller portal. You will need your passport number and expire date to edit your record.`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">If you are an admin, <a href="/admin">click here to login.</a></Typography>
                    </Grid>
                </Grid>
            </Paper>
            {/* <Button onClick={handleDoit}>Do it</Button> */}
        </div>
    )
};

export default CustomerHome