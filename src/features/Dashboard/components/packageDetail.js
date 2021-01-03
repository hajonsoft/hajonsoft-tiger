import {
  faHandsHelping,
  faPassport,
  faPrint,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Grid, Paper } from "@material-ui/core";
//TODO: Redesign, talk to customers to get feedback
import axios from "axios";
import JSZip from "jszip";
import moment from "moment";
import React from "react";
import firebase from "../../../firebaseapp";
import { nameParts } from "../../../util/nameParts";
import useTravellerState from "../redux/useTravellerState";
import BioStatistics from "./BioStatistics";
import NationalityStatistics from "./NationalityStatistics";
const storage = firebase.storage();
const PackageDetail = ({ data }) => {
  const { data: travellers, loading, error } = useTravellerState();

  const handleShareClick = async () => {
    var zip = new JSZip();
    const mapped = getTravellersJSON(travellers, data);
    zip.file("data.json", JSON.stringify(mapped));
    var photos = zip.folder("photos");
    var passports = zip.folder("passports");
    for (let index = 0; index < travellers[data.name].length; index++) {
        const traveller = travellers[data.name][index];
        const photoReference = storage.ref(`${traveller.nationality}/${traveller.passportNumber}.jpg`);
        const passportReference = storage.ref(`${traveller.nationality}/${traveller.passportNumber}_passport.jpg`);
        const photoUrl = await photoReference.getDownloadURL();
        const passportUrl = await passportReference.getDownloadURL();
        try {

          const photoData = await axios.get(photoUrl, { responseType: "blob" });
          const passportData = await axios.get(passportUrl, { responseType: "blob" });
          photos.file(`${traveller.passportNumber}.jpg`, photoData.data);
          passports.file(`${traveller.passportNumber}.jpg`, passportData.data);
        } catch (err){
          console.log('%c 🍚 err: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', err);
        }
    }

    zip.generateAsync({ type: "blob" }).then(function(content) {
      const newFile = new Blob([content], { type: "application/zip" });
      var csvURL = window.URL.createObjectURL(newFile);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", `${data.name}.zip`);
      tempLink.click();
    });
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
                style={{ width: "100%" }}
                variant="outlined"
                color="primary"
                endIcon={<FontAwesomeIcon icon={faPassport} />}
              >
                Apply for visa
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                variant="outlined"
                color="primary"
                onClick={handleShareClick}
                endIcon={<FontAwesomeIcon icon={faShareSquare} />}
              >
                {" "}
                Share
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                variant="outlined"
                color="primary"
                endIcon={<FontAwesomeIcon icon={faPrint} />}
              >
                {" "}
                Reports
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                variant="outlined"
                color="primary"
                endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
              >
                {" "}
                Assist
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PackageDetail;
function getTravellersJSON(travellers, data) {
  return travellers[data.name].map((t) => {
    const _nameParts = nameParts(t.name);
    let _nameArabicParts = nameParts(t.nameArabic);
    if (_nameArabicParts[0] === "invalid") {
      _nameArabicParts = ["", "", "", ""];
    }
    return {
      nationality: { name: t.nationality },
      name: {
        full: t.name,
        first: _nameParts[0],
        last: _nameParts[3],
        father: _nameParts[1],
        grand: _nameParts[2],
      },
      nameArabic: {
        full: t.nameArabic,
        first: _nameArabicParts[0],
        last: _nameArabicParts[3],
        father: _nameArabicParts[1],
        grand: _nameArabicParts[2],
      },
      mobileNumber: t.phone,
      gender: t.gender,
      dob: { dmy: moment(t.birthDate).format("DD/MM/YYYY") },
      passIssueDt: { dmy: moment(t.passIssueDt).format("DD/MM/YYYY") },
      passExpireDt: { dmy: moment(t.passExpireDt).format("DD/MM/YYYY") },
      birthPlace: t.birthPlace,
      profession: t.profession,
      address: t.address,
      passportNumber: t.passportNumber,
      placeOfIssue: t.passPlaceOfIssue,
      codeline: t.codeline,
    };
  });
}
