import React from "react";
import DoveFooter from "../footer/DoveFooter";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlinePackage/components/Advertisements";
import ImportantDates from "./components/importantDates";
import Footer from "./components/Footer"

const DoveHome = () => {
  return (
    <div style={{ background: "rgb(63 113 136 / 9%)", minHeight: "100vh" }}>
      <DoveHeader />
      <ImportantDates />
      <Advertisements />
      <DoveFooter />
      <Footer />
    </div>
  );
};

export default DoveHome;
