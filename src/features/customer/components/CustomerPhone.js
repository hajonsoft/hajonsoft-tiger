import Grid from "@material-ui/core/Grid";
import {TextField, InputAdornment, Box, IconButton} from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import React from "react";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const name = "phone";

const CustomerPhone = ({
  mode,
  value,
}) => {

  const handleWhatsappClick = () => {
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(value.replace(/[^0-9]/g,''))}`
    window.open(url, "_blank");
  }


  return (
    <Grid item xs={4}>
      <Field
        as={TextField}
        type="tel"
        fullWidth
        name={name}
        label="Phone"
        disabled={mode === "delete"}
        autoComplete="off"
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <Box>
                <IconButton
                  aria-label="send whatsapp message"
                  disabled={!value || value.length < 9 || mode === 'delete'}
                  onClick={handleWhatsappClick}
                >
                  <WhatsAppIcon />
                </IconButton>
              </Box>
            </InputAdornment>
        }}
      />
      <ErrorMessage name={name} component="div" />
    </Grid>
  );
};

export default CustomerPhone;
