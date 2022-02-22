import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
  useTheme,
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

  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      style={{ backgroundColor: theme.palette.grey[100] }}
      spacing={10}
    >
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
            >
              {t("company")}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}
            >
              {t("about-us")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}

            >
              {t("contact-us")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="#"
              onClick={() => history.push("/login")}
              style={{ textTransform: "none", color: theme.palette.text.secondary }}

            >
              {t("admin-login")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
            >
              {t("support")}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}
            >
              Spiceworks
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}
            >
              {t("help-center")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}
            >
              {t("safety-center")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item >
        <Grid container direction="column">
          <Grid item>
            <Typography
              variant="subtitle1"
              gutterBottom
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
              style={{ textTransform: "none", color: theme.palette.text.secondary }}

            >
              {t("express-interest")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}

            >
              {t("privacy-policy")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}
            >
              {t("terms-of-service")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item >
        <Grid container direction="column">
          <Grid item>
            <Typography
              variant="subtitle1"
              component="div"
            >
              {t('social-media')}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}

            >
              Instagram
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}

            >
              Facebook
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"

              href="https://hajonsoft.on.spiceworks.com/portal"
              style={{ textTransform: "none", color: theme.palette.text.secondary }}

            >
              Twitter
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Select
          value={language}
          onChange={handleLanguageChange}
          variant="standard"
          style={{ color: theme.palette.text.secondary }}
        >
          <MenuItem value="en">
            <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>English</Typography>
          </MenuItem>
          <MenuItem value="ar">
            <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>اللغه العربيه</Typography>
          </MenuItem>
          <MenuItem value="fr">
            <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>Française</Typography>
          </MenuItem>
        </Select>
        <Box mt={2}>
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} Copyright:{" "}
            {window.location.origin}
          </Typography>
        </Box>
      </Grid>
    </Grid >
  );
};

export default Footer;
