import React, { useEffect, useState, useRef } from "react";
import Dropzone from "react-dropzone";
import CloudUpload from "@material-ui/icons/CloudUpload";
import SaveAltOutlined from "@material-ui/icons/SaveAltOutlined";
import RefreshOutlined from "@material-ui/icons/RefreshOutlined";
import Worker from "../../../workers/parser.worker";
import CustomerImportCard from "./CustomerImportCard";
import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import firebase from "../../../firebaseapp";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const storage = firebase.storage();
const saveCustomerToFirebase = async (values, packageName, callback) => {
  let image = values.image;
  delete values["image"];

  const customerRef = firebase.database().ref(`customer/${packageName}`);
  customerRef.push(values);

  if (image) {
    const metadata = {
      contentType: "image/jpeg",
    };
    const fileName = `${[values.nationality || ""].join("/")}/${values.passportNumber}.jpg`;
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
};

const useStyles = makeStyles((theme) => ({
  progressBarContainer: {
    padding: "20px",
  },
}));

function Basic({ packageName, onClose }) {
  const classes = useStyles();
  const [imports, setImports] = useState({});
  const [isImported, setIsImported] = useState(false);
  const [workerInitialized, setWorkerInitialized] = useState(false);
  const worker = useRef(null);

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

      setImports((prev) => Object.assign({}, prev, { [event.data.id]: record }));
    } else if (event.data.type === "import prepared") {
      let record = { ...imports[event.data.id] };

      saveCustomerToFirebase(event.data.import, packageName, (res) => {
        record.status = !res || res.success ? "imported" : "failed";
        setImports((prev) => Object.assign({}, prev, { [event.data.id]: record }));
      });
    }
  };

  useEffect(() => {
    if (workerInitialized) {
      worker.current.addEventListener("message", handleWorkerMessages);
    }

    return () => {
      worker.current.removeEventListener("message", handleWorkerMessages);
    };
  }, [imports, workerInitialized]);

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
    (Object.values(imports).filter((x) => x.status !== "not imported yet").length / importsLength) *
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
              <Grid container xs={12} spacing={1}>
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
                <Grid item container xs={12} justify="flex-end">
                  <Button
                    type="button"
                    variant="contained"
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
              </Grid>
            ) : (
              <Card className={classes.progressBarContainer}>
                <LinearProgress variant="determinate" value={progress}></LinearProgress>
              </Card>
            )
          ) : (
            <div
              {...getRootProps({
                className: "dropzone",
                style: {
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              })}
            >
              <input {...getInputProps()} />
              <div>
                <div style={{ textAlign: "center" }}>
                  <SaveAltOutlined></SaveAltOutlined>
                </div>
                <div>Drop your files here</div>
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
}

export default Basic;
