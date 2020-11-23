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
                    <FontAwesomeIcon icon={faMale} color="silver" size="2x"/> <Typography color="textSecondary" align="center">{data.filter(f => f.gender && f.gender.startsWith('M')).length} </Typography>
                </Grid>

                <Grid item aria-label="Female">
                    <FontAwesomeIcon icon={faFemale} color="silver" size="2x"/> <Typography color="textSecondary" align="center">{data.filter(f => f.gender && f.gender.startsWith('F')).length} </Typography>
                </Grid>
                <Grid item aria-label="adults">
                    <FontAwesomeIcon icon={faUser}  color="silver" size="2x" /> <Typography color="textSecondary" align="center">{data.filter(f => f.birthDate && f.birthDate && moment().diff(f.birthDate, 'years') > 18).length} </Typography>
                </Grid>
                <Grid item aria-label="Children">
                    <FontAwesomeIcon icon={faChild}  color="silver" size="2x" /> <Typography color="textSecondary" align="center">{data.filter(f => f.birthDate && f.birthDate && moment().diff(f.birthDate, 'years') < 18 && moment().diff(f.birthDate, 'years') > 2).length} </Typography>
                </Grid>
                <Grid item aria-label="Infants">
                    <FontAwesomeIcon icon={faBabyCarriage} color="silver" size="2x"/> <Typography color="textSecondary" align="center">{data.filter(f => f.birthDate && f.birthDate && moment().diff(f.birthDate, 'years') < 2).length} </Typography>
                </Grid>
                <Grid item aria-label="Nationalities">
                    <FontAwesomeIcon icon={faMapMarked} color="silver" size="2x"/> <Typography color="textSecondary" align="center">{Object.keys(_.groupBy(data, 'nationality')).map(k=> <div>{`${k}: ${Math.round((data.filter(x=> x.nationality === k).length /data.length) * 100)}%`}</div>)} </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Statistics
