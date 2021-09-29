import {
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Grid, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import BioStatistics from "./BioStatistics";
import NationalityStatistics from "./NationalityStatistics";

const PackageDetail = ({ data }) => {
  const passengers = useSelector(state => state?.caravan?.data);
  const loading = useSelector(state => state?.caravan?.loading);
  const error = useSelector(state => state?.caravan?.error);

  return (
    <Paper style={{ padding: "2rem" }}>
      <Grid container justify="space-between" alignItems="flex-start">
        <Grid item>
          {loading && <CircularProgress />}
          {error}
          {!loading && data && passengers && (
            <BioStatistics data={Object.values(passengers[data.name])} />
          )}
        </Grid>
        <Grid item>
          {loading && <CircularProgress />}
          {error}
          {!loading && data && passengers && (
            <NationalityStatistics
              data={Object.values(passengers[data.name])}
            />
          )}
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                endIcon={<FontAwesomeIcon icon={faPrint} />}
              >
                Reports
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                endIcon={<FontAwesomeIcon icon={faPrint} />}
              >
                Cards
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                endIcon={<FontAwesomeIcon icon={faPrint} />}
              >
                Bracelets
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PackageDetail;
