import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#FFEB3B' },
    secondary: { main: '#ff80ec' },
    background: { default: '#fffcbf', paper: '#cec4ff' },
    error: { main: '#b3aa00' },
    success: { main: '#cec4ff' },
    warning: { main: '#fff980' },
    info: { main: '#270ca6' },
    text: { primary: '#1b0874', secondary: '#7f006c' },
  },
});

export default responsiveFontSizes(defaultTheme);