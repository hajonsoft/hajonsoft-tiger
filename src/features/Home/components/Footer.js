import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";


const Footer = () => {
  const history = useHistory();

  return (
    <Box
      style={{
        backgroundColor: "#eceff1",
        color: "#718196",
        fontSize: "18px",
        position: 'sticky',
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <Grid
        container
        spacing={3}
        direction="row"
        justify="space-around"
        alignItems="flex-start"
        style={{
          padding: "1rem",
          paddingLeft: "8rem"
        }}
      >
        <Grid item md={3} style={{ padding: "0px 1rem", }} >
          <Typography variant="h6" gutterBottom style={{ fontSize: '0.9rem' }} component="div"  >Company</Typography>
          <Typography variant="caption" component="div">About Us</Typography>
          <Typography variant="caption" component="div">Contact Us</Typography>
          <Button href="#" onClick={() => history.push("/login")} color="primary" style={{ marginLeft: 0, paddingLeft: 0, textTransform: 'none' }}>

            <Typography variant="caption" component="div">Admin Login</Typography>

          </Button>
        </Grid>
        <Grid item md={3} style={{ padding: "0px 1rem", }}>
          <Typography variant="h6" gutterBottom style={{ fontSize: '0.9rem' }} component="div" >Support</Typography>
          <Typography variant="caption" component="div">Support Center</Typography>
          <Typography variant="caption" component="div">Help Center</Typography>
          <Typography variant="caption" component="div">Safety Center</Typography>
        </Grid>
        <Grid item md={3} style={{ padding: "0px 1rem", }}>
          <Typography variant="h6" gutterBottom style={{ fontSize: '0.9rem' }} component="div" >Legal</Typography>
          <Typography variant="caption" component="div">Privacy Policy</Typography>
          <Typography variant="caption" component="div">Terms of Service</Typography>
          <Button href="#" onClick={() => history.push("/reserve/interest")} color="primary" style={{ marginLeft: 0, paddingLeft: 0, textTransform: 'none' }}>
            <Typography variant="caption" component="div">Join the waitlist</Typography>
          </Button>
        </Grid>
        <Grid item md={3} style={{ padding: "0px 1rem", }}>
          <Typography variant="h6" gutterBottom style={{ fontSize: '0.9rem' }} component="div" >Social Media</Typography>
          <Typography variant="caption" component="div">Instagram</Typography>
          <Typography variant="caption" component="div">Facebook</Typography>
          <Typography variant="caption" component="div">Twitter</Typography>
        </Grid>
      </Grid>
      {/* {record.about} */}

      <Box
        style={{
          padding: "1rem",
          borderTop: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} Copyright: {window.location.origin}
      </Box>
    </Box>
  );
};

export default Footer;
