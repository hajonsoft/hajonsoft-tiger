import { Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlineCaravan/components/Advertisements";
import Footer from "./components/Footer";
import ImportantDates from "./components/importantDates";


const DoveHome = ({ lang, onLanguageChange, onThemeChange, themeName, themes }) => {
  return (
    <Box style={{ width: '100%', minHeight: '100vh' }}
    >
      <DoveHeader onThemeChange={onThemeChange} themeName={themeName} themes={themes} />
      <Alert color="info">
        <ImportantDates />
      </Alert>
      <Box style={{ height: '100%' }}
      >
        <Advertisements />
      </Box>
      <Box>
        <Footer onLanguageChange={(l) => onLanguageChange(l)} lang={lang} />
      </Box>
    </Box>
  );
};

export default DoveHome;
