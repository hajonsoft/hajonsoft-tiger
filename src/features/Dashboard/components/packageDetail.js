import { faHandsHelping, faPassport, faPrint, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress, Grid, Paper } from '@material-ui/core';
import React from 'react';
import useTravellerState from '../redux/useTravellerState';
import BioStatistics from './BioStatistics';
import NationalityStatistics from './NationalityStatistics';
import {nameParts} from '../../../util/nameParts'
import moment from 'moment'
//TODO: Redesign, talk to customers to get feedback
const PackageDetail = ({ data }) => {
    const { data: travellers, loading, error } = useTravellerState()

    const handleShareClick = () => {
        // create the data.json 
        const mapped = travellers[data.name].map(t => {
            const _nameParts = nameParts(t.name);
            const _nameArabicParts = nameParts(t.nameArabic);
            return {
                nationality: t.nationality,
                firstName: _nameParts[0],
                lastName: _nameParts[3],
                middleName: _nameParts[1],
                additionalName: _nameParts[2],
                firstNameArabic: _nameArabicParts[0],
                lastNameArabic: _nameArabicParts[3],
                middleNameArabic: _nameArabicParts[1],
                additionalNameArabic: _nameArabicParts[2],
                mobileNumber: t.phone,
                gender: t.gender,
                dob: moment(t.birthDate).format('DD/MM/YYYY'),
                passIssueDt: moment(t.passIssueDt).format('DD/MM/YYYY'),
                passExpireDt: moment(t.passExpireDt).format('DD/MM/YYYY'),
                birthPlace: t.birthPlace,
                profession: t.profession,
                address: t.address,
                passportNumber: t.passportNumber,
                placeOfIssue: t.placeOfIssue,
                codeline: t.codeline
            }
        })

        const newFile = new Blob([JSON.stringify(mapped)], { type: 'text/json' });
        var csvURL = window.URL.createObjectURL(newFile);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'data.json');
        tempLink.click();
    }

    return (
        <Paper style={{ padding: '2rem' }}>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    {loading && <CircularProgress />}
                    {error}
                    {!loading && <BioStatistics data={Object.values(travellers[data.name])} />}
                </Grid>
                <Grid item>
                    {loading && <CircularProgress />}
                    {error}
                    {!loading && <NationalityStatistics data={Object.values(travellers[data.name])} />}
                </Grid>
                <Grid item >
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPassport} />}>Apply for visa</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" onClick={handleShareClick} endIcon={<FontAwesomeIcon icon={faShareSquare} />}
                            > Share</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faPrint} />}
                            > Reports</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
                            > Assist</Button>
                        </Grid>

                    </Grid></Grid>
            </Grid>
        </Paper>
    )
}

export default PackageDetail
