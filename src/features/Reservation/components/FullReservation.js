import { Avatar, Box, Button, IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { Form, Formik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { nationalities } from '../../../data/nationality';
import firebase from '../../../firebaseapp';
import t from '../../../shared/util/trans';
import InputControl from './InputControl';
import emailjs from 'emailjs-com';

const storage = firebase.storage();

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    color: '#385273',
    padding: 15,
    backgroundColor: 'white',
  },
  submitBtn: {
    background: '#178CF9',
    marginRight: '3rem',
    textTransform: 'capitalize',
    color: 'white',
    marginBottom: '5rem',
  },
  container: {
    maxWidth: 1000,
    overflowY: 'auto',
    padding: '0px 2rem',
  },
  p5: {
    padding: 5,
  },
  avatarContainer: {
    border: '1px solid #F7F7FA',
    padding: '1.4rem',
    borderRadius: '50%',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 20,
  },
  posRelative: {
    position: 'relative',
  },
  imgIconContainer: {
    position: 'absolute',
    top: -35,
    left: 64,
  },
  addIcon: {
    color: '#157CFC',
    fontSize: '1.75rem',
  },
  mt10: {
    marginTop: 10,
  },
  imgText: {
    color: '#8A9EB5',
    fontSize: '0.75rem',
    textAlign: 'left',
    padding: '1.5rem 0px',
  },
  pt3rem: {
    paddingTop: '1.5rem',
  },
  pb0: {
    padding: 0,
  },
  p1rem0: {
    padding: '1rem 0px',
  },
  pt1rem: {
    paddingTop: '1rem',
  },
  mb1rem: {
    marginBottom: '1rem',
  },
  passportBox: {
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '300px',
    cursor: 'pointer',
    overflow: 'hidden',
  },
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter your Full Name')
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Please enter your full name.')
    .required('Full name is required (as it appears on passport) '),
  gender: yup
    .string('Select your gender')
    .required('Gender is required')
    .test('not-null', 'Please select your gender', (value) => value !== 'none'),
  nationality: yup
    .string('Select your country')
    .required('Nationality is required')
    .test(
      'not-null',
      'Please select your country',
      (value) => value !== 'none'
    ),
  passportNumber: yup
    .string('Enter your passport number')
    .required('Passport number is required'),
  passPlaceOfIssue: yup
    .string('Enter your passport issuedAt')
    .required('Passport issuedAt is required'),
  passIssueDt: yup
    .string('Enter your passport issue date')
    .required('Passport issue date is required'),
  passExpireDt: yup
    .string('Enter your passport expiry date')
    .required('Passport expiry date is required'),
  birthDate: yup
    .string('Enter your birth date')
    .required('birth date is required'),
  birthPlace: yup
    .string('Enter your birth place')
    .required('Birth place is required'),
  phone: yup
    .string('Enter your phone number')
    .required('phone number is required'),
});

