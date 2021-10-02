import React from "react";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlinePackage/components/Advertisements";
import Footer from "./components/Footer";
import ImportantDates from "./components/importantDates";

const DoveHome = ({lang, onLanguageChange}) => {
  return (
    <div style={{ background: "rgb(63 113 136 / 9%)", minHeight: '100vh', position: 'relative', paddingBottom: '15rem' }}>
      <DoveHeader />
      <ImportantDates />
      <Advertisements />
      <Footer onLanguageChange={(l) => onLanguageChange(l)} lang={lang}/>
    </div>
  );
};

export default DoveHome;
