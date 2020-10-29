import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import React from 'react';
import { useHistory } from 'react-router';
import AppFooter from '../shared/components/AppFooter/AppFooter';
import logo from '../../images/logo-dark.png';
import useUserState from '../SignIn/redux/useUserState';
// import background_image from '../../images/undraw_control_panel1_20gm.svg';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#d7f9f1',
        color: '#fff',
        height: '100vh'
    }
}))
const Home = () => {

    const history = useHistory();
    const classes = useStyles();
    const {data: user} = useUserState()

    return (

        <React.Fragment >
            <div className={classes.container} >
                {JSON.stringify(user)}
                <Grid container direction="column" alignItems="center" justify="space-around" style={{ height: '100%' }}>
                    <Grid item ><Typography alignItems="center" variant="h3" color="textSecondary">Welcome to</Typography></Grid>

                    <Grid item container justify="center" alignItems="center">
                        <Zoom in={true} timeout={{ appear: 1000, enter: 3000, exit: 15000 }} mountOnEnter unmountOnExit style={{ width: '50%' }}>
                            <React.Fragment>
                                <Typography variant="h1" align="center" color="textPrimary">HAJ</Typography>
                                <Typography variant="h4" color="textSecondary" >onSoft</Typography>
                            </React.Fragment>
                        </Zoom>

                    </Grid>

                    <Grid item>
                        <Typography color="textSecondary" variant="h5">
                            <Box align="center">the</Box>
                            <Box letterSpacing={6} align="center">Travel management software ...</Box>
                        </Typography>
                    </Grid>

                    <Grid item container justify="center" alignItems="center">
                        <Grid item container justify="center">

                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Grid item style={{ margin: '20px 0px' }}>
                                    <Typography color="textSecondary" variant="caption">Have an account?</Typography>
                                </Grid>
                                <Grid item>

                                    <Button variant="contained" color="primary" disableElevation style={{ borderRadius: '8px', border: '1px solid #fff' }} onClick={() => history.push('login')}>Sign In</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Grid item style={{ margin: '20px 0px' }}>
                                    <Typography color="textSecondary" variant="caption" >Need an account?</Typography>
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