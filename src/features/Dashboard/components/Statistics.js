import { faBabyCarriage, faChild, faFemale, faMale, faMapMarked, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';

const Statistics = ({ data }) => {
    return (
        <div>
            <Grid container spacing={4} justify="center">
                <Grid item aria-label="Male">
                    <FontAwesomeIcon icon={faMale} /> <Typography color="textSecondary">{data.filter(f => f.gender.startsWith('M')).length} </Typography>
                </Grid>

                <Grid item aria-label="Female">
                    <FontAwesomeIcon icon={faFemale} /> <Typography color="textSecondary">{data.filter(f => f.gender.startsWith('F')).length} </Typography>
                </Grid>
                <Grid item aria-label="adults">
                    <FontAwesomeIcon icon={faUser} /> <Typography color="textSecondary">{data.filter(f => f.birthDate && moment().diff(f.birthDate, 'years') > 18).length} </Typography>
                </Grid>
                <Grid item aria-label="Children">
                    <FontAwesomeIcon icon={faChild}  size="lg" /> <Typography color="textSecondary">{data.filter(f => f.birthDate && moment().diff(f.birthDate, 'years') < 18 && moment().diff(f.birthDate, 'years') > 2).length} </Typography>
                </Grid>
                <Grid item aria-label="Infants">
                    <FontAwesomeIcon icon={faBabyCarriage} /> <Typography color="textSecondary">{data.filter(f => f.birthDate && moment().diff(f.birthDate, 'years') < 2).length} </Typography>
                </Grid>
                <Grid item aria-label="Nationalities">
                    <FontAwesomeIcon icon={faMapMarked} /> <Typography color="textSecondary">{Object.keys(_.groupBy(data, 'nationality')).map(k=> <div>{`${k}: ${Math.round((data.filter(x=> x.nationality === k).length /data.length) * 100)}%`}</div>)} </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Statistics
