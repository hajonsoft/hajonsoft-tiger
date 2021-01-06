import {
  faHandsHelping,
  faPassport,
  faPrint,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, Grid, Paper, Box, Typography } from "@material-ui/core";
//TODO: Redesign, talk to customers to get feedback
import axios from "axios";
import JSZip from "jszip";
import moment from "moment";
import React, {useState} from "react";
import firebase from "../../../firebaseapp";
import { nameParts } from "../../../util/nameParts";
import useTravellerState from "../redux/useTravellerState";
import BioStatistics from "./BioStatistics";
import NationalityStatistics from "./NationalityStatistics";
const storage = firebase.storage();
const PackageDetail = ({ data }) => {
  const { data: travellers, loading, error } = useTravellerState();
  const [shareProgress, setshareProgress] = useState({loading: false, value: 0})

  const handleShareClick = async () => {
    setshareProgress({loading: true, value: 0});
    var zip = new JSZip();
    const mapped = getTravellersJSON(travellers, data);
    zip.file("data.json", JSON.stringify(mapped));
    var photos = zip.folder("photos");
    var passports = zip.folder("passports");
    const travellersCount = travellers[data.name].length;
    for (let index = 0; index < travellersCount; index++) {
      const traveller = travellers[data.name][index];
      const photoData = await getStorageBlob(
        `${traveller.nationality}/${traveller.passportNumber}.jpg`
      );
      const passportData = await getStorageBlob(
        `${traveller.nationality}/${traveller.passportNumber}_passport.jpg`
      );
      if (photoData) {
        photos.file(`${traveller.passportNumber}.jpg`, photoData);
      }
      if (passportData) {
        passports.file(`${traveller.passportNumber}.jpg`, passportData);
      }
    setshareProgress(s=> s = ({...s, value: (index/travellersCount) * 100}));

    }

    zip.generateAsync({ type: "blob" }).then(function(content) {
      const newFile = new Blob([content], { type: "application/zip" });
      var csvURL = window.URL.createObjectURL(newFile);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", `${data.name}.zip`);
      tempLink.click();
    });

    setshareProgress({loading: false, value: 100});

  };

  const getStorageBlob = async (blobPath) => {
    try {
      const blobRef = storage.ref(blobPath);
      const blobUrl = await blobRef.getDownloadURL();
      const blobData = await axios.get(blobUrl, { responseType: "blob" });
      return blobData.data;
    } catch (err) {
      console.log(
        "%c 🍚 err: ",
        "font-size:20px;background-color: #EA7E5C;color:#fff;",
        err
      );
    }
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
                startIcon={shareProgress.loading && <CircularProgressWithLabel variant="determinate" size={30} value={shareProgress.value}/>}
              >Share</Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                endIcon={<FontAwesomeIcon icon={faPrint} />}
              >Reports</Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                endIcon={<FontAwesomeIcon icon={faHandsHelping} />}
              >Assist</Button>
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


function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}