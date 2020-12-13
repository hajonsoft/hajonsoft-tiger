import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormHelperText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ErrorMessage } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';

const CoreDateField = ({ value, mode, name, xsWidth = 4, setFieldValue }) => {

    const helperText = () => {
        return moment(value).fromNow()
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={xsWidth}>
                <FormControl fullWidth>
                    <KeyboardDatePicker
                        margin="normal"
                        name={name}
                        format="dd-MMM-yyyy"
                        label={_.startCase(name)}
                        disabled={mode === 'delete'}
                        value={value}
                        onChange={val => {
                            setFieldValue(name, val);
                        }}
                    />
                    <FormHelperText>{helperText()}</FormHelperText>

                </FormControl>
                <ErrorMessage name={name} component="div" />
            </Grid>
        </MuiPickersUtilsProvider>


    )
}

export default CoreDateField;


