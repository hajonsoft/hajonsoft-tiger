import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useState, createRef, useEffect } from "react";
import { createCodeLine } from "../util/codeline";
import { useScreenshot, createFileName } from "use-react-screenshot";
import "./customer-code-line.css";

const name = "codeLine";

const CustomerCodeline = ({ mode, record, setFieldValue }) => {
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const [editMode, setEditMode] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [line1, setLine1] = useState(
    record.codeLine &&
      record.codeLine.length > 44 &&
      record.codeLine.substring(0, 44)
  );
  const [line2, setLine2] = useState(
    record.codeLine &&
      record.codeLine.length > 45 &&
      record.codeLine.substring(44)
  );

  useEffect(() => {
    const download = (
      image,
      { name = record.passportNumber, extension = "jpg" } = {}
    ) => {
      const a = document.createElement("a");
      a.href = image;
      a.download = createFileName(extension, name);
      a.click();
      setDownloading(false);
    };
    if (downloading) {
      takeScreenShot(ref.current).then(download);
    }
  }, [downloading, ref, takeScreenShot, record.passportNumber]);
  const handleOnApply = () => {
    setFieldValue(name, line1 + line2);
    setEditMode(false);
  };

  const handleGenerateCodeline = () => {
    const codeLine = createCodeLine(record);
    setLine1(codeLine.substring(0, 44));
    setLine2(codeLine.substring(44));
    setFieldValue(name, codeLine);
  };
  const handlePDF417 = () => {};

  console.log(image);
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid
            container
            ref={ref}
            style={{ padding: downloading ? "100px 0 32px 32px" : "0" }}
          >
            <Grid item xs={12}>
              {!editMode && (
                <div style={{ fontFamily: "ocrb", marginBottom: "8px" }}>
                  {line1}
                </div>
              )}
              {editMode && (
                <div>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    disabled={mode === "delete"}
                    value={line1}
                    onChange={(event) => {
                      const regex = /^([0-9a-zA-Z<]){1,44}$/i;
                      if (
                        event.target.value === "" ||
                        regex.test(event.target.value)
                      ) {
                        setLine1(event.target.value.toUpperCase());
                        setFieldValue(name, line1 + line2);
                      }
                    }}
                  />
                  <FormHelperText>{line1 && line1.length}</FormHelperText>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              {!editMode && (
                <div style={{ fontFamily: "ocrb", marginBottom: "8px" }}>
                  {line2}
                </div>
              )}
              {editMode && (
                <div>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    disabled={mode === "delete"}
                    value={line2}
                    onChange={(event) => {
                      const regex = /^([0-9a-zA-Z<]){1,44}$/i;
                      if (
                        event.target.value === "" ||
                        regex.test(event.target.value)
                      ) {
                        setLine2(event.target.value.toUpperCase());
                        setFieldValue(name, line1 + line2);
                      }
                    }}
                  />
                  <FormHelperText>{line2 && line2.length}</FormHelperText>
                </div>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {!editMode && <Button onClick={() => setEditMode(true)}>Edit</Button>}
          {!editMode && <Button onClick={handlePDF417}>PDF417</Button>}
          {!editMode && (
            <Button
              startIcon={
                <div>
                  {downloading && (
                    <CircularProgress
                      color="secondary"
                      size={30}
                      thickness={3}
                      variant="indeterminate"
                    />
                  )}
                </div>
              }
              onClick={() => setDownloading(true)}
            >
              {`${downloading ? 'Downloading' : 'Download MRZ Image'}`}
            </Button>
          )}

          {editMode && (
            <div>
              <Button onClick={handleGenerateCodeline}>Generate</Button>
              <Button onClick={handleOnApply}>Apply</Button>
            </div>
          )}
        </CardActions>
      </Card>

      {/* {!editMode && (
        <div>
          <Field
            as={TextField}
            fullWidth
            name={name}
            label="Codeline"
            disabled={mode === "delete"}
            autoComplete="off"
            value={value || ""}
            multiline
            rowsMax={2}
            onChange={(event) => {
              const regex = /^([0-9a-zA-Z<]){1,88}$/i;
              if (event.target.value === "" || regex.test(event.target.value)) {
                setFieldValue(name, event.target.value.toUpperCase());
              }
            }}
          />
          <FormHelperText>{value && value.length}</FormHelperText>
          <ErrorMessage
            name={name}
            component="div"
            style={{ color: "#f44336" }}
          />
        </div>
      )} */}
    </Grid>
  );
};

export default CustomerCodeline;
