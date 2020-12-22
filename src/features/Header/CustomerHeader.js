import React, {useState, useEffect} from 'react'
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import firebaseConfig from '../../firebaseConfig';
import _ from 'lodash';
import firebase from './../../firebaseapp';


const CustomerHeader = () => {
    const projectName = `${_.startCase(firebaseConfig.projectId.replace(/[0-9]/g, '').replace(/-/g, ' '))}`;
    const history = useHistory()
    const [profile, setProfile] = useState({})
    useEffect(() => {
      firebase.database().ref("protected/profile").once('value', snapshot => {
        setProfile(snapshot.toJSON())
      })
    }, [])
  
    return (
        <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item><Typography variant="h4" align="center">{profile?.name || projectName}</Typography></Grid>
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
                        <Typography variant="body1">{`Call us ${profile?.tel || 'xxx-xxx-xxxx'}`}</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default CustomerHeader
