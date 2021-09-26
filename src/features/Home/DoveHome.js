import React from "react";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlinePackage/components/Advertisements";
import Footer from "./components/Footer";
import ImportantDates from "./components/importantDates";

const DoveHome = () => {
  return (
    <div style={{ background: "rgb(63 113 136 / 9%)" }}>
      <DoveHeader />
      <ImportantDates />
      <Advertisements />
      <Footer />
    </div>
  );
};

export default DoveHome;
