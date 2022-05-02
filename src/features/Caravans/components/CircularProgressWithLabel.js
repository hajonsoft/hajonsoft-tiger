import React from 'react';

import {Box, Typography, CircularProgress} from '@material-ui/core';


export default function CircularProgressWithLabel(props) {

    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.round(props.value.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }