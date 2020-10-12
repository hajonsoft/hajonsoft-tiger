import {
  Typography,
  useMediaQuery
} from "@material-ui/core";
import "date-fns";
import React from "react";
import dashboardImage from "../../images/4_SP.png";
import HajonsoftHeader from "../Header/HajonsoftHeader";

const Dashboard = ({ employee }: any) => {
  const mobileMedia = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
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
          <div style={{ width: mobileMedia ? "100%" : "25%", padding: "3rem" }}>
            <Typography gutterBottom variant="h5" style={{ color: "#DDDDDA" }}>
              Welcome to HajOnSoft.
            </Typography>
            <div
              style={{ color: "#DDDDDA", width: mobileMedia ? "80%" : "100%" }}
            >
              <Typography variant="caption">
                Thanks for your interest in using the HajOnSoft Web Portal! As a
                customer of HajOnSoft, you can use this system as a
                resource for accessing and updating information and personal
                preferences about scheduling, job opportunities, and other
                employment-related matters. You can also update your contact
                information and opt-in and out of various contact methods. You
                are not required to use this system — participation is 100%
                optional.
              </Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              width: mobileMedia ? "100%" : "70%",
              height: "auto",
            }}
          >
            <img
              src={dashboardImage}
              alt="security guards"
              style={{
                height: "400px",
                marginBottom: "1rem",
                width: mobileMedia ? "100%" : "auto",
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
