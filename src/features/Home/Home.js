import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import React from 'react';
import { useHistory } from 'react-router';
import AppFooter from '../shared/components/AppFooter/AppFooter';
import logo from '../../images/logo-dark.png';


const useStyles = makeStyles((theme)=> ({
container: {
    backgroundImage: 'linear-gradient(to bottom, #3e95dc, #74aae4, #9dc0ec, #c2d6f4, #e4edfc);', 
    opacity: '1', 
    color: '#fff', 
    height: '100vh'
}
}))
const Home = () => {

    const history = useHistory();
    const classes = useStyles();

    return (

        <React.Fragment >
            <div className={classes.container}>

                <Grid container direction="column" alignItems="center" justify="space-around" style={{ height: '100%' }}>
                    <Grid item ><Typography alignItems="center" variant="h3">Welcome to</Typography></Grid>

                    <Grid item container justify="center" alignItems="center">
                        <Zoom in={true} timeout={{ appear: 1000, enter: 3000, exit: 15000 }} mountOnEnter unmountOnExit style={{ width: '50%' }}>
                            <Typography variant="h1" align="center" color="textPrimary">Haj On Soft</Typography>
                        </Zoom>

                    </Grid>

                    <Grid item>
                        <Typography color="textSecondary" variant="h5">
                            <Box letterSpacing={4}>Travel management software ...</Box>
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
                            <img src={logo} alt="HajOnSoft"></img>

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