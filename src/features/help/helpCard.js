import { Grid, Typography } from "@material-ui/core";
import React from "react";

const HelpCard = ({ iconElement, title, content, linkElement }) => {
  return (
    <Grid
      item
      md={4}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item md={12}>
        {iconElement}
      </Grid>
      <Grid item style={{ marginTop: "1rem" }}>
        <Typography variant="subtitle2" style={{ color: "silver" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "2rem" }}>
        <Typography variant="body1">
          {content}
          {linkElement}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HelpCard;
