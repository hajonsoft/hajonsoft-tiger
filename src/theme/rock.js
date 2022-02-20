import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#009688' },
    secondary: { main: '#ffbfc1' },
    background: { default: '#ffe5bf', paper: '#ffcb80' },
    error: { main: '#b31600' },
    success: { main: '#ff8f80' },
    warning: { main: '#ff9700' },
    info: { main: '#80fffb' },
    text: { primary: '#006d69', secondary: '#b10005' },
  },
});

export default responsiveFontSizes(defaultTheme);