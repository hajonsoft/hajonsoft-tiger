import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormHelperText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ErrorMessage } from 'formik';
import moment from 'moment';
import React from 'react';

const CustomerPassportExpireDate = ({ value, mode, setFieldValue }) => {

    const helperText = () => {
        return moment(value).fromNow()
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <KeyboardDatePicker
                        margin="normal"
                        name="passExpireDt"
                        format="dd-MMM-yyyy"
                        label="Passport Expire Date"
                        disabled={mode === 'delete'}
                        value={value}
                        onChange={val => {
                            setFieldValue("passExpireDt", val);
                        }}
                    />
                    <FormHelperText>{helperText()}</FormHelperText>

                </FormControl>
                <ErrorMessage name="passExpireDt" component="div" />
            </Grid>
        </MuiPickersUtilsProvider>


    )
}

export default CustomerPassportExpireDate;


