import React, { useEffect, useState, useRef } from "react";
import Dropzone from "react-dropzone";
import SaveAltOutlined from "@material-ui/icons/SaveAltOutlined";
import RefreshOutlined from "@material-ui/icons/RefreshOutlined";
import Worker from "../../../workers/parser.worker";
import CustomerImportCard from "./CustomerImportCard";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import firebase from "../../../firebaseapp";
const storage = firebase.storage();

const saveCustomerToFirebase = async (values, packageName, callback) => {
  let image = values.image;
  delete values["image"];

  let passportImage = values.passportImage;
  delete values["passportImage"];

  const customerRef = firebase.database().ref(`customer/${packageName}`);
  customerRef.push(values);

  if (image) {
    const metadata = {
      contentType: "image/jpeg",
    };
    const fileName = `${values.nationality ||
      "unknown"}/${values.passportNumber || "unknown"}.jpg`;
    let ref = storage.ref(fileName);
    ref
      .put(image, metadata)
      .then((snap) => {
        callback({ success: true });
      })
      .catch((error) => {
        callback({ error });
      });
  } else {
    callback({ success: true });
  }

  if (passportImage) {
    const metadata = {
      contentType: "image/jpeg",
    };
    const passportFileName = `${values.nationality ||
      "unknown"}/${values.passportNumber || "unknown"}_passport.jpg`;
    let ref = storage.ref(passportFileName);
    ref.put(passportImage, metadata);
  }
};

const useStyles = makeStyles((theme) => ({
  progressBarContainer: {
    padding: "20px",
  },
}));

function DropZone({ packageName, onClose }) {
  const classes = useStyles();
  const [imports, setImports] = useState({});
  const [isImported, setIsImported] = useState(false);
  const [workerInitialized, setWorkerInitialized] = useState(false);
  const worker = useRef(null);

  useEffect(() => {
    const handleWorkerMessages = async (event) => {
      if (event.data.type === "debug") {
      } else if (event.data.type === "found different customers") {
        let obj = {};
        event.data.data.forEach((x) => {
          obj[x] = {
            status: "not imported yet",
            progress: 0,
            id: x,
          };
        });
        setImports((prev) => Object.assign({}, prev, obj));
      } else if (event.data.type === "record failed") {
        let record = { ...imports[event.data.id] };
        record.status = "failed";

        setImports((prev) =>
          Object.assign({}, prev, { [event.data.id]: record })
        );
      } else if (event.data.type === "import prepared") {
        let record = { ...imports[event.data.id] };

        saveCustomerToFirebase(event.data.import, packageName, (res) => {
          record.status = !res || res.success ? "imported" : "failed";
          setImports((prev) =>
            Object.assign({}, prev, { [event.data.id]: record })
          );
        });
      }
    };

    if (workerInitialized) {
      worker.current.addEventListener("message", handleWorkerMessages);
    }

    return () => {
      worker.current.removeEventListener("message", handleWorkerMessages);
    };
  }, [workerInitialized, imports, packageName]);

  useEffect(() => {
    worker.current = new Worker();
    setWorkerInitialized(true);
    return () => {
      worker.current.terminate();
    };
  }, []);

  const handleFileDrop = (acceptedFiles) => {
    worker.current.postMessage({ files: acceptedFiles, packageName });
  };

  const importsLength = Object.keys(imports).length;

  const progress =
    (Object.values(imports).filter((x) => x.status !== "not imported yet")
      .length /
      importsLength) *
    100;

  const failed = Object.values(imports).filter((x) => x.status === "failed");

  if (progress === 100) {
    setTimeout(() => {
      setIsImported(true);
    }, 1000);
  }

  return (
    <Dropzone onDrop={handleFileDrop}>
      {({ getRootProps, getInputProps }) => (
        <div style={{ width: "100%", minHeight: "100px" }}>
          {Object.keys(imports).length ? (
            isImported ? (
              <Grid container spacing={1}>
                {importsLength - failed.length ? (
                  <Grid item xs={12}>
                    <Alert severity="success" color="info">{`${importsLength -
                      failed.length} customers imported`}</Alert>
                  </Grid>
                ) : (
                  ""
                )}
                {failed.map((x, i) => (
                  <Grid item xs={12} key={`customer-import-${i}`}>
                    <CustomerImportCard importData={x}></CustomerImportCard>
                  </Grid>
                ))}
                <Grid item container xs={12} justify="flex-end" spacing={2} alignItems="center">
                  <Grid item>
                    <Button
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setIsImported(false);
                        setImports({});
                      }}
                      startIcon={<RefreshOutlined />}
                    >
                      Import again
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setIsImported(false);
                        setImports({});
                        onClose();
                      }}
                      startIcon={<RefreshOutlined />}
                    >
                      Finish
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Card className={classes.progressBarContainer}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                ></LinearProgress>
              </Card>
            )
          ) : (
            <div
              {...getRootProps({
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: '2px dashed silver',
                  color: 'silver',
                  padding: '1rem'
                },
              })}
            >
              <input {...getInputProps()} />
              <div>
                <div style={{ textAlign: "center"}}>
                  <SaveAltOutlined fontSize="large"></SaveAltOutlined>
                </div>
                <Typography variant="h5" gutterBottom>
                  Drop Scanned Passports here...
                </Typography>
                <Typography>
                  If you use 3M/Gemalto drop all files (.jpg, .txt, .bin) or
                  just .zip for Combo Smart. For files Check c:\hajonsoft or
                  c:\program files\gx\demos\prdemosdl\log
                </Typography>
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
}

export default DropZone;
