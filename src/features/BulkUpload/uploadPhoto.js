import React, { useState, useRef } from 'react';
import {
  Typography,
  Box,
  Avatar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import t from '../../shared/util/trans';
import firebase from '../../firebaseapp';
import AddIcon from '@material-ui/icons/AddCircle';
import { ArrowRightAltOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    color: '#385273',
    padding: 15,
    backgroundColor: 'white',
  },
  submitBtn: {
    background: '#006b6b',
    marginRight: '3rem',
    textTransform: 'capitalize',
    color: '#bfffff',
    marginTop: '3rem',
    width: '300px',
    borderRadius: '16px',
    fontSize: '24px',
  },
  p5: {
    padding: 5,
  },
  avatarContainer: {
    border: '1px solid #F7F7FA',
    padding: '1.4rem',
    borderRadius: '50%',
    width: '80px',
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
    borderRadius: '16px',
  },
  container: {
    maxWidth: '450px',
    boxShadow: ' 4px 0px 11px -3px rgba(0,0,0,0.56)',
    borderRadius: '6px',
    padding: '1rem',
    marginTop: '1rem',
  },
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const UploadPhoto = ({ passportsDetails }) => {
  const [passportURL, setPassportURL] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();

  const storage = firebase.storage();

  function uploadImageHandler(cb) {
    inputRef.current.click();
    inputRef.current.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        cb(reader.result);
      };
      reader.readAsDataURL(file);
    };
  }

  const handleOnNext = async () => {
    if (passportURL) {
      const passportFileName = `${
        passportsDetails[index].nationality || 'unknown'
      }/${passportsDetails[index].passportNumber || 'unknown'}_passport.jpg`;

      let passportRef = storage.ref(passportFileName);
      passportRef
        .putString(passportURL, 'data_url')
        .then((snap) => {
          console.log(snap, 1);
        })
        .catch((error) => {
          // alert('An error 2 occurred');
          console.log(error, '___error2___');
          return;
        });
    }

    if (photoURL) {
      const photoFileName = `${
        passportsDetails[index].nationality || 'unknown'
      }/${passportsDetails[index].passportNumber || 'unknown'}.jpg`;
      let photoRef = storage.ref(photoFileName);
      photoRef
        .putString(photoURL, 'data_url')
        .then((snap) => {
          console.log(snap, 1);
        })
        .catch((error) => {
          // alert('An error occurred');
          console.log(error, '__error___');
          return;
        });
    }

    if (index < passportsDetails.length - 1) {
      setIndex((i) => (i = i + 1));
    } else {
      // This is the last passport do not increase the index
      // save it and redirect to the next page
      history.push('/');
    }

    setPassportURL('');
    setPhotoURL('');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <h2>{passportsDetails[index].name}</h2>
        <Typography variant="subtitle2">Upload User Photo</Typography>

        <Box
          style={{
            padding: '32px 16px 8px 8px',
            borderTopLeftRadius: '16px',
          }}
        >
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
        </Box>

        <Box>
          <Typography variant="subtitle2">
            {t('reservation.upload-your-passport')}
          </Typography>
          <Box
            className={classes.passportBox}
            onClick={(e) => {
              e.stopPropagation();
              uploadImageHandler((val) => {
                console.log(val, "val from upload")
                setPassportURL(val)
              } );
            }}
          >
            {passportURL ? (
              <img
                src={passportURL}
                width="100%"
                height="100%"
                alt="passport"
              />
            ) : (
              <>
                <AddCircleOutlineIcon color="primary" fontSize="large" />
                <Typography>{t('reservation.upload-your-passport')}</Typography>
              </>
            )}
          </Box>
        </Box>

        <Box
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          }}
        >
          <IconButton
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOnNext}
          >
            <ArrowRightAltOutlined fontSize="1rem" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadPhoto;
