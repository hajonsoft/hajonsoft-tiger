import {
  AppBar,
  Badge,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebaseConfig from "../../../../firebaseConfig";
import { signoutWithGoogle } from "../../../SignIn/redux/authSlice";

const AppHeader = () => {
  const authData = useSelector(state => state.auth?.data);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const projectName = `${_.startCase(
    firebaseConfig.projectId.replace(/[0-9]/g, "").replace(/-/g, " ")
  )}`;

  let history = useHistory();
  const passengers = useSelector(state => state.passenger?.data);

  const handleLogout = () => {
    dispatch(signoutWithGoogle())
    history.push("/logout");
  };

  const favoriteCount = () => {
    let totalFavorites = 0;
    if (passengers) {
      const keys = Object.keys(passengers);
      keys.forEach(
        (k) =>
          (totalFavorites += passengers[k].filter((t) => t.favorite).length)
      );
    }

    return totalFavorites;
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ color: "#fff" }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <Typography variant="subtitle1" style={{ color: 'indigo' }}>{`HAJonSoft | ${projectName}`}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => history.push("/favorite")}>
              <Badge badgeContent={favoriteCount()} color="primary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Grid>

          {!isMobile && (
            <Grid item xs={6}>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => history.push("/caravans")}
              >
                Caravans
              </Button>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => history.push("/market")}
              >
                Online
              </Button>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => history.push("/trade")}
              >
                Trade
              </Button>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => history.push("/help")}
              >
                Support
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
              <Button
                onClick={() => history.push("/profile")}
                style={{
                  textTransform: "none",
                }}
              >
                {`${authData.email}`}
              </Button>
            </Grid>
            <Grid item>
              <img src={authData.photoURL} alt="profile" style={{width: '32px', height: '32px', borderRadius: '16px'}} />
            </Grid>
            <Grid item>
              <Button onClick={handleLogout}>
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
