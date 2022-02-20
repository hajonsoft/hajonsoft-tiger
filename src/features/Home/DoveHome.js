import { Grid, useTheme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlineCaravan/components/Advertisements";
import Footer from "./components/Footer";
import ImportantDates from "./components/importantDates";


const DoveHome = ({ lang, onLanguageChange, onThemeChange, themeName, themes }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="column"
    >
      <Grid item>
        <DoveHeader onThemeChange={onThemeChange} themeName={themeName} themes={themes}/>
      </Grid>
      <Grid
        item
        md={12}
      >
        <Alert color="info">
          <ImportantDates />
        </Alert>
      </Grid>
      <Grid
        item
        style={{
          backgroundColor: theme.background?.default,
        }}
      >
        <Advertisements />
      </Grid>
      <Grid item>
        <Footer onLanguageChange={(l) => onLanguageChange(l)} lang={lang} />
      </Grid>
    </Grid>
  );
};

export default DoveHome;
