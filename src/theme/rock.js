import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#9e9e9e' },
    secondary: { main: '#ffbfbf' },
    background: { default: '#e6ffbf', paper: '#ccff80' },
    error: { main: '#ff0000' },
    success: { main: '#6bb300' },
    warning: { main: '#99ff00' },
    info: { main: '#bfffff' },
    text: { primary: '#006b6b', secondary: '#009999' },
  },
});

export default responsiveFontSizes(defaultTheme);