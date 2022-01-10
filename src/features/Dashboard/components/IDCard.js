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
import HotelHolyPreview from '../../../assets/hotel_holy.png';
import HotelWavePreview from '../../../assets/hotel_wave.png';
import HotelPreview from '../../../assets/hotel.png';
import OtagoPreview from '../../../assets/otago.png';
import OtagoBasicPreview from '../../../assets/otago_basic.png';
import OtagoBlurPreview from '../../../assets/otago_blur.png';
import OtagoLeafPreview from '../../../assets/otago_leaf.png';
import OtagoMadinahPreview from '../../../assets/otago_madinah.png';
import { makeStyles, TextField } from '@material-ui/core';
import { Field } from 'formik';
import firebase from '../../../firebaseapp';
import axios from 'axios';
import moment from 'moment-hijri';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    marginBottom: 15,
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

const getIDPositionProps = (idType) => {
  if (idType.includes('otago')) {
    return {
      umrah: {
        x: 15,
        y: 15,
      },
      year: {
        x: 15,
        y: 30,
      },
      image: {
        x: 15,
        y: 40,
      },
      fullName: {
        x: 10,
        y: 125,
      },
      passportNumber: {
        x: 195,
        y: 125,
      },
      passportLabel: {
        x: 165,
        y: 125,
      },
      tripName: {
        x: 120,
        y: 83,
      },
      countryFlag: {
        x: 200,
        y: 155,
      },
      caravanLogo: {
        x: 180,
        y: 70,
      },
      telephone: {
        x: 120,
        y: 107,
      },
    };
  } else if (idType.includes('hotel')) {
    return {
      image: {
        x: 9,
        y: 85,
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
      telephone: {
        x: 110,
        y: 140,
      },
    };
  }
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
  }, [caravanName]);

  const createPDF = async (
    idType,
    name,
    passportNumber,
    birthDate,
    tripName,
    nationality,
    telephone
  ) => {
    // Embed the Helvetica font
    const response = await fetch(`/pdfs/${idType}.pdf`);
    const existingPdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();

    const imageURL = await firebase
      .storage()
      .ref(`${nationality}/${passportNumber}.jpg`)
      .getDownloadURL();

    const { data } = await axios.get('https://flagcdn.com/en/codes.json');

    let countryCode = '';

    for (const key in data) {
      if (data[key].toLowerCase() === nationality.toLowerCase()) {
        countryCode = key;
        break;
      }
    }

    const jpgImageBytes = await fetch(imageURL)
      .then((res) => res.arrayBuffer())
      .catch((err) => {
        console.log(err, 'error');
      });

    const flagImageBytes = await fetch(
      `https://flagcdn.com/32x24/${countryCode}.png`
    )
      .then((res) => res.arrayBuffer())
      .catch((err) => {
        console.log(err, 'error');
      });

    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    const flagImage = await pdfDoc.embedPng(flagImageBytes);

    // write image
    if (getIDPositionProps(idType).image !== undefined) {
      firstPage.drawImage(jpgImage, {
        x: getIDPositionProps(idType).image.x,
        y: getIDPositionProps(idType).image.y,
        width: 50,
        height: 65,
      });
    }

    // write image
    if (getIDPositionProps(idType).caravanLogo !== undefined) {
      firstPage.drawImage(jpgImage, {
        x: getIDPositionProps(idType).caravanLogo.x,
        y: height - getIDPositionProps(idType).caravanLogo.y,
        width: 50,
        height: 55,
      });
    }

    // write flag image
    if (getIDPositionProps(idType).countryFlag !== undefined) {
      firstPage.drawImage(flagImage, {
        x: getIDPositionProps(idType).countryFlag.x,
        y: height - getIDPositionProps(idType).countryFlag.y,
        width: 28,
        height: 28,
      });
    }

    // write UMRAH
    if (getIDPositionProps(idType).umrah !== undefined) {
      firstPage.drawText('UMRAH', {
        x: getIDPositionProps(idType).umrah.x,
        y: height - getIDPositionProps(idType).umrah.y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write UMRAH year
    if (getIDPositionProps(idType).year !== undefined) {
      firstPage.drawText(
        `${new Date().getFullYear()} / ${moment("2022", 'YYYY').endOf('iMonth').format('iYYYY')}`,
        {
          x: getIDPositionProps(idType).year.x,
          y: height - getIDPositionProps(idType).year.y,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        }
      );
    }

    // write telephone
    if (getIDPositionProps(idType).telephone !== undefined) {
      firstPage.drawText(telephone, {
        x: getIDPositionProps(idType).telephone.x,
        y: height - getIDPositionProps(idType).telephone.y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write full name
    if (getIDPositionProps(idType).fullName !== undefined) {
      firstPage.drawText(name, {
        x: getIDPositionProps(idType).fullName.x,
        y: height - getIDPositionProps(idType).fullName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write passport Label
    if (getIDPositionProps(idType).passportLabel !== undefined) {
      firstPage.drawText('PASS #', {
        x: getIDPositionProps(idType).passportLabel.x,
        y: height - getIDPositionProps(idType).passportLabel.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write firstName
    if (getIDPositionProps(idType).firstName !== undefined) {
      firstPage.drawText(name.split(' ')[0], {
        x: getIDPositionProps(idType).firstName.x,
        y: height - getIDPositionProps(idType).firstName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    /// write medinah hotel
    if (getIDPositionProps(idType).medinahHotel !== undefined) {
      firstPage.drawText(detail.arrivalHotel.slice(0, 30), {
        x: getIDPositionProps(idType).medinahHotel.x,
        y: height - getIDPositionProps(idType).medinahHotel.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    /// write mekah hotel
    if (getIDPositionProps(idType).mekahHotel !== undefined) {
      firstPage.drawText(detail.departureHotel.slice(0, 30), {
        x: getIDPositionProps(idType).mekahHotel.x,
        y: height - getIDPositionProps(idType).mekahHotel.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    // write full name
    if (getIDPositionProps(idType).name !== undefined) {
      firstPage.drawText(name, {
        x: getIDPositionProps(idType).name.x,
        y: height - getIDPositionProps(idType).name.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write lastName
    if (getIDPositionProps(idType).lastName !== undefined) {
      firstPage.drawText(name.split(' ')[1], {
        x: getIDPositionProps(idType).lastName.x,
        y: height - getIDPositionProps(idType).lastName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write passport number
    if (getIDPositionProps(idType).passportNumber !== undefined)
      firstPage.drawText(passportNumber, {
        x: getIDPositionProps(idType).passportNumber.x,
        y: height - getIDPositionProps(idType).passportNumber.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

    /// write birthDate
    if (getIDPositionProps(idType).birthDate !== undefined) {
      firstPage.drawText(new Date(birthDate).toLocaleDateString('en-US'), {
        x: getIDPositionProps(idType).birthDate.x,
        y: height - getIDPositionProps(idType).birthDate.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write trip name
    if (getIDPositionProps(idType).tripName !== undefined) {
      firstPage.drawText(tripName, {
        x: getIDPositionProps(idType).tripName.x,
        y: height - getIDPositionProps(idType).tripName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
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
                  passenger.nationality,
                  values.telNumber
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

                            if (e.target.value === 'hotel_holy') {
                              setPreviewURL(HotelHolyPreview);
                            } else if (e.target.value === 'hotel') {
                              setPreviewURL(HotelPreview);
                            } else if (e.target.value === 'hotel_wave') {
                              setPreviewURL(HotelWavePreview);
                            } else if (e.target.value === 'otago') {
                              setPreviewURL(OtagoPreview);
                            } else if (e.target.value === 'otago_basic') {
                              setPreviewURL(OtagoBasicPreview);
                            } else if (e.target.value === 'otago_blur') {
                              setPreviewURL(OtagoBlurPreview);
                            } else if (e.target.value === 'otago_leaf') {
                              setPreviewURL(OtagoLeafPreview);
                            } else if (e.target.value === 'otag_madinah') {
                              setPreviewURL(OtagoMadinahPreview);
                            }
                          }}
                        >
                          <MenuItem value="hotel"> Hotel </MenuItem>
                          <MenuItem value="hotel_holy"> Hotel Holy </MenuItem>
                          <MenuItem value="hotel_wave"> Hotel Wave </MenuItem>
                          <MenuItem value="otago"> Otago </MenuItem>
                          <MenuItem value="otago_basic"> Otago Basic </MenuItem>
                          <MenuItem value="otago_blur"> Otago Blur </MenuItem>
                          <MenuItem value="otago_leaf"> Otago Leaf </MenuItem>
                          <MenuItem value="otago_madinah">
                            {' '}
                            Otago Madinah{' '}
                          </MenuItem>
                        </Field>
                      </Grid>
                    </Grid>

                    <FormHelperText error={!!errors.idType}>
                      {touched.idType && errors.idType}
                    </FormHelperText>
                  </FormControl>
                  <FormControl className={classes.root} fullWidth>
                    <InputLabel
                      shrink={false}
                      className={classes.inputLabel}
                      style={{
                        color:
                          touched.telNumber && Boolean(errors.telNumber)
                            ? 'red'
                            : null,
                      }}
                      htmlFor={'telNumber'}
                      placeholder={'telNumber'}
                      required={true}
                    >
                      Telephone Number
                    </InputLabel>

                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          className={classes.container}
                          name="telNumber"
                          required={true}
                          id="telNumber"
                          type="tel"
                          minLength="10"
                          placeholder="Telephone Number"
                          variant="outlined"
                          fullWidth
                          error={!!errors.telNumber}
                          value={values.telNumber}
                        />
                      </Grid>
                    </Grid>

                    <FormHelperText error={!!errors.telNumber}>
                      {touched.telNumber && errors.telNumber}
                    </FormHelperText>
                  </FormControl>
                </Grid>
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
