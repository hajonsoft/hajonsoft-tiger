import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#607D8B' },
    secondary: { main: '#ff8a80' },
    background: { default: '#ffffff', paper: '#ffffff' },
    error: { main: '#b30e00' },
    success: { main: '#ffd180' },
    warning: { main: '#ffa300' },
    info: { main: '#bff3ff' },
    text: { primary: '#005d72', secondary: '#0085a3' },
  },
});

export default responsiveFontSizes(defaultTheme);