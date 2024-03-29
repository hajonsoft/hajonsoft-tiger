import { Grid, Tooltip, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import RefreshOutlined from "@material-ui/icons/RefreshOutlined";
import SaveAltOutlined from "@material-ui/icons/SaveAltOutlined";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { nationalities } from "../../data/nationality";
import firebaseArabicName from "../../features/arabicName/firebaseArabicName";
import CustomerImportCard from "../../features/passengers/components/CustomerImportCard";
import firebase from "../../firebaseapp";
import t from "../../shared/util/trans";
import Worker from "../../workers/parser.worker";
const storage = firebase.storage();

const getFullArabicName = (arabicNameDictionary) => {
  const cursor = Object.values(arabicNameDictionary);
  let fullArabicName = "";
  for (let i = 0; i < cursor.length; i++) {
    if (arabicNameDictionary[`"${i}"`]) {
      fullArabicName += " " + arabicNameDictionary[`"${i}"`];
    }
  }

  return fullArabicName.trim();
};

const handleTranslateName = async (englishName, isArabic, cb) => {
  if (!isArabic) {
    cb(false);
    return;
  }
  const names = englishName?.split(" ").filter((name) => name?.trim());
  if (names.length === 0) {
    return;
  }
  const translationResult = {};
  let fullArabicName;
  try {
    for (let i = 0; i < names.length; i++) {
      const snapshot = await firebaseArabicName
        .database()
        .ref(`/${names[i].toLowerCase()}`)
        .once("value");
      const result = snapshot.val();
      translationResult[`"${i}"`] = result;
      fullArabicName = getFullArabicName(translationResult);
    }
    if (!fullArabicName || fullArabicName.length === 0) {
      cb(false);
    } else {
      cb(fullArabicName);
    }
  } catch (err) {
    cb(false);
  }
};

const saveCustomerToFirebase = async (values, packageName, callback) => {
  let image = values.image;
  delete values["image"];

  let passportImage = values.passportImage;
  delete values["passportImage"];

  const englishName = values["name"] || "undefined";
  const passengerNationality = values["nationality"] || "Stateless XXX";
  const isArabic = nationalities.find(
    (nationality) => nationality.name === passengerNationality
  )?.isArabic;

  handleTranslateName(englishName, isArabic, (arabicName) => {
    if (arabicName) {
      values["nameArabic"] = arabicName;
    }

    const customerRef = firebase.database().ref(`customer/${packageName}`);
    customerRef.push(values);

    if (image) {
      const metadata = {};
      const fileName = `${values.nationality || "unknown"}/${
        values.passportNumber || "unknown"
      }.jpg`;
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
      const metadata = {};
      const passportFileName = `${values.nationality || "unknown"}/${
        values.passportNumber || "unknown"
      }_passport.jpg`;
      let ref = storage.ref(passportFileName);
      ref.put(passportImage, metadata);
    }
  });
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
        console.log('imported record' , event.data.import);
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

  const handle3MClick = () => {
    const tempLink = document.createElement("a");
    tempLink.href = new URL("hawk://mode=open,host=3m");
    tempLink.click();
  };

  const handleComboClick = () => {
    const tempLink = document.createElement("a");
    tempLink.href = new URL("hawk://mode=open,host=combo");
    tempLink.click();
  };

  const handleStartScanClick = () => {
    const tempLink = document.createElement("a");
    tempLink.href = new URL("hawk://mode=scan,host=firebasetokenhere");
    tempLink.click();
  };

  return (
    <Dropzone onDrop={handleFileDrop}>
      {({ getRootProps, getInputProps }) => (
        <div style={{ width: "100%", minHeight: "100px" }}>
          {Object.keys(imports).length ? (
            isImported ? (
              <Grid container spacing={1}>
                {importsLength - failed.length ? (
                  <Grid item xs={12}>
                    <Alert severity="success" color="info">{`${
                      importsLength - failed.length
                    } passenger(s) imported`}</Alert>
                  </Grid>
                ) : (
                  ""
                )}
                {failed.map((x, i) => (
                  <Grid item xs={12} key={`customer-import-${i}`}>
                    <CustomerImportCard importData={x}></CustomerImportCard>
                  </Grid>
                ))}
                <Grid
                  item
                  container
                  xs={12}
                  justifyContent="flex-end"
                  spacing={2}
                  alignItems="center"
                >
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
                      {t("import-again")}
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
                      {t("finish")}
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
                  border: "2px dashed silver",
                  color: "silver",
                  padding: "1rem",
                },
              })}
            >
              <input {...getInputProps()} />
              <div>
                <div style={{ textAlign: "center" }}>
                  <SaveAltOutlined fontSize="large"></SaveAltOutlined>
                </div>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      Drop your scanned files here 3M files, or comboSmart zip. We accept passport images as well!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FileCopyOutlinedIcon />
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    style={{ marginTop: "10rem" }}
                  >
                    <Grid item>
                      <Tooltip title="c:\hajonsoft">
                        <Button
                          onClick={handle3MClick}
                          startIcon={<FolderOpenOutlinedIcon />}
                          size="small"
                        >
                          3M AT9000MK2 folder
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="c:\Program Files\GX\demos\PrDemoSDL\log">
                        <Button
                          onClick={handleComboClick}
                          startIcon={<FolderOpenOutlinedIcon />}
                          size="small"
                        >
                          ARH Combo Smart folder
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={handleStartScanClick}
                        startIcon={<FolderOpenOutlinedIcon />}
                        size="small"
                      >
                        Interactive Scan
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
}

export default DropZone;