const FullReservation = ({ openSuccessModal, isModalOpen }) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  let { packageName } = useParams();
  const [reservationNumber, setReservationNumber] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [passportURL, setPassportURL] = useState('');
  const [vaccineURL, setVaccineURL] = useState('');
  const [record, setRecord] = useState({});

  //TODO:RTK:profile replace this code with dispatch(getProfile()) and useSelector
  useEffect(() => {
    firebase
      .database()
      .ref(`protected/profile`)
      .once('value', (snapshot) => {
        if (snapshot.toJSON()) {
          setRecord(snapshot.toJSON());
        }
      });
  }, []);

  function uploadImageHandler(cb) {
    inputRef.current.click();
    inputRef.current.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        cb(reader.result);
      };
      reader.readAsDataURL(file);
    };
  }

  const handleSubmitForm = async (values, actions) => {
    if (!photoURL || !passportURL) {
      alert('upload your portrait photo and the passport image');
      return;
    }

    const photoFileName = `${values.nationality ||
      'unknown'}/${values.passportNumber || 'unknown'}.jpg`;
    let photoRef = storage.ref(photoFileName);
    photoRef
      .putString(photoURL, 'data_url')
      .then((snap) => {
        console.log(snap, 1);
      })
      .catch((error) => {
        alert('An error occurred');
        console.log(error, '__error___');
        return;
      });

    const passportFileName = `${values.nationality ||
      'unknown'}/${values.passportNumber || 'unknown'}_passport.jpg`;
    let passportRef = storage.ref(passportFileName);
    passportRef
      .putString(passportURL, 'data_url')
      .then((snap) => {
        console.log(snap, 1);
      })
      .catch((error) => {
        alert('An error 2 occurred');
        console.log(error, '___error2___');
        return;
      });

    const vaccineFileName = `${values.nationality ||
      'unknown'}/${values.passportNumber || 'unknown'}_vaccine.jpg`;
    let vaccineRef = storage.ref(vaccineFileName);

    vaccineRef
      .putString(vaccineURL, 'data_url')
      .then((snap) => {
        console.log(snap, 1);
      })
      .catch((error) => {
        alert('An error  occurred');
        return;
      });

    const reservationReference = firebase.database().ref(`customer/online`);
    const reservationResult = reservationReference.push({
      ...values,
      photoFileName,
      passportFileName,
      vaccineFileName,
      packageName,
    });

    setReservationNumber(reservationResult.key);

    emailjs
      .send(
        'service_wgqrq6n',
        'template_8n6k25r',
        {
          accountURL: window.location.origin,
          reply_to: 'HajonSoft',
          firstName: record.name,
          send_to: record.email,
          reservationUserName: packageName,
        },
        'user_wOpEYd0mwEHD1Tr25A9NP'
      )
      .then((res) => {
        openSuccessModal();
      })
      .catch((err) => {
        openSuccessModal();
      });
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        className={classes.titleContainer}
      >
        <Grid item>
          <FlightTakeoffIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {t('reservation.full-reservation')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{packageName}</Typography>
        </Grid>
      </Grid>
      {!reservationNumber && (
        <Formik
          initialValues={{ name: '', gender: '', nationality: '' }}
          onSubmit={handleSubmitForm}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, isSubmitting, isValid }) => {
            return (
              <Form className={classes.pt3rem}>
                <Grid
                  container
                  style={{ backgroundColor: 'white' }}
                  spacing={2}
                >
                  <Grid item md={12}>
                    <Box ml={2}>
                      <Typography variant="subtitle2">
                        {t('reservation.basic-information')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2}>
                    <input ref={inputRef} hidden type="file" accept="image/*" />
                    <div className={classes.avatarContainer}>
                      <Avatar
                        src={
                          photoURL
                            ? photoURL
                            : 'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'
                        }
                        className={classes.avatar}
                      />
                      <div className={classes.posRelative}>
                        <div className={classes.imgIconContainer}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              uploadImageHandler((val) => setPhotoURL(val));
                            }}
                          >
                            <AddIcon className={classes.addIcon} />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={9}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item md={12}>
                        <InputControl
                          name="name"
                          label={t('reservation.full-name')}
                          required
                          value={values.name}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <InputControl
                          name="nameArabic"
                          label={t('reservation.arabic-name')}
                          value={values.arabicName}
                          error={
                            touched.nameArabic && Boolean(errors.nameArabic)
                          }
                          helperText={touched.nameArabic && errors.nameArabic}
                          required={false}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="space-around">
                    <Grid item md={5} xs={12}>
                      <InputControl
                        name="gender"
                        label={t('reservation.gender')}
                        required
                        value={values.gender}
                        error={touched.gender && Boolean(errors.gender)}
                        helperText={touched.gender && errors.gender}
                        options={[
                          { value: '', label: 'Gender' },
                          { value: 'Male', label: 'Male' },
                          { value: 'Female', label: 'Female' },
                        ]}
                      />
                    </Grid>
                    <Grid item md={5} xs={12}>
                      <InputControl
                        name="nationality"
                        label={t('reservation.nationality')}
                        required
                        value={values.nationality}
                        error={
                          touched.nationality && Boolean(errors.nationality)
                        }
                        helperText={touched.nationality && errors.nationality}
                        options={[
                          { value: '', label: 'Nationality' },
                          ...nationalities.map((nationality) => ({
                            value: nationality.name,
                            label: nationality.name,
                          })),
                        ]}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={12} className={classes.p1rem0}>
                    <Box ml={2} mb={2}>
                      <Typography variant="subtitle2">
                        {t('passport-information')}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid container justifyContent="space-around" spacing={2}>
                    <Grid item xs={5} md={5}>
                      <InputControl
                        name="passportNumber"
                        label={t('reservation.passport-number')}
                        value={values.passportNumber}
                        error={
                          touched.passportNumber &&
                          Boolean(errors.passportNumber)
                        }
                        helperText={
                          touched.passportNumber && errors.passportNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={5} md={5}>
                      <InputControl
                        name="passPlaceOfIssue"
                        label={t('reservation.issued-at')}
                        value={values.passPlaceOfIssue}
                        error={
                          touched.passPlaceOfIssue &&
                          Boolean(errors.passPlaceOfIssue)
                        }
                        helperText={
                          touched.passPlaceOfIssue && errors.passPlaceOfIssue
                        }
                      />
                    </Grid>
                    <Grid item xs={5} md={5}>
                      <InputControl
                        name="passIssueDt"
                        label={t('reservation.passport-issue-date')}
                        value={values.passIssueDt}
                        error={
                          touched.passIssueDt && Boolean(errors.passIssueDt)
                        }
                        helperText={touched.passIssueDt && errors.passIssueDt}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={5} md={5}>
                      <InputControl
                        name="passExpireDt"
                        label={t('reservation.passport-expire-date')}
                        value={values.passExpireDt}
                        error={
                          touched.passExpireDt && Boolean(errors.passExpireDt)
                        }
                        helperText={touched.passExpireDt && errors.passExpireDt}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={5} md={5}>
                      <InputControl
                        name="birthDate"
                        label={t('reservation.birth-date')}
                        value={values.birthDate}
                        error={touched.birthDate && Boolean(errors.birthDate)}
                        helperText={touched.birthDate && errors.birthDate}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={5} md={5}>
                      <InputControl
                        name="birthPlace"
                        label={t('reservation.birth-place')}
                        value={values.birthPlace}
                        error={touched.birthPlace && Boolean(errors.birthPlace)}
                        helperText={touched.birthPlace && errors.birthPlace}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="subtitle2">
                      {t('reservation.upload-your-passport')}
                    </Typography>
                    <Box
                      className={classes.passportBox}
                      onClick={(e) => {
                        e.stopPropagation();
                        uploadImageHandler((val) => setPassportURL(val));
                      }}
                    >
                      {passportURL ? (
                        <img
                          src={passportURL}
                          width="100%"
                          height="100%"
                          alt="passport"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <>
                          <AddCircleOutlineIcon
                            color="primary"
                            fontSize="large"
                          />
                          <Typography>
                            {t('reservation.upload-your-passport')}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item md={12} className={classes.p1rem0}>
                    <Box ml={2} mb={2}>
                      <Typography variant="subtitle2">
                        {t('reservation.residency-permit-info')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container justifyContent="space-around" spacing={1}>
                    <Grid item xs={12} md={3}>
                      <InputControl
                        name="idNumber"
                        required={false}
                        label={t('reservation.id-number')}
                        value={values.idNumber}
                        error={touched.idNumber && Boolean(errors.idNumber)}
                        helperText={touched.idNumber && errors.idNumber}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputControl
                        name="idNumberIssueDate"
                        label={t('reservation.id-issue-date')}
                        required={false}
                        value={values.idNumberIssueDate}
                        error={
                          touched.idNumberIssueDate &&
                          Boolean(errors.idNumberIssueDate)
                        }
                        helperText={
                          touched.idNumberIssueDate && errors.idNumberIssueDate
                        }
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputControl
                        name="idNumberExpireDate"
                        label={t('reservation.id-expire-date')}
                        value={values.idNumberExpireDate}
                        required={false}
                        error={
                          touched.idNumberExpireDate &&
                          Boolean(errors.idNumberExpireDate)
                        }
                        helperText={
                          touched.idNumberExpireDate &&
                          errors.idNumberExpireDate
                        }
                        type="date"
                      />
                    </Grid>
                  </Grid>

                  <Grid item md={12}>
                    <Box ml={2} mb={2}>
                      <Typography variant="subtitle2">
                        {t('reservation.upload-your-vaccine')}
                      </Typography>
                    </Box>
                    <Box
                      className={classes.passportBox}
                      onClick={(e) => {
                        e.stopPropagation();
                        uploadImageHandler((val) => setVaccineURL(val));
                      }}
                    >
                      {vaccineURL ? (
                        <img
                          src={vaccineURL}
                          width="100%"
                          height="100%"
                          alt="passport"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <>
                          <AddCircleOutlineIcon
                            color="primary"
                            fontSize="large"
                          />
                          <Typography>
                            {t('reservation.upload-your-vaccine')}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item md={12} className={classes.p1rem0}>
                    <Box ml={2} mb={2}>
                      <Typography variant="subtitle2">
                        {t('more-information')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container justifyContent="space-around" spacing={2}>
                    <Grid item xs={12} md={5}>
                      <InputControl
                        name="profession"
                        label={t('reservation.profession')}
                        value={values.profession}
                        error={touched.profession && Boolean(errors.profession)}
                        helperText={touched.profession && errors.profession}
                        required={false}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <InputControl
                        name="phone"
                        required={false}
                        label={t('reservation.telephone')}
                        value={values.phone}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>
                    <Grid item md={11}>
                      <InputControl
                        name="email"
                        label={t('reservation.email')}
                        value={values.email}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        required={false}
                      />
                    </Grid>
                    <Grid item md={11}>
                      <InputControl
                        multiline
                        required={false}
                        name="comments"
                        label={t('reservation.message')}
                        value={values.comments}
                        error={touched.comments && Boolean(errors.comments)}
                        helperText={touched.comments && errors.comments}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!isValid || isSubmitting}
                        className={classes.submitBtn}
                        size="large"
                        type="submit"
                        startIcon={<FlightTakeoffIcon />}
                      >
                        {isSubmitting
                          ? t('reservation.submitting')
                          : t('reservation.submit')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      )}

      {reservationNumber && !isModalOpen && (
        <div
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: '100vh',
            paddingTop: '4rem',
          }}
        >
          <Grid
            container
            direction="column"
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <FlightTakeoffIcon
                fontSize="large"
                style={{ color: '#4caf50' }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{reservationNumber}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">{t('reservation.completed')}</Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default FullReservation;
