import React from "react";
import roundedPlus from "../../images/customer-home-background.svg";
import DoveFooter from "../footer/DoveFooter";
import DoveHeader from "../Header/DoveHeader";
import Advertisements from "../onlinePackage/components/Advertisements";
import ImportantDates from "./components/importantDates";

const DoveHome = () => {
  return (
    <div style={{ background: "url(" + roundedPlus + ")" }}>
      <DoveHeader />
      <ImportantDates />
      <Advertisements />
      <DoveFooter />
    </div>
  );
};

export default DoveHome;
