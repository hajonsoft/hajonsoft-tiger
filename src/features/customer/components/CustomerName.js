import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { IconButton } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";
import _ from 'lodash';
import {nameParts} from '../../../util/nameParts'

const name = "name";
const CustomerName = ({
  mode,
  value,
  setFieldValue
}) => {

  const helperText = () => {
    return nameParts(value).join('/')
  }

  const handleFacebookClick = () => {
    const url = `https://www.facebook.com/search/top/?q=${encodeURIComponent(value)}&opensearch=1`
    window.open(url, "_blank");
  }

  const handleTwitterClick = () => {
    const url = `https://twitter.com/search?q=${encodeURIComponent(value)}&src=typed_query`
    window.open(url, "_blank");
  }

  const handleGoogleClick = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(value)}`
    window.open(url, "_blank");
  }
  return (
    <Grid item xs={6}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <Field
            required
            as={TextField}
            fullWidth
            name={name}
            autoFocus
            label={_.startCase(name)}
            disabled={mode === "delete"}
            autoComplete="off"
            onChange={(event) => {
              const regex = /^([-a-zA-Z ]){1,60}$/i;
              if (event.target.value === '' || regex.test(event.target.value)) {
                setFieldValue(name, event.target.value.toUpperCase());
              }
            }}
            helperText={helperText()}
          />
        </Grid>
        <Grid item container xs={3} alignItems="center" justify="flex-end">
          <Grid item>
            <IconButton size="small"
              aria-label="search facebook"
              onClick={handleFacebookClick}
            >
              <FacebookIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size="small"
              aria-label="search twitter"
              onClick={handleTwitterClick}
            >
              <TwitterIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton size="small"
              aria-label="search twitter"
              onClick={handleGoogleClick}
            >
              <FontAwesomeIcon icon={faGoogle} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ErrorMessage name={name} component="div" style={{color: '#f44336'}}/>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default CustomerName;
