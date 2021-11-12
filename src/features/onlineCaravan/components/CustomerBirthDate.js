import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormHelperText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ErrorMessage } from 'formik';
import moment from 'moment';
import React from 'react';

const CustomerBirthDate = ({ value, mode , setFieldValue}) => {
    const helperText = () => {
        return moment(value).fromNow()
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <KeyboardDatePicker
                        margin="normal"
                        name="birthDate"
                        format="dd-MMM-yyyy"
                        label="Birth Date"
                        disabled={mode === 'delete'}
                        value={value}
                        onChange={val => {
                            setFieldValue("birthDate", val);
                        }}
                    />
                    <FormHelperText>{helperText()}</FormHelperText>

                </FormControl>
                <ErrorMessage name="birthDate" component="div" />
            </Grid>
        </MuiPickersUtilsProvider>


    )
}

export default CustomerBirthDate;


