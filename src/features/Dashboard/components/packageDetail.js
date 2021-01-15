import {
  faHandsHelping,
  faPassport,
  faPrint,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Grid, Paper } from "@material-ui/core";
//TODO: Redesign, talk to customers to get feedback
import React, { useState } from "react";
import { getTravellersJSON, zipWithPhotos } from "../helpers/common";
import useTravellerState from "../redux/useTravellerState";
import ApplyForVisa from "./ApplyForVisa";
import BioStatistics from "./BioStatistics";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import NationalityStatistics from "./NationalityStatistics";

const PackageDetail = ({ data }) => {
  const { data: travellers, loading, error } = useTravellerState();
  const [shareProgress, setShareProgress] = useState({
    loading: false,
    value: 0,
  });
  const [applyForVisaOpen, setApplyForVisaOpen] = useState(false);

  const handleShareClick = async () => {
    setShareProgress({ loading: true, value: 0 });
    const travellersData = getTravellersJSON(travellers, data);
    const jsonData = JSON.stringify(travellersData);
    const zip = await zipWithPhotos(
      jsonData,
      travellers,
      data,
      setShareProgress
    );

    zip.generateAsync({ type: "blob" }).then(function(content) {
      const newFile = new Blob([content], { type: "application/zip" });
      var csvURL = window.URL.createObjectURL(newFile);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", `${data.name}.zip`);
      tempLink.click();
    });

    setShareProgress({ loading: false, value: 100 });
  };

  const handleApplyForVisa = () => {
    setApplyForVisaOpen(true);
  };
  return (
    <Paper style={{ padding: "2rem" }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
            <BioStatistics data={Object.values(travellers[data.name])} />
          )}
        </Grid>
        <Grid item>
          {loading && <CircularProgress />}
          {error}
          {!loading && (
            <NationalityStatistics
              data={Object.values(travellers[data.name])}
            />
          )}
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Button
                onClick={handleApplyForVisa}
                style={{ width: "100%" }}
                endIcon={<FontAwesomeIcon icon={faPassport} />}
              >
                Apply for visa
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                onClick={handleShareClick}
                endIcon={<FontAwesomeIcon icon={faShareSquare} />}
                startIcon={
                  shareProgress.loading && (
                    <CircularProgressWithLabel
                      variant="determinate"
                      size={30}
                      value={shareProgress.value}
                    />
                  )
                }
              >
                Share
              </Button>
            </Grid>
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
                endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
              >
                Assist
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ApplyForVisa
        open={applyForVisaOpen}
        onClose={() => setApplyForVisaOpen(false)}
        groupName={data.name}
        travellers={travellers[data.name]}
      />
    </Paper>
  );
};

export default PackageDetail;
