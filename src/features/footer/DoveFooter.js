import { Button, Grid, Paper } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import hummingBird from "../../images/humming-bird.svg";

const DoveFooter = () => {
  const history = useHistory();
  return (
    <Paper outlined style={{ width: "100%", boxShadow: "none", backgroundColor: "#fff", marginBottom: "6rem", marginTop: "2rem" }}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={2}
        style={{ padding: "1rem" }}
      >
        <Grid item md={2} />
        <Grid item md={3}>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            fullWidth
            style={{ textTransform: "none", color: "#14618e", borderColor: "#14618e" }}
            onClick={() => history.push("/reserve/interest")}
          >
            Register expression of interest
          </Button>
        </Grid>
        <Grid item md={2} container justify="flex-end" alignItems="center">
          <Grid item>
            <Button onClick={() => history.push("/login")}>            <img
              onClick={() => history.push("/login")}
              src={hummingBird}
              alt="humming bird"
              width="64"
              height="64"
            ></img></Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DoveFooter;
