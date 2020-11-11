import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, Field } from 'formik';
import React from 'react';
import _ from 'lodash'

const CoreTextField = ({ name, mode, label, xsWidth = 4, autoFocus = false }) => {


    return (
        <Grid item xs={xsWidth}>
            <Field as={TextField}
                fullWidth
                name={name}
                type="textarea"
                autoFocus={autoFocus}
                label={label || _.startCase(name)}
                disabled={mode === 'delete'}
                rowsMax={4}
                autoComplete="off"
            />
            <ErrorMessage name={name} component="div" />
        </Grid>


    )
}

export default CoreTextField;
