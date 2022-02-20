import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlineCaravan/components/Advertisements";
import Footer from "./components/Footer";
import ImportantDates from "./components/importantDates";

const themes = {
  default: {
    primary: '#005477',
    secondary: '#ff8880',
    tertiary: '#b30c00',
    color4: '#ffa100',
    color5: '#0088a1',
  },
  morning: {
    primary: '#8db600',
    secondary: '#91b300',
    tertiary: '#b480ff',
    color4: '#e7ff80',
    color5: '#ff80ba',
  },
  lake: {
    primary: '#03a9f4',
    secondary: '#0085a3',
    tertiary: '#ff8a80',
    color4: '#0085a3',
    color5: '#ff1400',
  },
  mountain: {
    primary: '#9e9e9e',
    secondary: '#006b6b',
    tertiary: '#009999',
    color4: '#ccff80',
    color5: '#ffbfbf',
  },
  rocks: {
    primary: '#607d8b',
    secondary: '#ffc4bf',
    tertiary: '#ffa300',
    color4: '#80e8ff',
    color5: '#0085a3',
  },
  nature: {
    primary: '#4caf50',
    secondary: 'olive',
    tertiary: 'lime',
    color4: 'indigo',
    color5: 'yellow',
  },
  wood: {
    primary: '#caa472',
    secondary: '#400099',
    tertiary: '#ffd980',
    color4: '#00487d',
    color5: '#ffecbf',
  },
  leather: {
    primary: '#a80e00',
    secondary: '#77ff00',
    tertiary: '#bbff80',
    color4: '#005f70',
    color5: '#ffc4bf',
  },
  berry: {
    primary: '#4f86f7',
    secondary: '#80c9ff',
    tertiary: '#ffb200',
    color4: '#00487d',
    color5: '#ff3300',
  }
}

const DoveHome = ({ lang, onLanguageChange }) => {

  const [theme, setTheme] = useState(getStoredTheme() || 0)

  function getStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (typeof (storedTheme) == 'string') {
      return storedTheme
    }
  }

  const handleOnThemeChange = (e) => {
    setTheme(e.target.value);
    localStorage.setItem('theme', e.target.value);
  }
  return (
    <Grid
      container
      direction="column"
    >
      <Grid item>
        <DoveHeader theme={themes[Object.keys(themes)[theme]]} themes={themes} onThemeChange={handleOnThemeChange} />
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
          backgroundColor: themes[Object.keys(themes)[theme]].secondary,
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
