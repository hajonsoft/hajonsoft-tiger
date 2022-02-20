import { Box } from "@material-ui/core";
import React from "react";
import { eventsAfter, eventsBefore, eventsNow } from "../../../shared/util/hijri";

const ImportantDates = () => {
  return (
    <Box p={2} width="100%" style={{display: 'flex'}}>
      {eventsNow()}
      <Box ml={1} mr={1}>

      {eventsBefore()}
      </Box>
      {eventsAfter()}
    </Box>

  );
};

export default ImportantDates;
