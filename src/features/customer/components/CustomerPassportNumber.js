import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";

const CustomerPassportNumber = ({
  mode,
  value,
}) => {
  return (
    <Grid item xs={6}>
      <Field
        required
        as={TextField}
        fullWidth
        name="passportNumber"
        label="Passport number"
        disabled={mode === "delete"}
        autoComplete="off"
        value={value || ""}
      />
      <ErrorMessage name="passportNumber" component="div" />
    </Grid>
  );
};

export default CustomerPassportNumber;
