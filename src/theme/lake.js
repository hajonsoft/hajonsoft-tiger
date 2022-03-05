import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#00c90e' },
    background: { default: '#ffffff', paper: '#ffffff' },
    error: { main: '#b34a00' },
    success: { main: '#ffb480' },
    warning: { main: '#ffdabf' },
    info: { main: '#ff80d9' },
    text: { primary: '#910066', secondary: '#cf0092' },
  },
});

export default responsiveFontSizes(defaultTheme);