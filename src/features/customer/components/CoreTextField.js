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
                autoFocus={autoFocus}
                label={label || _.startCase(name)}
                disabled={mode === 'delete'}
                autoComplete="off"
            />
            <ErrorMessage name={name} component="div" />
        </Grid>


    )
}

export default CoreTextField;


// {((['textarea'].includes(name.type)) &&
            //     <Grid item xs={4}>
            //         <TextField
            //             fullWidth
            //             type={name.type}
            //             name={name.name}
            //             label={name.label}
            //             multiline
            //             rowsMax={4}
            //             autoFocus={name.autoFocus}
            //             disabled={mode === 2 || (name.isReadOnly)}
            //             onChange={onChange}
            //             onBlur={onBlur}
            //             value={value}
            //         />
            //         <ErrorMessage name={name.name} component="div" />
            //     </Grid>)}

            // {((['number'].includes(name.type)) &&
            //     <Grid item xs={4}>
            //         <TextField
            //             type={name.type}
            //             name={name.name}
            //             label={name.label}
            //             autoFocus={name.autoFocus}
            //             disabled={mode === 2 || (name.isReadOnly)}
            //             onChange={onChange}
            //             onBlur={onBlur}
            //             value={value}
            //         />
            //         <ErrorMessage name={name.name} component="div" />
            //     </Grid>)}

            // {((['date'].includes(name.type)) &&
            //     <Grid item xs={4}>
            //         <TextField
            //             type={name.type}
            //             name={name.name}
            //             label={name.label}
            //             autoFocus={name.autoFocus}
            //             disabled={mode === 2 || (name.isReadOnly)}
            //             onChange={onChange}
            //             onBlur={onBlur}
            //             value={value}
            //             InputLabelProps={{
            //                 shrink: true,
            //             }}
            //         />
            //         <ErrorMessage name={name.name} component="div" />
            //     </Grid>)}

            // {((['checkbox'].includes(name.type)) &&
            //     <Grid item xs={4}>
            //         <FormControlLabel
            //             control={
            //                 <Switch
            //                     checked={value}
            //                     onChange={onChange}
            //                     name={name.name}
            //                     color="primary"
            //                     disabled={mode === 2 || (name.isReadOnly)}
            //                 />
            //             }
            //             label={name.label}
            //         />
            //         <ErrorMessage name={name.name} component="div" />
            //     </Grid>)}

            //     {((['file'].includes(name.type)) &&
            //     <Grid item xs={4}>
            //         <CoreImage 
            //         name={name.name}
            //         disabled={mode === 2 || (name.isReadOnly)}
            //         initialUrl={value}
            //         onUrlChanged={handleUrlChanged}
            //         />
            //         <div>{value} {JSON.stringify(value)}</div>
            //         <ErrorMessage name={name.name} component="div" />
            //     </Grid>)}