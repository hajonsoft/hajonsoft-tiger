import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { ErrorMessage, Field } from "formik";
import React from "react";

const Male = () => <Grid container spacing={2} alignItems="center"><Grid item><FontAwesomeIcon size="2x" icon={faMale} style={{ color: '#1976d2' }} /></Grid><Grid item><Typography>Male</Typography></Grid></Grid>;
const Female = () => <Grid container spacing={2} alignItems="center"><Grid item><FontAwesomeIcon size="2x" icon={faFemale} style={{ color: '#c2185b' }} /></Grid><Grid item><Typography>Female</Typography></Grid></Grid>;
const CustomerGender = ({
  name,
  mode,
  label,
  xsWidth = 4,
  autoFocus = false,
  value,
  required = false,
  maxLength = 60
}) => {
  return (
    <Grid item xs={xsWidth}>
      <FormControl>
        <FormLabel component="legend">Gender</FormLabel>
        <Field
          as={RadioGroup}
          fullWidth
          name="gender"
          disabled={mode === "delete"}
          value={value || ""}
          row
        >
          <Grid container spacing={4} alignItems="center">


            <Grid item><FormControlLabel value="Male" control={<Radio />} label={<Male />} /></Grid>
            <Grid item><FormControlLabel value="Female" control={<Radio />} label={<Female />} /></Grid>
          </Grid>
        </Field>
      </FormControl>
      <ErrorMessage name="gender" component="div" />
    </Grid>
  );
};

export default CustomerGender;
