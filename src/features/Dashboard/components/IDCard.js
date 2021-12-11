import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { Formik, Form } from 'formik';
import HotelPreview from './Hotel.png';
import CustomPreview from './Custom.png';
import OranPreview from './Oran.png';
import { makeStyles } from '@material-ui/core';
import { Field } from 'formik';
import firebase from '../../../firebaseapp';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
  },
  container: {
    borderColor: theme.palette.primary.main,
  },
  inputLabel: {
    marginTop: '-45px',
    color: () => '',
    '&.focused': {
      color: theme.palette.primary.main,
    },
  },
  submitBtn: {
    background: '#178CF9',
    marginRight: '3rem',
    textTransform: 'capitalize',
    color: 'white',
    marginBottom: '5rem',
  },
}));

const idCardProps = {
  Oran: {
    image: {
      x: 9,
      y: 67,
    },
    firstName: {
      x: 124,
      y: 32,
    },
    lastName: {
      x: 124,
      y: 46,
    },
    passportNumber: {
      x: 124,
      y: 60,
    },
    birthDate: {
      x: 124,
      y: 74,
    },
    tripName: {
      x: 124,
      y: 89,
    },
  },
  Hotel: {
    image: {
      x: 9,
      y: 95,
    },
    firstName: {
      x: 130,
      y: 32,
    },
    lastName: {
      x: 130,
      y: 20,
    },
    passportNumber: {
      x: 130,
      y: 44,
    },
    tripName: {
      x: 130,
      y: 54,
    },
    medinahHotel: {
      x: 10,
      y: 105,
    },
    mekahHotel: {
      x: 128,
      y: 105,
    },
  },
  Custom: {
    image: {
      x: 9,
      y: 88,
    },
    name: {
      x: 70,
      y: 82,
    },
    passportNumber: {
      x: 70,
      y: 92,
    },
    medinahHotel: {
      x: 70,
      y: 105,
    },
    mekahHotel: {
      x: 70,
      y: 117,
    },
  },
};

