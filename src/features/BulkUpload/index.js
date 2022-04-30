import { Box, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { nationalities } from "../../data/nationality";
import firebase from "../../firebaseapp";
import { tableIcons } from "../Dashboard";
import UploadPhoto from "./uploadPhoto";

const BulkUpload = () => {
  const history = useHistory();
  const scannerData = useSelector((state) => state.online?.data);
  const jsonString = scannerData?.reserveJSON;
  console.log(
    "%cMyProject%cline:15%cjsonString",
    "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
    "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
    "color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px",
    jsonString
  );
  const packageName = scannerData?.caravan;
  const [photoMode, setPhotoMode] = useState(false);

  const initialPassengers = JSON.parse(jsonString);
  let initialPassportDetails = [];
  if (Array.isArray(initialPassengers)) {
    initialPassportDetails = initialPassengers;
  } else {
    initialPassportDetails = [initialPassengers];
  }
  const [passportsDetails, setPassportsDetails] = useState(
    initialPassportDetails.map((passportDetail) => ({
      name: passportDetail.given_names_readable,
      gender: passportDetail.sex === "M" ? "Male" : "Female",
      nationality: nationalities.find(
        (n) => n.code === passportDetail.nationality
      )?.name,
      passportNumber: passportDetail.document_number,
      passPlaceOfIssue: passportDetail.issuing_country,
      passIssueDt: moment(
        passportDetail.est_issuing_date_readable,
        "dd.MM.yyyy"
      ).format("YYYY-MM-DD"),
      passExpireDt: moment(
        passportDetail.expiration_date_readable,
        "dd.MM.yyyy"
      ).format("YYYY-MM-DD"),
      birthDate: moment(passportDetail.dob_readable, "dd.MM.yyyy").format(
        "YYYY-MM-DD"
      ),
      birthPlace: passportDetail.nationality,
    }))
  );

  function savePassengers(passportsDetails, packageName) {
    const reservationReference = firebase.database().ref(`customer/online`);

    passportsDetails.forEach((passport) => {
      reservationReference.push({
        ...passport,
        packageName,
      });
    });
    setPhotoMode(true);
  }

  return (
    <div style={{ maxWidth: "100%", padding: "1rem" }}>
      {photoMode && <UploadPhoto passportsDetails={passportsDetails} />}

      {!photoMode && (
        <>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "16px",
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                savePassengers(passportsDetails, packageName, history)
              }
              color="primary"
              size="large"
            >
              Continue ...{" "}
            </Button>
          </Box>
          <MaterialTable
            options={{
              search: false,
            }}
            icons={tableIcons}
            cellEditable={{
              cellStyle: {},
              onCellEditApproved: (newValue, _, rowData) => {
                return new Promise((resolve) => {
                  const updatedPassportDetails = passportsDetails.map(
                    (passport, index) => {
                      if (index === Number(rowData.tableData.id)) {
                        return {
                          ...passport,
                          [rowData.tableData.editCellList[0].field]: newValue,
                        };
                      }
                      return passport;
                    }
                  );

                  setPassportsDetails(updatedPassportDetails);

                  setTimeout(resolve, 200);
                });
              },
            }}
            columns={[
              { title: "Full Name", field: "name" },
              { title: "Gender", field: "gender" },
              { title: "Nationality", field: "nationality" },
              { title: "Passport Number", field: "passportNumber" },
              { title: "Passport Issued At", field: "passPlaceOfIssue" },
              { title: "Passport Issued Date", field: "passIssueDt" },
              { title: "Passport Expiry Date", field: "passExpireDt" },
              { title: "Birth Date", field: "birthDate" },
              { title: "Birth Place", field: "birthPlace" },
              //   { title: 'Passport Image', field: 'passportImage' },
              //   { title: 'Vaccine Image', field: 'vaccineImage' },
            ]}
            data={passportsDetails}
            title="Bulk Reservation"
          />
        </>
      )}
    </div>
  );
};

export default BulkUpload;
