import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#004d40' },
    secondary: { main: '#ffbfc4' },
    background: { default: '#ffffff', paper: '#ffffff' },
    error: { main: '#fa0014' },
    success: { main: '#ff808a' },
    warning: { main: '#ff9400' },
    info: { main: '#ffe4bf' },
    text: { primary: '#006f64', secondary: '#009e8f' },
  },
});

export default responsiveFontSizes(defaultTheme);