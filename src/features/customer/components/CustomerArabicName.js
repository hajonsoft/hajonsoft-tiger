import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import _ from 'lodash';
import React from "react";

const name = "nameArabic";

const CustomerArabicName = ({
  mode,
  value,
  setFieldValue
}) => {

  const helperText = () => {
    if (!value) return ''

    const nameArray = value.split(' ');
    switch (nameArray.length) {
      case 0:
      case 1:
        return 'invalid name';
      case 2:
        return `${nameArray[0].replace(/-/g, ' ')}/${nameArray[1].replace(/-/g, ' ')}`
      case 3:
        return `${nameArray[0].replace(/-/g, ' ')}/${nameArray[1].replace(/-/g, ' ')}//${nameArray[2].replace(/-/g, ' ')}`
      case 4:
        return `${nameArray[0].replace(/-/g, ' ')}/${nameArray[1].replace(/-/g, ' ')}/${nameArray[2].replace(/-/g, ' ')}/${nameArray[3].replace(/-/g, ' ')}`
      default:
        return `${nameArray[0].replace(/-/g, ' ')}/${nameArray[1].replace(/-/g, ' ')}/${nameArray.slice(2, nameArray.length - 1).join(' ').replace(/-/g, ' ')}/${_.last(nameArray).replace(/-/g, ' ')}`

    }
  }

  return (
    <Grid item xs={6}>
      <Grid container>
        <Grid item xs={12}>
          <Field
            as={TextField}
            fullWidth
            name={name}
            label="الاسم العربي في جواز السفر"
            disabled={mode === "delete"}
            autoComplete="off"
            onChange={(event) => {
              const regex = /^([-\u0621-\u064A ]){1,60}$/i;
              if (event.target.value === '' || regex.test(event.target.value)) {
                setFieldValue(name, event.target.value.toUpperCase());
              }
            }}
            helperText={helperText()}
          />
        </Grid>
        <Grid item xs={12}>
          <ErrorMessage name={name} component="div" />
        </Grid>
      </Grid>

    </Grid>
  );
};

export default CustomerArabicName;
