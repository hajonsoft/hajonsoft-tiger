import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import t from "../../../shared/util/trans";

const Footer = ({ lang, onLanguageChange }) => {
  const history = useHistory();
  const [language, setLanguage] = useState(lang);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    onLanguageChange(e.target.value);
  };

  return (
    <Box
      style={{
        backgroundColor: "#eceff1",
        color: "#718196",
        fontSize: "18px",
        width: "100%",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        style={{
          padding: "1rem",
          paddingLeft: "8rem",
        }}
      >
        <Grid item md={2}>
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "0.9rem" }}
                component="div"
              >
                {t("company")}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("about-us")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("contact-us")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="#"
                onClick={() => history.push("/login")}
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("admin-login")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2}>
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "0.9rem" }}
                component="div"
              >
                {t("support")}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                Spiceworks
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("help-center")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("safety-center")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2}>
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "0.9rem" }}
                component="div"
              >
                {t("reservations")}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="#"
                onClick={() => history.push("/reserve/interest")}
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("express-interest")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("privacy-policy")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                {t("terms-of-service")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2}>
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "0.9rem" }}
                component="div"
              >
                {t('social-media')}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                Instagram
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                Facebook
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                href="https://hajonsoft.on.spiceworks.com/portal"
                style={{ textTransform: "none", fontSize: "0.7rem" }}
              >
                Twitter
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            variant="standard"
          >
            <MenuItem value="en">
              <Typography variant="body1">English</Typography>
            </MenuItem>
            <MenuItem value="ar">
              <Typography variant="body1">اللغه العربيه</Typography>
            </MenuItem>
            <MenuItem value="fr">
              <Typography variant="body1">Française</Typography>
            </MenuItem>
          </Select>
          <Box mt={2}>
            <Typography variant="caption">
            &copy; {new Date().getFullYear()} Copyright:{" "}
            {window.location.origin}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
