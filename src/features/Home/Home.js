import { Box, Button, Grid, Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import React from 'react';
import { useHistory } from 'react-router';
import logo from '../../images/logo-dark.png';
import AppFooter from '../shared/components/AppFooter/AppFooter';
import hajonsoft_logo from '../../images/logo-dark.png';

const Home = () => {

    const history = useHistory();

    return (

        <React.Fragment >
            <div style={{ background: 'transparent radial-gradient(closest-side at 50% 50%, #007EB8 0%, #00547A 100%) 0% 0% no-repeat', opacity: '1', color: '#fff', height: '100vh' }}>

                <Grid container direction="column" alignItems="center" justify="space-around" style={{ height: '100%' }}>
                    <Grid item ><Typography alignItems="center" variant="h3">Welcome to</Typography></Grid>

                    <Grid item container justify="center" alignItems="center">
                        <Zoom in={true} timeout={{ appear: 1000, enter: 3000, exit: 15000 }} mountOnEnter unmountOnExit style={{ width: '50%' }}>
                            <Typography variant="h1" align="center">Haj On Soft</Typography>
                        </Zoom>

                    </Grid>

                    <Grid item>
                        <Typography style={{ color: '#fff' }} variant="h5">
                            <Box letterSpacing={2}>Travel Management Engineered</Box>
                        </Typography>
                    </Grid>

                    <Grid item container justify="center" alignItems="center">
                        <Grid item container justify="center">

                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Grid item style={{ margin: '20px 0px' }}>
                                    <Typography style={{ color: '#82D4F3' }} variant="caption">Have an account?</Typography>
                                </Grid>
                                <Grid item>

                                    <Button variant="contained" color="primary" disableElevation style={{ borderRadius: '8px', border: '1px solid #fff' }} onClick={() => history.push('login')}>Sign In</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Grid item style={{ margin: '20px 0px' }}>
                                    <Typography style={{ color: '#82D4F3' }} variant="caption" >Need an account?</Typography>
                                </Grid>
                                <Grid item>

                                    <Button variant="contained" color="primary" disableElevation style={{ borderRadius: '8px', border: '1px solid #fff' }} onClick={() => history.push('register')}>Register</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item container direction="column" alignItems="center">
                        <Grid item style={{ margin: '50px 0px' }}>
                            <img src={hajonsoft_logo} alt="HajOnSoft"></img>

                        </Grid>
                        <Grid item>
                            <AppFooter />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment >
    )
};

export default Home