import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#007aa8' },
    background: { default: '#ffffff', paper: '#ffffff' },
    error: { main: '#b31600' },
    success: { main: '#ff8f80' },
    warning: { main: '#ffa800' },
    info: { main: '#80dcff' },
    text: { primary: '#005676', secondary: '#007aa8' },
  },
});

export default responsiveFontSizes(defaultTheme);