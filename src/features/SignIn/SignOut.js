import { Box, Card, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useHistory } from "react-router";
import logo from "../../images/icon_logo_png.png";

const SignOut = () => {
  const history = useHistory();

  setTimeout(() => {
    history.push("/login");
  }, 3000);

  return (
    <div style={{ height: "60vh", padding: "3rem" }}>
      <Card
        elevation={4}
        style={{
          height: "100%",
          padding: "3rem",
          maxWidth: "650px",
          margin: "auto",
        }}
      >
        <Box p={4} style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="HajOnSoft" width={32}></img>
        </Box>
        <Typography color="textPrimary" variant="h5" gutterBottom>
          We will be here when you come back
        </Typography>
        <Alert color="warning">
          You've successfully signed out of your account, you can login back anytime.
        </Alert>
        <Alert color="info">
          When you are ready to login, just login back into your account
        </Alert>
      </Card>
    </div>
  );
};

export default SignOut;
