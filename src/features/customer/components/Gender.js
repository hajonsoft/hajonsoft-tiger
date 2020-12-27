import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { ErrorMessage, Field } from "formik";
import React from "react";

const name = "gender";

const Male = () => <Grid container spacing={2} alignItems="center"><Grid item><FontAwesomeIcon size="2x" icon={faMale} color="#757575" /></Grid><Grid item><Typography>Male</Typography></Grid></Grid>;
const Female = () => <Grid container spacing={2} alignItems="center"><Grid item><FontAwesomeIcon size="2x" icon={faFemale} color="#757575"  /></Grid><Grid item><Typography>Female</Typography></Grid></Grid>;
const CustomerGender = ({
  mode,
  xsWidth = 4,
  value,
}) => {
  return (
    <Grid item xs={xsWidth}>
      <FormControl>
        <FormLabel component="legend">Gender</FormLabel>
        <Field
          as={RadioGroup}
          fullWidth
          name={name}
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
      <ErrorMessage name={name} component="div"  style={{color: '#f44336'}}/>
    </Grid>
  );
};

export default CustomerGender;
