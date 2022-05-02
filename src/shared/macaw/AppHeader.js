import {
  AppBar,
  Badge,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment, Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { Close, SearchOutlined } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import _ from "lodash";
import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setKeyword } from "../../features/Caravans/redux/caravanSlice";
import { signOutWithGoogle } from "../../features/SignIn/redux/authSlice";
import firebaseConfig from "../../firebaseConfig";
import t from "../util/trans";

const AppHeader = () => {
  const authData = useSelector((state) => state.auth?.data);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const projectName = `${_.startCase(
    firebaseConfig.projectId.replace(/[0-9]/g, "").replace(/-/g, " ")
  )}`;

  let history = useHistory();
  const theme = useTheme();
  const passengers = useSelector((state) => state.passenger?.data);
  const keyword = useSelector((state) => state.caravan?.keyword);

  const handleLogout = () => {
    dispatch(signOutWithGoogle());
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

  const onSearchChange = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <AppBar position="static">
      <Helmet>
        <title>{`🐦| ${projectName}`}</title>
      </Helmet>
      <Toolbar style={{ color: "#fff" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item ms={2} xs={2}>
            <Typography variant="subtitle1">{`HAJonSoft | ${projectName}`}</Typography>
          </Grid>
          <Grid item md={1} xs={1}>
            <IconButton onClick={() => history.push("/favorite")}>
              <Badge badgeContent={favoriteCount()}>
                <FavoriteIcon style={{ color: "#fff" }} />
              </Badge>
            </IconButton>
          </Grid>

          {!isMobile && (
            <Grid item md={5} xs={5}>
              <Button
                style={{
                  textTransform: "none",
                  color: theme.palette.background.default,
                }}
                onClick={() => history.push("/caravans")}
              >
                {t("caravans")}
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  color: theme.palette.background.default,
                }}
                onClick={() => history.push("/market")}
              >
                {t("online")}
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  color: theme.palette.background.default,
                }}
                onClick={() => history.push("/trade")}
              >
                {t("trade")}
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  color: theme.palette.background.default,
                }}
                onClick={() => history.push("/help")}
              >
                {t("support-1")}
              </Button>
            </Grid>
          )}
          <Grid
            item
            md={4}
            sm={7}
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            aria-label="Sign out"
          >
            <Grid item>
              <FormControl
                variant="standard"
                style={{ backgroundColor: "white", height: "50%", borderRadius: '8px' }}
              >
                <Input
                  id="input-with-icon-adornment"
                  onChange={onSearchChange}
                  value={keyword}
                  placeholder="search all"
                  autoComplete="off"
                  autoFocus={true}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => dispatch(setKeyword(''))}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <img
                src={authData.photoURL}
                onClick={() => history.push("/profile")}
                alt="profile"
                style={{ width: "32px", height: "32px", borderRadius: "16px" }}
              />
            </Grid>
            <Grid item>
              <Button
                style={{ color: theme.palette.background.default }}
                onClick={handleLogout}
              >
                {t("sign-out")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
