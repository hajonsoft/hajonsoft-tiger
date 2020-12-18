import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import logo from '../../images/logo-dark.png';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.grey[100],
        height: '100vh'
    },
    welcomeTo: {
        color: theme.palette.secondary
    }
}))
const Home = () => {

    const history = useHistory();
    const classes = useStyles();

    return (
        <React.Fragment >
            <div className={classes.container} >
                <Grid container direction="column" alignItems="center" justify="space-around" style={{ height: '100%' }}>
                    <Grid item ><Typography align="center" variant="h3" className={classes.welcomeTo}>Welcome to ...</Typography></Grid>
                    <Grid item container justify="center" alignItems="center">
                        <Typography variant="h1" align="center" color="textPrimary">HAJ</Typography>
                        <Typography variant="h2" color="textSecondary">onSoft</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="textSecondary" variant="h3">
                            <Box letterSpacing={4}>Travel Management software ...</Box>
                        </Typography>
                    </Grid>
                    <Grid item container justify="center" alignItems="center">
                        <Grid item container justify="center">
                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Grid item style={{ margin: '20px 0px' }}>
                                    <Typography color="textSecondary" variant="body1">Have an account?</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" size="large" disableElevation onClick={() => history.push('login')}>Sign In</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Grid item style={{ margin: '20px 0px' }}>
                                    <Typography color="textSecondary" variant="body1" >Need an account?</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" size="large" color="primary" disableElevation onClick={() => history.push('register')}>Register</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" alignItems="center">
                        <Grid item style={{ margin: '50px 0px' }}>
                            <img src={logo} alt="HajOnSoft"></img>
                        </Grid>
                        <Grid item>
                            {/* <AppFooter /> */}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment >
    )
};

export default Home