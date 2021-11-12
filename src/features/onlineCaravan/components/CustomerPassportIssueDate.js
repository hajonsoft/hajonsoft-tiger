import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormHelperText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ErrorMessage } from 'formik';
import moment from 'moment';
import React from 'react';

const CustomerPassportIssueDate = ({ value, mode, setFieldValue }) => {
    const helperText = () => {
        return moment(value).fromNow()
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <KeyboardDatePicker
                        margin="normal"
                        name="passIssueDt"
                        format="dd-MMM-yyyy"
                        label="Passport Issue Date"
                        disabled={mode === 'delete'}
                        value={value}
                        onChange={val => {
                            setFieldValue("passIssueDt", val);
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{helperText()}</FormHelperText>

                </FormControl>
                <ErrorMessage name="passIssueDt" component="div" />
            </Grid>
        </MuiPickersUtilsProvider>


    )
}

export default CustomerPassportIssueDate;


