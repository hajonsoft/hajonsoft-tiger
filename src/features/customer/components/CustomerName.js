import { Box, IconButton, InputAdornment } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { ErrorMessage, Field } from "formik";
import React from "react";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomerName = ({
  mode,
  value,
}) => {

  const helperText = () => {

    const nameArray = value.split(' ');
    switch (nameArray.length) {
      case 1:
        return 'invalid';
      case 2:
        return `${nameArray[0].replace(/-/g, ' ')},,,${nameArray[1].replace(/-/g, ' ')}`
      case 3:
        return `${nameArray[0].replace(/-/g, ' ')},${nameArray[1].replace(/-/g, ' ')},,${nameArray[2].replace(/-/g, ' ')}`
      case 4:
        return `${nameArray[0].replace(/-/g, ' ')},${nameArray[1].replace(/-/g, ' ')},${nameArray[2].replace(/-/g, ' ')},${nameArray[3].replace(/-/g, ' ')}`
      default:
        return ''
    }
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
      <Field
        required
        as={TextField}
        fullWidth
        name="name"
        autoFocus
        label="Name"
        disabled={mode === "delete"}
        autoComplete="off"
        maxLength={60}
        value={value || ""}
        helperText={helperText()}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <Box>
                <IconButton
                  aria-label="search name on facebook"
                  onClick={handleFacebookClick}
                >
                  {/* <FacebookIcon style={{color: '#4267B2'}}/> */}
                  <FacebookIcon />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  aria-label="search name on twitter"
                  onClick={handleTwitterClick}
                >
                  {/* <TwitterIcon style={{color: '#1DA1F2'}}/> */}
                  <TwitterIcon />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  aria-label="search name on twitter"
                  onClick={handleGoogleClick}
                >
                  {/* <FontAwesomeIcon icon={faGoogle} style={{color: '#4285F4'}}/> */}
                  <FontAwesomeIcon icon={faGoogle} />
                </IconButton>
              </Box>
            </InputAdornment>
        }}
      />
      <ErrorMessage name="name" component="div" />
    </Grid>
  );
};

export default CustomerName;
