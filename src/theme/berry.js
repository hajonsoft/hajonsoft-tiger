import {
  createTheme,
  responsiveFontSizes
} from "@material-ui/core";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#e91e63' },
    secondary: { main: '#ddff00' },
    background: { default: '#bfffd6', paper: '#80ffae' },
    error: { main: '#00ba44' },
    success: { main: '#eeff80' },
    warning: { main: '#9bb300' },
    info: { main: '#ff80c4' },
    text: { primary: '#9b0054', secondary: '#00822f' },
  },
});

export default responsiveFontSizes(defaultTheme);