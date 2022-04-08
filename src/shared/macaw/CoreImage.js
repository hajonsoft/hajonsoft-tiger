import { Card, CardContent, CircularProgress, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import firebase from "../../firebaseapp";

const useStyles = makeStyles({
  mainContainer: {
    borderRadius: "8px",
    position: "relative",
    width: "210px",
    height: "210px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem"
  },
  imgContainer: {
    width: "200px",
    height: "200px",
  },
  pickImage: {
    position: "absolute",
    top: "80%",
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

const CoreImage = ({ record, setImage }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [fileType, setFileType] = useState('');
  const classes = useStyles();

  const handleFileOnChange = (event) => {
    if (event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setImage(selectedFile);
      setUrl(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    async function getImage() {
      if (record?.nationality?.length > 3 && record?.passportNumber?.length > 1) {
        try {
          const imgUrl = await firebase
            .storage()
            .ref(`${record.nationality}/${record.passportNumber}.jpg`)
            .getDownloadURL();
          getImageType(imgUrl);
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

    function getImageType(url) {
      fetch(url, {
        method: 'GET',
        headers: {},
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const fileType = bufferType(buffer);
            setFileType(fileType);
          });
        });
    };

    getImage();
  }, [record, record.nationality, record.passportNumber]);



  function bufferType(buffer) {
    if (!buffer) return;
    const bufferContent = new Uint8Array(buffer);
    if (!bufferContent) return;
    if (bufferContent[0] === 0x89 && bufferContent[1] === 0x50 && bufferContent[2] === 0x4E && bufferContent[3] === 0x47) return 'png';
    if (bufferContent[0] === 0xFF && bufferContent[1] === 0xD8 && bufferContent[2] === 0xFF) return 'jpg';
    if (bufferContent[0] === 0x47 && bufferContent[1] === 0x49 && bufferContent[2] === 0x46) return 'gif';
    if (bufferContent[0] === 0x42 && bufferContent[1] === 0x4D) return 'bmp';
  }

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
              alt={'portrait'}
              className={classes.imgContainer}
              style={{ display: url ? "block" : "none" }}
              onLoad={() => setLoading(false)}
            ></img>
            <Link
              href="#"
              className={classes.pickImage}
              style={{ display: isMouseOver && record.nationality && record.passportNumber ? "block" : "none" }}
              onClick={() => _fileInput.click()}
              disabled={!record.nationality || !record.passportNumber}
            >
              Change Image
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

      <Typography variant="caption" color="warning" component="p">{`ext. ${fileType}`}</Typography>
      <Typography variant="caption" color="info" component="p">We accept .jpg and .jpeg</Typography>
      <input
        type="file"
        onChange={handleFileOnChange}
        accept="image/jpeg"
        style={{ display: "none" }}
        ref={(fileInput) => (_fileInput = fileInput)}
      />
    </React.Fragment>
  );
};

export default CoreImage;
