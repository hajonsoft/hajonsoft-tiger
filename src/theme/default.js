import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
import { amber, blue, lightBlue, lightGreen, orange, red } from "@material-ui/core/colors";
// TODO:THM Is orange better as a secondary or green?
const defaultTheme = createTheme({
    palette: {
      primary: lightBlue, //name for 500 is DeepSkyBlue 2196f3
      secondary: orange, //name for 500 is Orange Peel ff9800
      error: red, //name for 500 is red orange f44336
      warning: amber, //name for 500 is amber ffc107
      success: lightGreen, // name for 500 is Mantis 8bc34a
      info: blue, //name for 500 is Dodger Blue 2196f3
    },
  });
  
 export default  responsiveFontSizes(defaultTheme);