import React from 'react'
import { eventsBefore, eventsAfter } from '../../../util/hijri';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const ImportantDates = () => {
    return (
        <Grid container justify="space-between" >
            <Grid item><Typography variant="body1" align="center" style={{color: '#bfffc4'}}>{eventsBefore()}</Typography></Grid>
    <Grid item><Typography variant="body1" align="center" style={{color: '#80ff88'}}>{eventsAfter()}</Typography></Grid>

        </Grid>
    )
}

export default ImportantDates
