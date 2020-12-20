import { faKaaba, faMosque, faRoute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { ErrorMessage, Field } from "formik";
import React from "react";

const HAjj = () => <Grid container spacing={2} alignItems="center"><Grid item><FontAwesomeIcon size="1x" icon={faKaaba} color="#757575" /></Grid><Grid item><Typography>Hajj</Typography></Grid></Grid>;
const Umrah = () => <Grid container spacing={2} alignItems="center"><Grid item><FontAwesomeIcon size="1x" icon={faMosque} color="#757575" /></Grid><Grid item><Typography>Umrah</Typography></Grid></Grid>;
const Tour = () => <Grid container spacing={2} alignItems="center"><Grid item><FontAwesomeIcon size="1x" icon={faRoute} color="#757575" /></Grid><Grid item><Typography>Tour</Typography></Grid></Grid>;

const Gender = ({
  name,
  mode,
  label,
  xsWidth = 4,
  autoFocus = false,
  value = "Tour",
  required = false,
  maxLength = 60
}) => {
  return (
    <Grid item xs={xsWidth}>
      <FormControl>
        <FormLabel component="legend">Nature</FormLabel>
        <Field
          as={RadioGroup}
          name="gender"
          disabled={mode === "delete"}
          value={value || ""}
          row
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item><FormControlLabel value="Hajj" control={<Radio />} label={<HAjj />} /></Grid>
            <Grid item><FormControlLabel value="Umrah" control={<Radio />} label={<Umrah />} /></Grid>
            <Grid item><FormControlLabel value="Tour" control={<Radio />} label={<Tour />} /></Grid>
          </Grid>
        </Field>
      </FormControl>
      <ErrorMessage name="gender" component="div" />
    </Grid>
  );
};

export default Gender;
