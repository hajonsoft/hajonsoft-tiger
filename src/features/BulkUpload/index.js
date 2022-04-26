import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {Box, Button} from '@material-ui/core'
import MaterialTable from 'material-table';
import { tableIcons } from '../Dashboard';
import firebase from '../../firebaseapp';
import UploadPhoto from './uploadPhoto';

const BulkUpload = () => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const passportJSON = JSON.parse(JSON.stringify(params.get('json')));
  const [photoMode, setPhotoMode] = useState(false);
  const [passportsDetails, setPassportsDetails] = useState(
    JSON.parse(passportJSON).map((passportDetail) => ({
      name: passportDetail.given_names_readable,
      gender: passportDetail.sex === 'M' ? 'Male' : 'Female',
      nationality: passportDetail.nationality,
      passportNumber: passportDetail.document_number,
      passPlaceOfIssue: passportDetail.issuing_country,
      passIssueDt: passportDetail.est_issuing_date_readable,
      passExpireDt: passportDetail.expiration_date_readable,
      birthDate: passportDetail.dob_readable,
      birthPlace: passportDetail.nationality,
    }))
  );

  const packageName = params.get('caravan');

  function savePassengers(passportsDetails, packageName) {
    const reservationReference = firebase
      .database()
      .ref(`customer/online`);
  
    passportsDetails.forEach((passport) => {
      reservationReference.push({
        ...passport,
        packageName,
      });
    });
    setPhotoMode(true)
  }

  return (
    <div style={{ maxWidth: '100%', padding: '1rem' }}>
      {photoMode && <UploadPhoto passportsDetails={passportsDetails} />}

      {!photoMode && <>
      <Box style={{display: 'flex', justifyContent: 'flex-end', padding: '16px'}}>
        <Button variant="contained" onClick={() => savePassengers(passportsDetails, packageName, history)} color="primary" size="large">Continue ... </Button>
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
          { title: 'Full Name', field: 'name' },
          { title: 'Gender', field: 'gender' },
          { title: 'Nationality', field: 'nationality' },
          { title: 'Passport Number', field: 'passportNumber' },
          { title: 'Passport Issued At', field: 'passPlaceOfIssue' },
          { title: 'Passport Issued Date', field: 'passIssueDt' },
          { title: 'Passport Expiry Date', field: 'passExpireDt' },
          { title: 'Birth Date', field: 'birthDate' },
          { title: 'Birth Place', field: 'birthPlace' },
          //   { title: 'Passport Image', field: 'passportImage' },
          //   { title: 'Vaccine Image', field: 'vaccineImage' },
        ]}
        data={passportsDetails}
        title="Bulk Reservation"
      />
      </>}
    </div>
  );
};

export default BulkUpload;


