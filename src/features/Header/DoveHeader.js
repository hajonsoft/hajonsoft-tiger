import {
  AppBar,
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Home, PaletteOutlined, Security } from "@material-ui/icons";
import _ from "lodash";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import firebaseConfig from "../../firebaseConfig";
import t from "../../shared/util/trans";
import { getProfile } from "../Profile/redux/profileSlice";

const DoveHeader = ({ onThemeChange, themeName, themes }) => {
  const projectName = `${_.startCase(
    firebaseConfig.projectId.replace(/[0-9]/g, "").replace(/-/g, " ")
  )}`;
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <AppBar position="static">
      <Helmet>
        <title>{`🕊️| ${profile?.name || projectName}`}</title>
      </Helmet>
      <Grid
        container
        justifyContent="space-between"
        alignItems={"center"}
        direction={isMobile ? "column" : "row"}
      >
        <Grid
          item
          style={{
            cursor: "pointer",
            padding: "16px 0 0 16px",
            width: "50%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            color="textPrimary"
            onClick={() => history.push("/")}
            variant="h3"
          >
            {profile?.name || projectName}
          </Typography>
          <Typography
            style={{ paddingLeft: "32px", paddingBottom: "8px" }}
            variant="subtitle2"
            color="textSecondary"
          >
            {profile?.tel || "XXXX-XXX-XXX"}
          </Typography>
        </Grid>
        <Grid item md={6} sm={12} style={{ padding: "16px  32px" }}>
          <Grid
            container
            spacing={2}
            style={{
              borderRadius: isMobile ? "0" : "16px",
              backgroundColor: theme?.palette.background.paper,
              color: theme?.palette.text.secondary,
            }}
            justifyContent="center"
          >
            <Grid item>
              <Button
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                onClick={() => history.push("/")}
                startIcon={<Home />}
              >
                {t("home.home")}
              </Button>
            </Grid>
            {!isMobile && (
              <>
                <Grid item>
                  <Button
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    onClick={() => history.push("/hajj-packages")}
                  >
                    {t("hajj")}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    onClick={() => history.push("/umrah-packages")}
                  >
                    {t("umrah")}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    onClick={() => history.push("/tours")}
                  >
                    {t("tours")}
                  </Button>
                </Grid>
              </>
            )}
            {themes?.length > 0 && !isMobile && (
              <Grid item>
                <Box
                  style={{
                    marginRight: isMobile ? "0" : "16px",
                    borderRadius: "16px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>{`Theme`}</InputLabel>
                    <Select
                      value={themeName}
                      label="Theme"
                      fullWidth
                      onChange={onThemeChange}
                    >
                      {themes?.map((key) => (
                        <MenuItem value={key} key={`theme${key}`}>
                          <Box
                            key={`box${key}`}
                            display={"flex"}
                            alignItems="center"
                          >
                            <Icon style={{ marginRight: "16px" }}>
                              <PaletteOutlined fontSize="8" />
                            </Icon>
                            <Typography
                              variant="subtitle2"
                              style={{ textTransform: "capitalize" }}
                            >
                              {key}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            )}
            <Grid item>
              <Button
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                onClick={() => history.push("/login")}
                size="small"
                endIcon={<Security />}
              >
                {t("admin-login")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default DoveHeader;
