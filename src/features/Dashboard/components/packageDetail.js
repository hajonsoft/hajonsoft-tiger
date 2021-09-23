import {
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Grid, Paper } from "@material-ui/core";
//TODO:PKG Redesign, talk to customers to get feedback
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ApplyForVisa from "./ApplyForVisa";
import BioStatistics from "./BioStatistics";
import NationalityStatistics from "./NationalityStatistics";

const PackageDetail = ({ data }) => {
  const passengers = useSelector(state => state.customer.data);
  const loading = useSelector(state => state.customer.loading);
  const error = useSelector(state => state.customer.error);

  const [applyForVisaOpen, setApplyForVisaOpen] = useState(false);


  return (
    <Paper style={{ padding: "2rem" }}>
      <Grid container justify="space-between" alignItems="flex-start">
        <Grid item>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
            <BioStatistics data={Object.values(passengers[data.name])} />
          )}
        </Grid>
        <Grid item>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
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
      <ApplyForVisa
        open={applyForVisaOpen}
        onClose={() => setApplyForVisaOpen(false)}
        caravan={data.name}
        passengers={passengers[data.name]}
      />
    </Paper>
  );
};

export default PackageDetail;
