import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormHelperText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ErrorMessage } from 'formik';
import moment from 'moment';
import React from 'react';

const CustomerIdIssueDate = ({ value, mode,setFieldValue }) => {
    const helperText = () => {
        return moment(value).fromNow()
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <KeyboardDatePicker
                        margin="normal"
                        name="idNumberIssueDate"
                        format="dd-MMM-yyyy"
                        label="Issue Date"
                        disabled={mode === 'delete'}
                        value={value}
                        onChange={val => {
                            setFieldValue("idNumberIssueDate", val);
                        }}
                    />
                    <FormHelperText>{helperText()}</FormHelperText>

                </FormControl>
                <ErrorMessage name="idNumberIssueDate" component="div" />
            </Grid>
        </MuiPickersUtilsProvider>


    )
}

export default CustomerIdIssueDate;


