import { AppBar, Box, Button, FormControl, Grid, Icon, InputLabel, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Home, PaletteOutlined, Security } from '@material-ui/icons';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router';
import firebase from '../../firebaseapp';
import firebaseConfig from '../../firebaseConfig';
import t from '../../shared/util/trans';

const DoveHeader = ({ onThemeChange, themeName, themes }) => {
    const projectName = `${_.startCase(firebaseConfig.projectId.replace(/[0-9]/g, '').replace(/-/g, ' '))}`;
    const history = useHistory()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [profile, setProfile] = useState({ name: projectName, tel: 'xxx-xxx-xxxx' })

    useEffect(() => {
        //TODO: Replace with an action creator
        firebase.database().ref("protected/profile").once('value', snapshot => {
            if (snapshot && snapshot.toJSON()) {
                setProfile(snapshot.toJSON())
            }
        })
    }, [])

    return (
        <AppBar position="static">
            <Helmet>
                <title>{`🕊️| ${profile.name}`}</title>
            </Helmet>
            <Grid container justifyContent="space-between" alignItems={'center'} direction={isMobile ? 'column' : 'row'}>
                <Grid item>
                    <Typography
                        color="info"
                        onClick={() => history.push("/")}
                        variant="h3"
                        align="center"
                        style={{ cursor: "pointer", padding: '16px' }}>{profile.name}
                    </Typography>
                </Grid>
                <Grid item md={6} sm={12} style={{ padding: '16px  32px' }}>
                    <Grid
                        container
                        spacing={2}
                        style={{ borderRadius: isMobile ? '0' : '16px', backgroundColor: theme?.palette.background.paper, color: theme?.palette.text.secondary }}
                        justifyContent="center">
                        <Grid item>
                            <Button
                                style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }}
                                onClick={() => history.push('/')}
                                startIcon={<Home />}
                            >
                                {t('home.home')}
                            </Button>
                        </Grid>
                        {!isMobile && <>
                            <Grid item>
                                <Button
                                    style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }}
                                    onClick={() => history.push('/hajj-packages')}
                                >{t('hajj')}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }}
                                    onClick={() => history.push('/umrah-packages')}
                                >{t('umrah')}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }}
                                    onClick={() => history.push('/tours')}
                                >
                                    {t('tours')}
                                </Button>
                            </Grid>
                        </>}
                        {themes?.length > 0 && !isMobile && <Grid item>
                            <Box style={{ marginRight: isMobile ? '0' : '16px', borderRadius: '16px' }}>
                                <FormControl fullWidth>
                                    <InputLabel>{`Theme`}</InputLabel>
                                    <Select
                                        value={themeName}
                                        label="Theme"
                                        fullWidth
                                        onChange={onThemeChange}
                                    >
                                        {themes?.map(key => <MenuItem value={key}><Box display={'flex'} alignItems="center"><Icon style={{ marginRight: '16px' }}><PaletteOutlined fontSize='8' /></Icon><Typography variant='subtitle2'>{key}</Typography></Box></MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>

                        </Grid>}
                        <Grid item>
                            <Button
                                style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }}
                                onClick={() => history.push('/login')}
                                size="small"
                                endIcon={<Security />}
                            >
                                {t('admin-login')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default DoveHeader
