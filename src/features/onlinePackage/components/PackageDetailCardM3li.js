import { Container, Link, Box, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Helmet } from 'react-helmet';
import packagePlaceholder from '../../../images/package-placeholder.jpg';
import PackageFeatures from './PackageFeatures';
import PackageSchedule from './PackageSchedule';
import { useParams } from 'react-router-dom';
import firebase from "../../../firebaseapp";
import { useEffect } from 'react';
import { useState } from 'react';

const PackageDetailCardM3li = () => {

    const {packageName} = useParams();
    const [detail,setDetail] = useState({})

    useEffect(()=> {

        firebase.database().ref("protected/onlinePackage").once('value', (snapshot)=> {

            setDetail(Object.values(snapshot.toJSON()).find(x=> x.name === packageName))

        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Container>
            <Helmet>
                <title>{`${detail.name}`}</title>
            </Helmet>
            <Box mt={8}>
                <Grid Container>
                    <Breadcrumbs aria-label="breadcrumb" style={{ borderBottom: 'solid 1px green ' }}>
                        <Link color="inherit" href="/Home" >Home</Link>
                        <Link color="inherit" href="/packages" >Packages</Link>
                        <Typography variant="body1">{detail.name}</Typography>
                    </Breadcrumbs>

                </Grid>

                <Grid container spacing={3} style={{ marginTop: '1rem' }}>
                    <Grid item xs={12} lg={4} sm={12} md={4}>
                        <img src={packagePlaceholder} alt="" style={{ width: '100%', height: 'auto', border: '5px solid #ffffff' }} />
                        <Box>
                            {detail.triplePrice && <Typography variant="h6" align="center" color="textSecondary">{`${detail.triplePrice} Triple`}</Typography>}
                            {detail.doublePrice && <Typography variant="h6" align="center" color="textSecondary">{`${detail.doublePrice} Double`}</Typography>}
                            {detail.doublePrice && <Typography variant="subtitle1" align="center" color="textSecondary">{`All prices exclude ${detail.fees} sacrifice and visa fees`}</Typography>}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8} sm={12} md={8}>
                        <PackageFeatures detail={detail} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    <Grid item xs={12} lg={4} sm={12} md={4}><img src={packagePlaceholder} alt="" fluid={true} style={{ width: '100%', height: 'auto' }} /></Grid>
                    <Grid item xs={12} lg={4} sm={12} md={4}><img src={packagePlaceholder} alt="" fluid={true} style={{ width: '100%', height: 'auto' }} /></Grid>
                    <Grid item xs={12} lg={4} sm={12} md={4}><img src={packagePlaceholder} alt="" fluid={true} style={{ width: '100%', height: 'auto' }} /></Grid>
                </Grid>

                <PackageSchedule detail={detail} />

                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} sm={12} md={12}><h4>Related Packages</h4></Grid>
                    <Grid item xs={12} lg={4} sm={12} md={4}><Paper elevation={3}><img src={packagePlaceholder} alt="" fluid={true} style={{ width: '100%', height: 'auto', }} /></Paper></Grid>
                    <Grid item xs={12} lg={4} sm={12} md={4}><Paper elevation={3}><img src={packagePlaceholder} alt="" fluid={true} style={{ width: '100%', height: 'auto', }} /></Paper></Grid>
                    <Grid item xs={12} lg={4} sm={12} md={4}><Paper elevation={3}><img src={packagePlaceholder} alt="" fluid={true} style={{ width: '100%', height: 'auto', }} /></Paper></Grid>
                </Grid>

            </Box>
        </Container>


    )
}

export default PackageDetailCardM3li
