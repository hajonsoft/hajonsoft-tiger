import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";

const name = "codeline";

const CustomerCodeline = ({ mode, value, setFieldValue }) => {
  return (
    <Grid item xs={6}>
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
      <ErrorMessage name={name} component="div" style={{ color: "#f44336" }} />
    </Grid>
  );
};

export default CustomerCodeline;
