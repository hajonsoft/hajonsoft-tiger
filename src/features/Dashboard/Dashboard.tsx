import { Typography, useMediaQuery } from "@material-ui/core";
import "date-fns";
import React from "react";
import dashboardImage from "../../images/travel-booking.svg";
import HajonsoftHeader from "../Header/HajonsoftHeader";
import useUserState from "../SignIn/redux/useUserState";

// TODO: show order history component here

const Dashboard = ({ employee }: any) => {
  const mobileMedia = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const { user } = useUserState({
    provider: process.env.REACT_APP_AUTHPROVIDER,
  });

  return (
    <React.Fragment>
      <div
        style={{
          background:
            "transparent linear-gradient(180deg, #005F90 0%, #0089C7 100%) 0% 0% no-repeat padding-box",
          opacity: 1,
        }}
      >
        <HajonsoftHeader />
        <div
          style={{
            display: "flex",
            flexDirection: mobileMedia ? "column" : "row",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <img src={dashboardImage} alt="travel" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
