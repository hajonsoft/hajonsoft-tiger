import { Card, CardContent, CircularProgress, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import firebase from "../../firebaseapp";

const useStyles = makeStyles({
  mainContainer: {
    borderRadius: "8px",
    position: "relative",
    width: "90%",
    height: "310px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem"
  },
  imgContainer: {
    width: "100%",
    height: "300px",
  },
  pickImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "blue",
    fontSize: "0.8em",
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

const CorePassportImage = ({ record, setImage }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const classes = useStyles();

  const handleFileOnChange = (event) => {
    if (event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setImage(selectedFile);
      setUrl(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    if (record.passportImage) {
      setUrl(URL.createObjectURL(record.passportImage));
    }
  }, [record.passportImage]);

  useEffect(() => {
    async function getImage() {
      if (record && record.nationality && record.passportNumber) {
        try {
          let imgUrl = await firebase
            .storage()
            .ref(`${record.nationality}/${record.passportNumber}_passport.jpg`)
            .getDownloadURL();
          if (imgUrl) {
            setUrl(imgUrl);
            const loadImg = new Image();
            loadImg.src = imgUrl;
            loadImg.onload = () => setLoading(false);
          } else {
            setLoading(false);
          }
        } catch {
          setLoading(false);
        }
      }
      setLoading(false);
    }
    getImage();
  }, [record]);

  let _fileInput = React.createRef();
  return (
    <React.Fragment>
      <Card
        className={classes.mainContainer}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <CardContent>
          {!loading && <div>
            <img
              src={url}
              alt={"passport"}
              className={classes.imgContainer}
              style={{ display: url ? "block" : "none" }}
            ></img>
            <Link
              href="#"
              className={classes.pickImage}
              style={{ display: isMouseOver && record.nationality && record.passportNumber ? "block" : "none" }}
              onClick={() => _fileInput.click()}
              disabled={!record.nationality || !record.passportNumber}
            >
              Change Passport Image
            </Link>
          </div>}
          {loading &&
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <CircularProgress size={80} color="secondary" />
              </Grid>
            </Grid>
          }
        </CardContent>
      </Card>
      <input
        type="file"
        onChange={handleFileOnChange}
        style={{ display: "none" }}
        ref={(fileInput) => (_fileInput = fileInput)}
      />
    </React.Fragment>
  );
};

export default CorePassportImage;
