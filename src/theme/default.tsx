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
        main: "#dc3e95", // Seal brown
      },
      error: {
        main: "#ff5a5f", // sizzling red
      },
      warning: {
        main: "#033f63", //Inch worm
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