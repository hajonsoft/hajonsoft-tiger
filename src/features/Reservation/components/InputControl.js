import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import { Field } from "formik";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
  },
  container: {
    borderColor: theme.palette.primary.main,
  },
  inputLabel: {
    marginTop: "-45px",
    color: (props) => props.labelColor || "",
    "&.focused": {
      color: theme.palette.primary.main,
    },
  },
}));

const InputControl = (props) => {
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
    type,
    autoFocus,
  } = props;
  const classes = useStyles(props);

  return (
    <FormControl className={classes.root} fullWidth>
      <InputLabel
        shrink={false}
        className={classes.inputLabel}
        style={{ color: error ? "red" : null }}
        htmlFor={name}
        placeholder={placeholder}
        required={required}
      >
        {label}
      </InputLabel>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Field
            as={options ? Select : OutlinedInput}
            className={classes.container}
            name={name}
            type={type}
            defaultValue={options ? "none" : ""}
            required={required}
            id={name}
            placeholder={placeholder}
            variant="outlined"
            disabled={!!disabled}
            fullWidth
            multiline={multiline}
            rows={multiline ? 4 : undefined}
            error={!!error}
            autoFocus={autoFocus}
          >
            {options &&
              options.map((option) => (
                <MenuItem
                  key={option.value + Math.random()}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
          </Field>
        </Grid>
      </Grid>
      <FormHelperText error={!helperText || !!error}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

InputControl.defaultProps = {
  editable: true,
  commonUse: true,
  type: "text",
  labelSize: "normal",
  required: true,
};

export default InputControl;
