import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#1b5e20' },
    secondary: { main: '#ffdbbf' },
    background: { default: '#ffffff', paper: '#ffffff' },
    error: { main: '#ff6d00' },
    success: { main: '#ffb680' },
    warning: { main: '#ff6d00' },
    info: { main: '#ffbfe9' },
    text: { primary: '#008913', secondary: '#940062' },
  },
});

export default responsiveFontSizes(defaultTheme);