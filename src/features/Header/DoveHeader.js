import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Grid, Typography, Button, MenuItem, Box, Select, InputLabel, FormControl } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Helmet } from "react-helmet";
import _ from 'lodash';

import firebaseConfig from '../../firebaseConfig';
import firebase from '../../firebaseapp';
import t from '../../shared/util/trans';

const DoveHeader = ({ theme, themes,themeIndex, onThemeChange }) => {
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
        <AppBar position="static" style={{ backgroundColor: theme?.color5 || '#483c32', boxShadow: "none" }}>
            <Helmet>
                <title>{`🕊️| ${profile.name}`}</title>
            </Helmet>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item><Typography onClick={() => history.push("/")} variant="h4" align="center" style={{ color: theme?.secondary || '#483c32', cursor: "pointer" }}>{profile.name}</Typography></Grid>
                    <Grid item >
                        <Box style={{ padding: '8px 32px', borderRadius: '16px', margin: '16px', backgroundColor: theme?.color4 || '#483c32', color: theme?.color5 || '#483c32' }}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item><Button style={{ color: theme?.color5 || '#483c32', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }} onClick={() => history.push('/')}>{t('home.home')}</Button></Grid>
                                <Grid item><Button style={{ color: theme?.color5 || '#483c32', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }} onClick={() => history.push('/hajj-packages')}>{t('hajj')}</Button></Grid>
                                <Grid item><Button style={{ color: theme?.color5 || '#483c32', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }} onClick={() => history.push('/umrah-packages')}>{t('umrah')}</Button></Grid>
                                <Grid item><Button style={{ color: theme?.color5 || '#483c32', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }} onClick={() => history.push('/tours')}>{t('tours')}</Button></Grid>
                                <Grid item xs={2}>
                                    <Box style={{width: '128px', marginRight: '16px', padding: '0 16px'}}>

                                    <FormControl fullWidth>
                                        <InputLabel>{`Theme`}</InputLabel>
                                        <Select
                                            value={themeIndex}
                                            label="Theme"
                                            fullWidth
                                            onChange={onThemeChange}
                                        >
                                            {Object.keys(themes).map((key, index) => <MenuItem style={{color: theme?.color5}} value={index}>{key}</MenuItem>)}

                                        </Select>
                                    </FormControl>
                                    </Box>

                                </Grid>
                                <Grid item><Button style={{ color: theme?.color5 || '#483c32', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }} onClick={() => history.push('/login')}>{t('admin-login')}</Button></Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default DoveHeader
