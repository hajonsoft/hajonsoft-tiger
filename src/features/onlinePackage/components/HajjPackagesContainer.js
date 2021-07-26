import { Box, Button, Grid, Typography } from '@material-ui/core';
import ColorScheme from 'color-scheme';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { useHistory } from 'react-router';
import firebase from "../../../firebaseapp";
import PackageCard from './PackageCard';
import CustomerHeader from './../../Header/CustomerHeader';


const HajjPackagesContainer = () => {

  const [onlinePackages, setOnlinePackages] = useState([])
  useEffect(() => {
    firebase.database().ref("protected/onlinePackage").once('value', snapshot => {
      setOnlinePackages(Object.values(snapshot.toJSON()).filter(x=> x.gender === 'Hajj'))
    })
  }, [])


  const isCurrent = (p) => {
    return (moment(p.departureDate).isAfter(moment()) && moment(p.returnDate).isAfter(moment()))
  }

  const scheme = new ColorScheme();
  scheme.from_hex('4caf50').scheme('triade').variation('default');
  const history = useHistory();
  return (
    <div>
      <CustomerHeader />
      <Box m={2}>
        <Typography variant="h6" align='center'>Hajj Packages</Typography>
      </Box>
        <Grid container spacing={3} justify="space-around" alignItems="center">
          {onlinePackages && onlinePackages.map((p,i) => isCurrent(p) && 
            <Grid item xs={12} lg={4} sm={12} md={6} >
              <Animated animationIn="bounceInLeft" isVisible={true}>
                <PackageCard detail={p} key={p.name} index={i}/>
              </Animated>
            </Grid>
          )}
        </Grid>

      <Box m={4}>
        <Grid container alignItems="center" justify="center">
          <Grid item><Button color="primary" variant="outlined" size="large" fullWidth style={{ textTransform: 'none' }} onClick={() => history.push('/reserve/interest')}>Register expression of interest</Button></Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default HajjPackagesContainer
