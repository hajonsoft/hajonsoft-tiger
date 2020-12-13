import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";

const PackageDetail = ({
  mode,
  value,
}) => {
  return (
    <Grid item xs={12}>
      <Field
        as={TextField}
        fullWidth
        name="description"
        multiline
        label="Detail"
        disabled={mode === "delete"}
        autoComplete="off"
        rowsMax={4}
        value={value || ""}
      />
      <ErrorMessage name="description" component="div" />
    </Grid>
  );
};

export default PackageDetail;
