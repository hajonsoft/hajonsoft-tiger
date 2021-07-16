import React from 'react';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {  Field } from "formik";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
  },
  container: {
    borderColor: theme.palette.primary.main,
  },
  textInput: {
    width: '100%',
    border: 'none',
    resize: 'none',
    borderRadius: 10,
    padding: 10,
    fontSize: '1.075rem',
    background: props => props.disabled ? "cccccc2b" : "white"
  },
  inputLabel: {
    marginTop: '-45px',
    color: (props) => props.labelColor || '',
    '&.focused': {
      color: theme.palette.primary.main,
    },
  },
  smallLabel: {
    fontSize: '0.8rem',
    marginTop: -38,
  },
}));

const Input = (props) => {
  const {
    name,
    label,
    disabled,
    error,
    helperText,
    placeholder,
    required,
    multiline,
    options,
    type
  } = props;
  const classes = useStyles(props);

  return (
        <FormControl className={classes.root} fullWidth>
          <InputLabel
            shrink={false}
            className={classes.inputLabel}
            style={{ color: error ? 'red' : null }}
            htmlFor={name}
            placeholder={placeholder || name}
          >
            {label}
          </InputLabel>
          <Grid container alignItems="center">
            <Grid item xs={"12"} >
              <Field
                as={ options ? Select : OutlinedInput}
                className={classes.container}
                name={name}
                type={type}
                defaultValue={options ? "none" : ""}
                required={required}
                id={name}
                placeholder={placeholder || label}
                variant="outlined"
                disabled={!!disabled}
                fullWidth
                multiline={multiline}
                rows={ multiline ? 4 : undefined}
                error={!!error}
              >
                { options && options.map((option) => (
            <MenuItem key={option.value + Math.random()} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
              </Field>
            </Grid>
          </Grid>
          <FormHelperText error={!helperText || !!error}>
            {error && helperText ? helperText : null}
          </FormHelperText>
        </FormControl>
      )
};


Input.defaultProps = {
   editable: true,
   commonUse: true,
   type: 'text',
   labelSize: 'normal',
   required: true,
};

export default Input;
