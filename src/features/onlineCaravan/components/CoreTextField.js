import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import _ from "lodash";
import React from "react";

const CoreTextField = ({
  name,
  mode,
  label,
  xsWidth = 4,
  autoFocus = false,
  value,
  required = false,
  maxLength = 60,
  helperText,
}) => {
  return (
    <Grid item xs={xsWidth}>
      <Field
        required={required}
        as={TextField}
        fullWidth
        name={name}
        autoFocus={autoFocus}
        label={label || _.startCase(name)}
        disabled={mode === "delete"}
        autoComplete="off"
        maxLength={maxLength}
        value={value || ""}
        helperText={helperText}
      />
      <ErrorMessage name={name} component="div" />
    </Grid>
  );
};

export default CoreTextField;