const IDCard = ({ passengers, caravanName }) => {
  const [previewURL, setPreviewURL] = React.useState(null);
  const [detail, setDetail] = React.useState({});
  const classes = useStyles();

  React.useEffect(() => {
    firebase
      .database()
      .ref('protected/onlinePackage')
      .once('value', (snapshot) => {
        setDetail(
          Object.values(snapshot.toJSON()).find((x) =>
            x.name.includes(caravanName)
          )
        );
      });
  }, []);

  const createPDF = async (
    idType,
    name,
    passportNumber,
    birthDate,
    tripName,
    nationality
  ) => {
    // Embed the Helvetica font
    const response = await fetch(`/pdfs/${idType}.pdf`);
    const existingPdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();

    // const imageURL = await firebase
    //   .storage()
    //   .ref(`${nationality}/${passportNumber}.jpg`)
    //   .getDownloadURL();

    const imageURL = 'https://avatars.githubusercontent.com/u/24833900?v=4';

    console.log(imageURL);

    const jpgImageBytes = await fetch(imageURL)
      .then((res) => res.arrayBuffer())
      .catch((err) => {
        console.log(err, 'error');
      });

    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

    // write image
    firstPage.drawImage(jpgImage, {
      x: idCardProps[idType].image.x,
      y: idCardProps[idType].image.y,
      width: idType === 'Custom' ? 57 : 50,
      height: idType === 'Custom' ? 57 : 50,
    });

    /// write firstName
    if (idCardProps[idType].firstName !== undefined) {
      firstPage.drawText(name.split(' ')[0], {
        x: idCardProps[idType].firstName.x,
        y: height - idCardProps[idType].firstName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });
    }
    /// write medinah hotel
    if (idCardProps[idType].medinahHotel !== undefined) {
      firstPage.drawText(detail.arrivalHotel.slice(0, 30), {
        x: idCardProps[idType].medinahHotel.x,
        y: height - idCardProps[idType].medinahHotel.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });
    }
    /// write mekah hotel
    if (idCardProps[idType].mekahHotel !== undefined) {
      firstPage.drawText(detail.departureHotel.slice(0, 30), {
        x: idCardProps[idType].mekahHotel.x,
        y: height - idCardProps[idType].mekahHotel.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });
    }
    // write full name
    if (idCardProps[idType].name !== undefined) {
      firstPage.drawText(name, {
        x: idCardProps[idType].name.x,
        y: height - idCardProps[idType].name.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });
    }

    /// write lastName
    if (idCardProps[idType].lastName !== undefined) {
      firstPage.drawText(name.split(' ')[1], {
        x: idCardProps[idType].lastName.x,
        y: height - idCardProps[idType].lastName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });
    }

    /// write passport number
    if (idCardProps[idType].passportNumber !== undefined)
      firstPage.drawText(passportNumber, {
        x: idCardProps[idType].passportNumber.x,
        y: height - idCardProps[idType].passportNumber.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });

    /// write birthDate
    if (idCardProps[idType].birthDate !== undefined) {
      firstPage.drawText(new Date(birthDate).toLocaleDateString('en-US'), {
        x: idCardProps[idType].birthDate.x,
        y: height - idCardProps[idType].birthDate.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });
    }

    /// write trip name
    if (idCardProps[idType].tripName !== undefined) {
      firstPage.drawText(tripName, {
        x: idCardProps[idType].tripName.x,
        y: height - idCardProps[idType].tripName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });
    }

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, `${name}.pdf`, 'application/pdf');
  };

  return (
    <Grid container>
      <Grid item md={6}>
        <Grid container spacing={3}>
          <h1>options</h1>
          <Formik
            enableReinitialize
            initialValues={{
              idType: '',
              reportName: '',
            }}
            onSubmit={(values) => {
              passengers.forEach((passenger) => {
                createPDF(
                  values.idType,
                  passenger.name,
                  passenger.passportNumber,
                  passenger.birthDate,
                  detail.name,
                  passenger.nationality
                );
              });
            }}
          >
            {({
              setFieldValue,
              isValid,
              values,
              errors,
              isSubmitting,
              touched,
            }) => (
              <Form style={{ width: '90%' }}>
                <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                  <FormControl className={classes.root} fullWidth>
                    <InputLabel
                      shrink={false}
                      className={classes.inputLabel}
                      style={{
                        color:
                          touched.idType && Boolean(errors.idType)
                            ? 'red'
                            : null,
                      }}
                      htmlFor={'idType'}
                      placeholder={'idType'}
                      required={true}
                    >
                      ID Type
                    </InputLabel>
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <Field
                          as={Select}
                          className={classes.container}
                          name="idType"
                          required={true}
                          id="idType"
                          placeholder="ID Type"
                          variant="outlined"
                          fullWidth
                          error={!!errors.idType}
                          value={values.idType}
                          onChange={(e) => {
                            setFieldValue('idType', e.target.value);
                            e.target.value === 'Custom'
                              ? setPreviewURL(CustomPreview)
                              : e.target.value === 'Hotel'
                              ? setPreviewURL(HotelPreview)
                              : setPreviewURL(OranPreview);
                          }}
                        >
                          <MenuItem value="Custom"> Custom </MenuItem>
                          <MenuItem value="Hotel"> Hotel </MenuItem>
                          <MenuItem value="Oran"> Oran </MenuItem>
                        </Field>
                      </Grid>
                    </Grid>
                    <FormHelperText error={!!errors.idType}>
                      {touched.idType && errors.idType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                  <InputControl
                    name="reportName"
                    label="Report Name"
                    required
                    value={''}
                    error={touched.reportName && Boolean(errors.reportName)}
                    helperText={touched.reportName && errors.reportName}
                    options={[
                      { value: 'Custom', label: 'Custom' },
                      { value: 'Hotel', label: 'Hotel' },
                      { value: 'Oran', label: 'Oran' },
                    ]}
                  />
                </Grid> */}
                <Grid item justifyContent="flex-start">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid || isSubmitting}
                    className={classes.submitBtn}
                    size="large"
                    type="submit"
                  >
                    Print Cards
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>

      <Grid item md={6}>
        <h1>IMAGE PREVIEW</h1>
        {previewURL && (
          <img
            src={previewURL}
            style={{ width: '100%' }}
            alt="id card type preview"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default IDCard;
