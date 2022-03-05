import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#cddc39' },
    secondary: { main: '#a5b300' },
    background: { default: '#ffffff', paper: '#ffffff' },
    error: { main: '#d60085' },
    success: { main: '#a5b300' },
    warning: { main: '#ebff00' },
    info: { main: '#ae80ff' },
    text: { primary: '#27006b', secondary: '#380099' },
  },
});

export default responsiveFontSizes(defaultTheme);