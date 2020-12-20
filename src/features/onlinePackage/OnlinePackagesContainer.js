import { Box, Button, Grid } from '@material-ui/core';
import ColorScheme from 'color-scheme';
import moment from 'moment';
import React from 'react';
import { useList } from "react-firebase-hooks/database";
import { useHistory } from 'react-router';
import firebase from "../../firebaseapp";
import OnePackage from './components/OnePackage';
const OnlinePackagesContainer = () => {

  const [snapshots, loading] = useList(firebase.database().ref("protected/onlinePackage"));

  const isValid = (p) => {
    return (moment(p.departureDate).isAfter(moment()) && moment(p.returnDate).isAfter(moment()))
  }

  const scheme = new ColorScheme();
  scheme.from_hex('4caf50').scheme('triade').variation('default');
  const history = useHistory();
  const indexColor = (i) => {
    const colors = scheme.colors();
    const colorLength = colors.length;
    if (i < colorLength) {
      return '#' + colors[i];
    } else {
      return '#' +  colors[colorLength % i];
    }
  }
  return (
    <div>
      {loading && 'loading ...'}
      <Grid container justify="space-between" alignItems="center">
        {snapshots && snapshots.map((p, i) => isValid(p.val()) && <Grid item xs={3} key={p.key}><OnePackage detail={p.val()} backgroundColor={`${indexColor(i)}`} /> </Grid>)}
      </Grid>

      <Box m={4}>
        <Grid container alignItems="center" justify="center">
          <Grid item><Button color="primary" variant="outlined" size="large" fullWidth style={{ textTransform: 'none' }} onClick={() => history.push('/reserve/interest')}>Register expression of interest</Button></Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default OnlinePackagesContainer
