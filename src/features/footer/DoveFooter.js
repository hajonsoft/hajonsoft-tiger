import { Button, Grid, Paper } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import hummingBird from "../../images/humming-bird.svg";

const DoveFooter = () => {
  const history = useHistory();
  return (
    <Paper outlined style={{ width: "100%", backgroundColor: "#e8f5e9" }}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={2}
        style={{ padding: "1rem" }}
      >
        <Grid item md={9}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            style={{ textTransform: "none", backgroundColor: "#66bb6a" }}
            onClick={() => history.push("/reserve/interest")}
          >
            Register expression of interest
          </Button>
        </Grid>
        <Grid item md={2} container justify="flex-end" alignItems="center">
          <Grid item>
            <Button onClick={() => history.push("/admin")}>Admin</Button>
          </Grid>
          <Grid item>
            <img
              onClick={() => history.push("/admin")}
              src={hummingBird}
              alt="humming bird"
              width="64"
              height="64"
            ></img>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DoveFooter;
