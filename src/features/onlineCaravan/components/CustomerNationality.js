import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { ErrorMessage, Field } from "formik";
import _ from "lodash";
import React from "react";
import { nationalities } from '../../../data/nationality';


const CustomerNationality = ({
    name,
    mode,
    label,
    xsWidth = 4,
    autoFocus = false,
    value,
    required = false,
    maxLength = 60
}) => {

    const helperText = () => {
        const nationality = nationalities.find(n => n.name === value);
        if (nationality) {

            return nationality.code;
        }
    }
    return (
        <Grid item xs={6}>
            <FormControl fullWidth >
                <InputLabel id="nationality">Nationality</InputLabel>
                <Field
                    required
                    as={Select}
                    name="nationality"
                    label="Nationality"
                    disabled={mode === "delete"}
                    autoComplete="off"
                    value={value || ""}
                >
                    {_.sortBy(nationalities, ['name']).map(n =>
                        <MenuItem value={n.name}>{n.name}</MenuItem>
                    )}

                </Field>
                <FormHelperText>{helperText()}</FormHelperText>
            </FormControl>
            <ErrorMessage name="nationality" component="div" />
        </Grid>
    );
};

export default CustomerNationality;
