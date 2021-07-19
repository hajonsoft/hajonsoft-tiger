import {
    AppBar,
    Badge,
    Button,
    Grid,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import _ from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import firebase from "../../../../firebaseapp";
import firebaseConfig from "../../../../firebaseConfig";
import useTravellerState from "../../../Dashboard/redux/useTravellerState";

const AppHeader = ({ config }) => {
    const [user] = useAuthState(firebase.auth());
    const isMobile = useMediaQuery("(max-width: 600px)");
    const projectName = `${_.startCase(
        firebaseConfig.projectId.replace(/[0-9]/g, "").replace(/-/g, " ")
    )}`;

    let history = useHistory();
    const { data: travellers } = useTravellerState();

    const handleLogout = () => {
        firebase.auth().signOut();
        history.push("/logout");
    };

    const favoriteCount = () => {
        let totalFavorites = 0;
        if (travellers) {
            const keys = Object.keys(travellers);
            keys.forEach(
                (k) =>
                    (totalFavorites += travellers[k].filter((t) => t.favorite)
                        .length)
            );
        }

        return totalFavorites;
    };

    return (
        <AppBar position="static">
            <Toolbar style={{ color: "#fff" }}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={2}>
                        <Typography variant="h6">HAJonSoft</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={() => history.push("/favorite")}>
                            <Badge
                                badgeContent={favoriteCount()}
                                color="primary"
                            >
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                    </Grid>

                    {!isMobile && (
                        <Grid item xs={6}>
                            <Button
                                style={{ color: "#fff", textTransform: "none" }}
                                onClick={() => history.push("/groups")}
                            >
                                Groups
                            </Button>
                            <Button
                                style={{ color: "#fff", textTransform: "none" }}
                                onClick={() => history.push("/online")}
                            >
                                Online
                            </Button>
                            <Button
                                style={{ color: "#fff", textTransform: "none" }}
                                onClick={() => history.push("/news")}
                            >
                                News
                            </Button>
                            <Button
                                style={{ color: "#fff", textTransform: "none" }}
                                onClick={() => history.push("/hotels")}
                            >
                                Hotels
                            </Button>
                            <Button
                                style={{ color: "#fff", textTransform: "none" }}
                                onClick={() => history.push("/flights")}
                            >
                                Flights
                            </Button>
                            <Button
                                style={{ color: "#fff", textTransform: "none" }}
                                onClick={() => history.push("/sponsor")}
                            >
                                Sponsor
                            </Button>
                            <Button
                                style={{ color: "#fff", textTransform: "none" }}
                                onClick={() => history.push("/help")}
                            >
                                Help
                            </Button>
                        </Grid>
                    )}
                    <Grid
                        item
                        md={3}
                        sm={6}
                        container
                        spacing={2}
                        alignItems="center"
                        justify="flex-end"
                        aria-label="Sign out"
                    >
                        <Grid item>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>{projectName}</Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => history.push("/profile")}
                                        style={{
                                            color: "#fff",
                                            textTransform: "none",
                                        }}
                                    >
                                        {user.email}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Button
                                onClick={handleLogout}
                                style={{ color: "#fff" }}
                            >
                                Sign out
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
