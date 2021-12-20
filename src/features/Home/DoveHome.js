import { Grid } from "@material-ui/core";
import { CalendarTodayOutlined } from "@material-ui/icons";
import React from "react";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlineCaravan/components/Advertisements";
import Footer from "./components/Footer";
import ImportantDates from "./components/importantDates";

const DoveHome = ({ lang, onLanguageChange }) => {
  return (
    <Grid
      container
      direction="column"
    >
      <Grid item>
        <DoveHeader />
      </Grid>
      <Grid
        item
        md={12}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-around" style={{backgroundColor: 'lime', color: '#8d006b', padding: '0 2rem'}}>
          <Grid item>
            <CalendarTodayOutlined />
          </Grid>
          <Grid item md={11}>
            <ImportantDates />
          </Grid>
        </Grid>
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
