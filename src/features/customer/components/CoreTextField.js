import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";
import _ from "lodash";

const CoreTextField = ({
  name,
  mode,
  label,
  xsWidth = 4,
  autoFocus = false,
  value,
  required = false,
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
        value={value || ""}
      />
      <ErrorMessage name={name} component="div" />
    </Grid>
  );
};

export default CoreTextField;
