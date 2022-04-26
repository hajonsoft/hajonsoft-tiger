import React, { useState, useRef } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import t from "../../shared/util/trans";
import firebase from '../../firebaseapp';


const UploadPhoto = ({passportsDetails}) => {
  const [passportURL, setPassportURL] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

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

    const passportFileName = `${passportsDetails[index].nationality}/${passportsDetails[index].passportNumber}_passport.jpg`;
    let passportRef = storage.ref(passportFileName);
    await  passportRef.putString(passportURL, 'data_url');

    if (index < passportsDetails.length - 1){
      setIndex(i => i = i+ 1);
    } else {console.log();
// This is the last passport do not increase the index
// save it and redirect to the next page
    }
    setPassportURL("");
  }

  return (
    <div>
      <h2>{passportsDetails[index].name}</h2>
      <Typography variant="subtitle2">
        {t("reservation.upload-your-passport")}
      </Typography>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          uploadImageHandler((val) => setPassportURL(val));
        }}
      >
        {passportURL ? (
          <img src={passportURL} width="100%" height="100%" alt="passport" />
        ) : (
          <>
            <AddCircleOutlineIcon color="primary" fontSize="large" />
            <Typography>{t("reservation.upload-your-passport")}</Typography>
          </>
        )}
      </Box>

      <input ref={inputRef} hidden type="file" accept="image/*" />

      <Button variant="contained" color="primary" size="large" onClick={handleOnNext}>
        Next
      </Button>
    </div>
  );
};

export default UploadPhoto;
