import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import {Helmet} from "react-helmet";
import _ from 'lodash';

import firebaseConfig from '../../firebaseConfig';
import firebase from '../../firebaseapp';
import t from '../../shared/util/trans';

const DoveHeader = () => {
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
        <AppBar position="static" style={{ backgroundColor: 'white', boxShadow: "none" }}>
            <Helmet>
                <title>{`🕊️| ${profile.name}`}</title>
            </Helmet>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item><Typography onClick={() => history.push("/")} variant="h4" align="center" style={{fontFamily: "Roboto", color: "#4caf50", cursor: "pointer" }}>{profile.name}</Typography></Grid>
                    <Grid item >
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item><Button style={{color: "#4caf50"}} onClick={() => history.push('/')}>{t('home.home')}</Button></Grid>
                            <Grid item><Button style={{color: "#4caf50"}} onClick={() => history.push('/hajj-packages')}>{t('hajj')}</Button></Grid>
                            <Grid item><Button style={{color: "#4caf50"}} onClick={() => history.push('/umrah-packages')}>{t('umrah')}</Button></Grid>
                            <Grid item><Button style={{color: "#4caf50"}} onClick={() => history.push('/tours')}>{t('tours')}</Button></Grid>
                            <Grid item><Button style={{color: "#4caf50"}} onClick={() => history.push('/login')}>{t('admin-login')}</Button></Grid>
                            {/* <Grid item><Button style={{color: "#4caf50"}} onClick={() => history.push('/contact')}>contact us</Button></Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default DoveHeader
