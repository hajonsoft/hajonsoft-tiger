import {
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core";

const defaultTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#3E95DC", //summer sky
      },
      secondary: {
        main: "#FFC000", // Amber
      },
      error: {
        main: "#ff1f00", // Scarlet
      },
      warning: {
        main: "#ffa800", //Orange
      },
      success: {
        main: "#9e2b25", // hunter green
      },
      info: {
        main: "#42F2F7", //Aqua
      },
    },
  });
  
 export default  responsiveFontSizes(defaultTheme);