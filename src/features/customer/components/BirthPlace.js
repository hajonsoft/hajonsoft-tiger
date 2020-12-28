import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";

const name = "birthPlace";
const BirthPlace = ({
  mode,
  value,
  setFieldValue
}) => {

  return (
    <Grid item xs={4}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <Field
            as={TextField}
            fullWidth
            name={name}
            label="Birth place"
            disabled={mode === "delete"}
            autoComplete="off"
            onChange={(event) => {
              const regex = /^([-a-zA-Z ]){1,25}$/i;
              if (event.target.value === '' || regex.test(event.target.value)) {
                setFieldValue(name, event.target.value.toUpperCase());
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ErrorMessage name={name} component="div" style={{ color: '#f44336' }} />
        </Grid>
      </Grid>

    </Grid>
  );
};

export default BirthPlace;
