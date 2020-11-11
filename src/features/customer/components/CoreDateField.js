import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, Field } from 'formik';
import React from 'react';
import _ from 'lodash'

const CoreDateField = ({ name, mode, label, xsWidth = 4, autoFocus = false }) => {


    return (
        <Grid item xs={xsWidth}>
            <Field as={TextField}
                fullWidth
                name={name}
                type="date"
                autoFocus={autoFocus}
                label={label || _.startCase(name)}
                disabled={mode === 'delete'}
                autoComplete="off"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <ErrorMessage name={name} component="div" />
        </Grid>


    )
}

export default CoreDateField;


