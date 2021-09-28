import React from "react";
import AppHeader from "../../shared/macaw/AppHeader";
import underConstruction from "../../images/under-construction.svg";
import { Container, Typography } from "@material-ui/core";

const Trade = () => {
  return (
    <div>
      <AppHeader />
      <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <img
          src={underConstruction}
          width="50%"
          height="50%"
          alt="under construction"
        />
        <Typography variant="h5" gutterBottom>
          Under Construction
        </Typography>
        <Typography>
          Exchange advertisements, hotels, flights or business. This
          section is under construction and is open to ideas
        </Typography>
      </Container>
    </div>
  );
};

export default Trade;
