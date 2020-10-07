import { Typography } from "@material-ui/core";
import React from "react";
import "./AppFooter.scss";

const AppFooter = () => (
  <React.Fragment>
    <div className="AppFooter" style={{ color: "#DDDDDA", opacity: "0.5" }}>
      <Typography variant="subtitle2" gutterBottom>
        FOR ALLIED UNIVERSAL EMPLOYEE USE ONLY
      </Typography>
      <Typography variant="caption">
        This website intended for authorized use only by Allied Universal
        employees only. Unauthorized access or use of this website may subject
        violators to administrative action, civil, and/or criminal prosecution
        under the United States Criminal Code (Title 18 U.S.C. § 1030).
      </Typography>
      <Typography variant="caption">
        When browsing this site, all activity and information may be monitored,
        intercepted, recorded, read, copied, or captured and disclosed by and to
        authorized personnel for official purposes, including criminal
        prosecution.
      </Typography>
    </div>
  </React.Fragment>
);

export default AppFooter;
