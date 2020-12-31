import { faHandsHelping, faPassport, faPrint, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress, Grid, Paper } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { nameParts } from '../../../util/nameParts';
import useTravellerState from '../redux/useTravellerState';
import BioStatistics from './BioStatistics';
import NationalityStatistics from './NationalityStatistics';

//TODO: Redesign, talk to customers to get feedback

// const storage = firebase.storage();
const PackageDetail = ({ data }) => {
    const { data: travellers, loading, error } = useTravellerState()

    const handleShareClick = () => {
        // create the data.json 
        const mapped = travellers[data.name].map(t => {
            const _nameParts = nameParts(t.name);
            let _nameArabicParts = nameParts(t.nameArabic);
            if (_nameArabicParts[0] === 'invalid'){
                _nameArabicParts = ['','','','']
            }
            return {
                nationality: {name: t.nationality},
                name: {full: t.name, first: _nameParts[0], last: _nameParts[3], father: _nameParts[1], grand: _nameParts[2]},
                nameArabic: {full: t.nameArabic, first: _nameArabicParts[0], last: _nameArabicParts[3], father: _nameArabicParts[1], grand: _nameArabicParts[2]},
                mobileNumber: t.phone,
                gender: t.gender,
                dob: {dmy: moment(t.birthDate).format('DD/MM/YYYY')},
                passIssueDt: {dmy: moment(t.passIssueDt).format('DD/MM/YYYY')},
                passExpireDt: {dmy: moment(t.passExpireDt).format('DD/MM/YYYY')},
                birthPlace: t.birthPlace,
                profession: t.profession,
                address: t.address,
                passportNumber: t.passportNumber,
                placeOfIssue: t.passPlaceOfIssue,
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

    const handleShareImagesClick = async () => {

        // var zip = new JSZip();
        // zip.file("Hello.txt", "Hello World\n");
        // var img = zip.folder("images");
        // const pathReference = storage.ref('United Kingdom/521560678.jpg');
        // const imgData = await pathReference.getBytes(1024 * 1024);
        // img.file("smile.gif", imgData, {base64: true});
        // zip.generateAsync({type:"blob"})
        // .then(function(content) {
        //     // see FileSaver.js
        //     const newFile = new Blob([content], { type: 'application/zip' });
        //     var csvURL = window.URL.createObjectURL(newFile);
        //     const tempLink = document.createElement('a');
        //     tempLink.href = csvURL;
        //     tempLink.setAttribute('download', 'images.zip');
        //     tempLink.click();
        // });


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
                            <Button style={{ width: '100%' }} variant="outlined" color="primary" onClick={handleShareImagesClick} endIcon={<FontAwesomeIcon icon={faShareSquare} />}
                            > Share Images</Button>
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
