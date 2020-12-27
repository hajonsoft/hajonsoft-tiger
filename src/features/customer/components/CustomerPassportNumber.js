import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";

const name = "passportNumber";

const CustomerPassportNumber = ({
  mode,
  value,
  setFieldValue
}) => {
  return (
    <Grid item xs={6}>
      <Field
        as={TextField}
        fullWidth
        name={name}
        label="Passport number"
        disabled={mode === "delete"}
        autoComplete="off"
        value={value || ""}
        onChange={(event) => {
          const regex = /^([0-9a-zA-Z]){1,9}$/i;
          if (event.target.value === '' || regex.test(event.target.value)) {
            setFieldValue(name, event.target.value.toUpperCase());
          }
        }}
      />
      <ErrorMessage name={name} component="div" />
    </Grid>
  );
};

export default CustomerPassportNumber;
