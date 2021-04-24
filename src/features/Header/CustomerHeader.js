import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import {Helmet} from "react-helmet";
import _ from 'lodash';

import firebaseConfig from '../../firebaseConfig';
import firebase from './../../firebaseapp';


const CustomerHeader = () => {
    const projectName = `${_.startCase(firebaseConfig.projectId.replace(/[0-9]/g, '').replace(/-/g, ' '))}`;
    const history = useHistory()
    const [profile, setProfile] = useState({ name: projectName, tel: 'xxx-xxx-xxxx' })

    useEffect(() => {
        firebase.database().ref("protected/profile").once('value', snapshot => {
            if (snapshot && snapshot.toJSON()) {
                setProfile(snapshot.toJSON())
            }
        })
    }, [])

    return (
        <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
            <Helmet>
                <title>{profile.name}</title>
            </Helmet>
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item><Typography variant="h4" align="center">{profile.name}</Typography></Grid>
                    <Grid item >
                        <Grid container spacing={4} justify="center">
                            <Grid item><Button onClick={() => history.push('/')}>home</Button></Grid>
                            <Grid item><Button onClick={() => history.push('/hajj-packages')}>hajj</Button></Grid>
                            <Grid item><Button onClick={() => history.push('/umrah-packages')}>umrah</Button></Grid>
                            <Grid item><Button onClick={() => history.push('/tours')}>tours</Button></Grid>
                            <Grid item><Button onClick={() => history.push('/contact')}>contact us</Button></Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {profile && profile.tel && <Typography variant="body1">{`Call us ${profile.tel}`}</Typography>}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default CustomerHeader
