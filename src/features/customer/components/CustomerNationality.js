import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { ErrorMessage, Field } from "formik";
import _ from "lodash";
import React from "react";
import { nationalities } from '../../../data/nationality';

const name = "nationality";

const CustomerNationality = ({
    mode,
    value,
}) => {

    const helperText = () => {
        const nationality = nationalities.find(n => n.name === value);
        if (nationality) {
            return `${nationality.code} ${nationality.isArabic? '(Arabic)' : ''}`;
        }
    }
    return (
        <Grid item xs={6}>
            <FormControl fullWidth >
                <InputLabel id="nationality">Nationality</InputLabel>
                <Field
                    as={Select}
                    name={name}
                    label="Nationality"
                    disabled={mode === "delete"}
                    autoComplete="off"
                    value={value || ""}
                >
                    {_.sortBy(nationalities, ['name']).map(n =>
                        <MenuItem value={n.name} key={`k${n.name}`}>{n.name}</MenuItem>
                    )}

                </Field>
                <FormHelperText>{helperText()}</FormHelperText>
            </FormControl>
            <ErrorMessage name={name} component="div"  style={{color: '#f44336'}}/>
        </Grid>
    );
};

export default CustomerNationality;
