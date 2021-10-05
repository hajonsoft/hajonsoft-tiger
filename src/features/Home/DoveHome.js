import React from "react";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlinePackage/components/Advertisements";
import Footer from "./components/Footer";
import ImportantDates from "./components/importantDates";
import { Grid } from "@material-ui/core";

const DoveHome = ({ lang, onLanguageChange }) => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <DoveHeader />
      </Grid>
      <Grid
        item
        style={{
          background: "rgb(63 113 136 / 9%)",
        }}
      >
        <ImportantDates />
      </Grid>
      <Grid
        item
        style={{
          background: "rgb(63 113 136 / 9%)",
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
