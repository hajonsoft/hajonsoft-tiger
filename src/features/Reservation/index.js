import {
  Button, MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import firebase from '../../firebaseapp';
import reservationCompleteImage from '../../images/reservation-complete.svg';
import { default as t, default as trans } from '../../shared/util/trans';
import BasicReservation from './components/BasicReservation';
import FullReservation from './components/FullReservation';
import S from './style';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid white`,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid whiite',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: '50%',
  },
  paymentBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0px',
  },
  paymentBtn: {
    background: '#178CF9',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    paddingTop: '.65rem',
    paddingBottom: '.65rem',
    textTransform: 'capitalize',
    color: 'white',
  },
  viewReservationBtn: {
    paddingLeft: '3rem',
    paddingRight: '3rem',
    marginRight: '1rem',
    paddingTop: '.65rem',
    paddingBottom: '.65rem',
    textTransform: 'capitalize',
  },
}));


const Reservation = ({ lang, onLanguageChange }) => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [value, setValue] = React.useState(
    history.location.search.split('=')[1] === 'true' ? 1 : 0
  );
  const [open, setOpen] = React.useState(false);

  const [advertisementData, setAdvertisementData] = React.useState({});

  useEffect(() => {
    async function getPackageSnapshot() {
      if (params.packageName) {
        const allAdvertisementsSnapshot = await firebase
          .database()
          .ref(`protected/onlinePackage`)
          .once('value');
        const allAdvertisements = allAdvertisementsSnapshot.val();
        const allAdvertisementsKeys = Object.keys(allAdvertisements);
        for (const advertisementKey of allAdvertisementsKeys) {
          if (allAdvertisements[advertisementKey].name === params.packageName) {
            setAdvertisementData(allAdvertisements[advertisementKey]);
            return;
          }
        }
      }
    }
    getPackageSnapshot();
  }, [params.packageName]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    if (value){
      setValue(0);
    } else {
      setValue(1);
    }
    
  };

  return (
    <>
      <S.Head>
        <S.Title>
          <S.ReservationType variant='h5' color='textPrimary'>{!value ? trans('reservation.full-reservation') : trans('reservation.quick-reservation')}</S.ReservationType>
          <S.NotReady variant='caption'>Not ready?</S.NotReady>
          <S.SwitchControl size="small" component="button" onClick={handleChange}>{value ? trans('reservation.full-reservation') : trans('reservation.quick-reservation')}</S.SwitchControl>
          <S.CaravanName variant="h4" color="textSecondary">{params.packageName}</S.CaravanName>
        </S.Title>
        <S.Language>
          <Select
            value={lang}
            onChange={(e) => onLanguageChange(e.target.value)}
            variant="standard"
          >
            <MenuItem value="en">
              <Typography variant="body1">English</Typography>
            </MenuItem>
            <MenuItem value="fr">
              <Typography variant="body1">Française</Typography>
            </MenuItem>
            <MenuItem value="ar">
              <Typography variant="body1">اللغه العربيه</Typography>
            </MenuItem>
          </Select>
        </S.Language>

      </S.Head>
      <S.ReservationForm>
      {value === 0 ? (
        <FullReservation openSuccessModal={handleOpen} isModalOpen={open} />
      ) : (
        <BasicReservation
          openSuccessModal={handleOpen}
          isModalOpen={open}
        />
      )}
      </S.ReservationForm>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 style={{ textAlign: 'center' }}>
              A Reservation has been booked for you
            </h2>
            <div style={{ width: '25%', height: 150, margin: '1rem auto' }}>
              <img
                src={reservationCompleteImage}
                alt="success-icon"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className={classes.paymentBtnContainer}>
              <Button
                color="default"
                variant="contained"
                className={classes.viewReservationBtn}
                onClick={handleClose}
              >
                {t('view-reservation-number')}
              </Button>
              {advertisementData.paymentLink && (
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.paymentBtn}
                  href={advertisementData.paymentLink}
                >
                  {t('continue-to-payment')}
                </Button>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Reservation;
