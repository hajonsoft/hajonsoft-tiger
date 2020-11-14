import React, { useEffect, useState, useRef } from "react";
import Dropzone from "react-dropzone";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Worker from "../../../workers/parser.worker";
import CustomerImportCard from "./CustomerImportCard";
import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

function Basic({ packageName, setCurrentImport, saveToFirebase, onClose }) {
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
      setCurrentImport(event.data.import);
      let record = { ...imports[event.data.id] };

      saveToFirebase(event.data.import, null, (res) => {
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

  const progress =
    (Object.values(imports).filter((x) => x.status !== "not imported yet").length /
      Object.keys(imports).length) *
    100;

  const failed = Object.values(imports).filter((x) => x.status === "failed");

  if (progress === 100) {
    setTimeout(() => {
      setIsImported(true);
      setCurrentImport({});
    }, 1000);
  }

  if (isImported && failed.length === 0) {
    onClose();
  }

  return (
    <Dropzone onDrop={handleFileDrop}>
      {({ getRootProps, getInputProps }) => (
        <div style={{ width: "100%", minHeight: "100px" }}>
          {Object.keys(imports).length ? (
            isImported ? (
              <Grid container xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Alert severity="success" color="info">{`${Object.keys(imports).length -
                    failed.length} customers imported`}</Alert>
                </Grid>
                {failed.map((x, i) => (
                  <Grid item xs={12} key={`customer-import-${i}`}>
                    <CustomerImportCard importData={x}></CustomerImportCard>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <LinearProgress variant="determinate" value={progress}></LinearProgress>
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
                  <CloudUpload></CloudUpload>
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
